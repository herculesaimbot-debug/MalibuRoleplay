export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const { buyer, items } = JSON.parse(req.body || "{}");
    if (!items?.length) {
      return res.status(400).json({ error: "Carrinho vazio" });
    }

    const accessToken = process.env.MP_ACCESS_TOKEN;
    const webBaseUrl = process.env.WEB_BASE_URL;

    if (!accessToken) {
      return res.status(500).json({ error: "MP_ACCESS_TOKEN não configurado no Netlify" });
    }
    if (!webBaseUrl) {
      // Não é obrigatório pra criar pagamento, mas evita back_urls vazias
      // e deixa seu fluxo mais bonito (success/pending/failure).
      console.warn("WEB_BASE_URL não configurado no Netlify.");
    }

    const payload = {
      items: items.map(i => ({
        title: i.title,
        quantity: Number(i.quantity),
        unit_price: Number(i.unit_price),
        currency_id: "BRL"
      })),
      payer: {
        name: buyer?.name,
        email: buyer?.email
      },
      auto_return: "approved"
    };

    if (webBaseUrl) {
      payload.back_urls = {
        success: `${webBaseUrl}/?paid=success`,
        pending: `${webBaseUrl}/?paid=pending`,
        failure: `${webBaseUrl}/?paid=failure`
      };
    }

    const res = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) {
      return res.status(500).json({ error: data?.message || "Erro Mercado Pago", details: data });
    }

    return res.status(200).json({ init_point: data.init_point });
  } catch (e) {
    return res.status(500).json({ error: e?.message || "Erro interno" });
  }
}
