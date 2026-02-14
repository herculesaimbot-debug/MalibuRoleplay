const { parseCookies, verifySessionCookie } = require("./_session");

module.exports = async (req, res) (event) => {
  const sessionSecret = process.env.SESSION_SECRET;
  if (!sessionSecret) {
    return { statusCode: 500, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }, body: JSON.stringify({ error: "SESSION_SECRET faltando." }) };
  }

  const cookies = parseCookies(event.headers?.cookie || "");
  const session = verifySessionCookie(cookies.discord_session, sessionSecret);

  if (!session) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      body: JSON.stringify({ logged: false }),
    };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    body: JSON.stringify({ logged: true, user: session.user }),
  };
};
