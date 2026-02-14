const { randomBytes } = require("node:crypto");
const { cookie } = require("./_session");

module.exports = async (req, res) () => {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const redirectUri = process.env.DISCORD_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return res.status(500).send("Missing env vars: DISCORD_CLIENT_ID / DISCORD_REDIRECT_URI");
  }

  const state = randomBytes(24).toString("hex");

  const url =
    "https://discord.com/api/oauth2/authorize" +
    `?client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&response_type=code` +
    `&scope=${encodeURIComponent("identify email guilds.join")}` +
    `&state=${state}` +
    `&prompt=consent`;

  return {
    statusCode: 302,
    headers: {
      "Set-Cookie": cookie("discord_oauth_state", state, { maxAge: 600 }),
      "Location": url,
      "Cache-Control": "no-store",
    },
    body: "",
  };
};
