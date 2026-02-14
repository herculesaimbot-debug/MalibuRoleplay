const { cookie } = require("./_session");

module.exports = async (req, res) () => {
  return {
    statusCode: 200,
    headers: {
      "Set-Cookie": cookie("discord_session", "", { maxAge: 0 }),
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify({ ok: true }),
  };
};
