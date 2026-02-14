const { parseCookies, cookie, createSessionCookie } = require("./_session");

module.exports = async (req, res) => {
  try {
    const { code, state } = req.query;

    const cookies = parseCookies(req.headers.cookie || "");

    if (!code || !state || cookies.discord_oauth_state !== state) {
      return res.status(400).send("Invalid OAuth state");
    }

    const {
      DISCORD_CLIENT_ID,
      DISCORD_CLIENT_SECRET,
      DISCORD_REDIRECT_URI,
      DISCORD_GUILD_ID,
      DISCORD_BOT_TOKEN,
      DISCORD_ROLE_ID,
      SESSION_SECRET
    } = process.env;

    if (
      !DISCORD_CLIENT_ID ||
      !DISCORD_CLIENT_SECRET ||
      !DISCORD_REDIRECT_URI ||
      !DISCORD_GUILD_ID ||
      !DISCORD_BOT_TOKEN ||
      !DISCORD_ROLE_ID ||
      !SESSION_SECRET
    ) {
      return res.status(500).send("Missing environment variables");
    }

    // troca code por token
    const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: DISCORD_REDIRECT_URI
      })
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      return res.status(400).send("Failed to get access token");
    }

    // pega usuário
    const userRes = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`
      }
    });

    const user = await userRes.json();

    if (!user.id) {
      return res.status(400).send("Failed to fetch user");
    }

    // adiciona role
    await fetch(
      `https://discord.com/api/guilds/${DISCORD_GUILD_ID}/members/${user.id}/roles/${DISCORD_ROLE_ID}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bot ${DISCORD_BOT_TOKEN}`
        }
      }
    );

    // cria sessão
    const sessionValue = createSessionCookie(user, SESSION_SECRET, 604800);

    res.setHeader(
      "Set-Cookie",
      cookie("discord_session", sessionValue, { maxAge: 604800 })
    );

    return res.redirect("/");

  } catch (err) {
    return res.status(500).send("Server error: " + err.message);
  }
};
