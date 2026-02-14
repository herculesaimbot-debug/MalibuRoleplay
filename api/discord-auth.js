const crypto = require("crypto");

module.exports = async (req, res) => {
  try {
    const clientId = process.env.DISCORD_CLIENT_ID;
    const redirectUri = process.env.DISCORD_REDIRECT_URI;

    if (!clientId || !redirectUri) {
      return res.status(500).send("Missing environment variables.");
    }

    const state = crypto.randomBytes(24).toString("hex");

    const url =
      "https://discord.com/api/oauth2/authorize" +
      `?client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      "&response_type=code" +
      `&scope=${encodeURIComponent("identify email guilds.join")}` +
      `&state=${state}` +
      "&prompt=consent";

    res.setHeader(
      "Set-Cookie",
      `discord_oauth_state=${state}; HttpOnly; Path=/; Max-Age=600`
    );

    return res.redirect(url);

  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};
