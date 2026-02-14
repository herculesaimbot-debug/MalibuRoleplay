const crypto = require("crypto");

function b64urlEncode(input) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(String(input));
  return buf.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function b64urlDecodeToString(input) {
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((input.length + 3) % 4);
  return Buffer.from(b64, "base64").toString("utf8");
}

function sign(data, secret) {
  return b64urlEncode(crypto.createHmac("sha256", secret).update(data).digest());
}

function createSessionCookie(user, secret, maxAgeSec = 60 * 60 * 24 * 7) {
  const payload = { user, exp: Math.floor(Date.now() / 1000) + maxAgeSec };
  const payloadStr = JSON.stringify(payload);
  const payloadB64 = b64urlEncode(payloadStr);
  const sig = sign(payloadB64, secret);
  return `${payloadB64}.${sig}`;
}

function verifySessionCookie(value, secret) {
  if (!value || typeof value !== "string") return null;
  const parts = value.split(".");
  if (parts.length !== 2) return null;

  const [payloadB64, sig] = parts;
  const expectedSig = sign(payloadB64, secret);

  const a = Buffer.from(sig);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length) return null;
  if (!crypto.timingSafeEqual(a, b)) return null;

  let payload;
  try {
    payload = JSON.parse(b64urlDecodeToString(payloadB64));
  } catch {
    return null;
  }

  if (!payload?.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
  return payload;
}

function parseCookies(cookieHeader = "") {
  const out = {};
  cookieHeader.split(";").forEach((c) => {
    const i = c.indexOf("=");
    if (i === -1) return;
    const k = c.slice(0, i).trim();
    const v = c.slice(i + 1).trim();
    out[k] = decodeURIComponent(v);
  });
  return out;
}

function cookie(name, value, opts = {}) {
  const { httpOnly = true, secure = true, sameSite = "Lax", path = "/", maxAge } = opts;
  let str = `${name}=${encodeURIComponent(value)}; Path=${path}; SameSite=${sameSite}`;
  if (httpOnly) str += "; HttpOnly";
  if (secure) str += "; Secure";
  if (typeof maxAge === "number") str += `; Max-Age=${maxAge}`;
  return str;
}

module.exports = { createSessionCookie, verifySessionCookie, parseCookies, cookie };
