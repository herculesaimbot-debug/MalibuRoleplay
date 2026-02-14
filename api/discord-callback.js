const { parseCookies, cookie, createSessionCookie } = require("./_session");

module.exports = async (req, res) (event) => {
  try {
    const qs = req.query || {};
    const code = qs.code;
    const state = qs.state;

    const headers = event.headers || {};
    const cookieHeader = headers.cookie || headers.Cookie || "";
    const cookies = parseCookies(cookieHeader);

    if (!code || !state || cookies.discord_oauth_state !== state) {
      return res.status(400).send("Invalid OAuth state");
    }

    const guildId = process.env.DISCORD_GUILD_ID;
    const botToken = process.env.DISCORD_BOT_TOKEN;
    const roleId = process.env.DISCORD_ROLE_ID || "1337846745404539040";

    const clientId = process.env.DISCORD_CLIENT_ID;
    const clientSecret = process.env.DISCORD_CLIENT_SECRET;
    const redirectUri = process.env.DISCORD_REDIRECT_URI;
    const sessionSecret = process.env.SESSION_SECRET;

    if (!guildId || !botToken || !clientId || !clientSecret || !redirectUri || !sessionSecret) {
      return res.status(500).send("Missing env vars for Discord/Session");
    }

    // Exchange code -> access token
    const tokenRes = await fetch("https://discord.com/api/v10/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri,
      }),
    });

    const token = await tokenRes.json();
    if (!tokenRes.ok || !token.access_token) {
      return { statusCode: 400, body: "Token exchange failed: " + JSON.stringify(token) };
    }

    const accessToken = token.access_token;

    // Get user
    const meRes = await fetch("https://discord.com/api/v10/users/@me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const me = await meRes.json();
    if (!meRes.ok || !me.id) {
      return { statusCode: 400, body: "Fetch user failed: " + JSON.stringify(me) };
    }

    // Check if already a member
    let member = null;
    const checkRes = await fetch(`https://discord.com/api/v10/guilds/${guildId}/members/${me.id}`, {
      headers: { Authorization: `Bot ${botToken}` },
    });

    if (checkRes.status === 200) {
      member = await checkRes.json();
    } else if (checkRes.status === 404) {
      // Join guild
      const addRes = await fetch(`https://discord.com/api/v10/guilds/${guildId}/members/${me.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bot ${botToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ access_token: accessToken }),
      });

      if (!(addRes.status === 201 || addRes.status === 204)) {
        const txt = await addRes.text().catch(() => "");
        return { statusCode: 400, body: `Join failed: ${addRes.status} ${txt}` };
      }

      // Fetch member to get roles
      const memberRes = await fetch(`https://discord.com/api/v10/guilds/${guildId}/members/${me.id}`, {
        headers: { Authorization: `Bot ${botToken}` },
      });

      if (memberRes.ok) member = await memberRes.json();
    } else {
      const txt = await checkRes.text().catch(() => "");
      return { statusCode: 400, body: `Member check failed: ${checkRes.status} ${txt}` };
    }

    // Apply role (preserve existing roles)
    const currentRoles = member && Array.isArray(member.roles) ? member.roles : [];
    if (currentRoles.indexOf(roleId) === -1) {
      const newRoles = currentRoles.concat([roleId]);

      const roleRes = await fetch(`https://discord.com/api/v10/guilds/${guildId}/members/${me.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bot ${botToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roles: newRoles }),
      });

      if (!roleRes.ok) {
        const txt = await roleRes.text().catch(() => "");
        return { statusCode: 400, body: `Role apply failed: ${roleRes.status} ${txt}` };
      }
    }

    // Create session
    const sessionValue = createSessionCookie(me, sessionSecret, 604800);

    return {
      statusCode: 302,
      headers: {
        "Set-Cookie": cookie("discord_session", sessionValue, { maxAge: 604800 }),
        "Location": "/",
        "Cache-Control": "no-store",
      },
      body: "",
    };
  } catch (err) {
    return { statusCode: 500, body: "Server error: " + (err && err.message ? err.message : String(err)) };
  }
};
