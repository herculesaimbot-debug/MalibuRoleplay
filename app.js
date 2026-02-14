const DISCORD_INVITE_URL = ""; // ex: "https://discord.gg/SEULINK"
const CONNECT_CMD = "";        // ex: "connect SEU_IP_AQUI:30120"

const pages = ["home", "store", "rules", "team", "checkout"];

// Categorias
const categories = ["VIPs", "Dinheiro", "Leveis", "Organizações", "Unban"];
let activeCategory = "VIPs";

const productsData = [
  // VIPs
  { id:"vip_bronze",  category:"VIPs", name:"VIP Bronze (30 dias)",  price: 23.99, tag:"VIP",   desc:"Após a compra, abra um ticket.", img:"./assets/products/bronze.webp"},
  { id:"vip_prata",   category:"VIPs", name:"VIP Prata (30 dias)",   price: 28.99, tag:"VIP",   desc:"Após a compra, abra um ticket.", img:"./assets/products/prata.webp"},
  { id:"vip_ouro",    category:"VIPs", name:"VIP Ouro (30 dias)",    price: 33.99, tag:"VIP",   desc:"Após a compra, abra um ticket.", img:"./assets/products/ouro.webp"},
  { id:"vip_platina", category:"VIPs", name:"VIP Platina (30 dias)", price: 38.99, tag:"VIP",   desc:"Após a compra, abra um ticket.", img:"./assets/products/platina.webp"},
  { id:"vip_diamante",category:"VIPs", name:"VIP Diamante (30 dias)",price: 48.99, tag:"VIP",   desc:"Após a compra, abra um ticket.", img:"./assets/products/diamante.webp"},

  { id:"coins_1m",   category:"Dinheiro", name:"1.000.000",  price: 20.00, tag:"Money", desc:"Torne-se um milionário.",        img:"./assets/products/1kk.webp"},
  { id:"coins_2m",   category:"Dinheiro", name:"2.000.000",  price: 35.00, tag:"Money", desc:"Torne-se um milionário.",        img:"./assets/products/2kk.webp"},
  { id:"coins_3m",   category:"Dinheiro", name:"3.000.000",  price: 50.00, tag:"Money", desc:"Torne-se um milionário.",        img:"./assets/products/3kk.webp"},
  { id:"coins_10m",  category:"Dinheiro", name:"10.000.000", price: 75.00, tag:"Money", desc:"Torne-se um multi-milionário.",  img:"./assets/products/10kk.webp"},

  { id:"level_50",  category:"Leveis", name:"Level 50",  price: 30.00, tag:"Level", desc:"Após a compra, abra um ticket.", img:"./assets/products/50.webp"},
  { id:"level_100", category:"Leveis", name:"Level 100", price: 43.00, tag:"Level", desc:"Após a compra, abra um ticket.", img:"./assets/products/100.webp"},
  { id:"level_150", category:"Leveis", name:"Level 150", price: 60.00, tag:"Level", desc:"Após a compra, abra um ticket.", img:"./assets/products/150.webp"},
  { id:"level_200", category:"Leveis", name:"Level 200", price: 75.00, tag:"Level", desc:"Após a compra, abra um ticket.", img:"./assets/products/200.webp"},

  { id:"org_police",   category:"Organizações", name:"Organização policial",   price: 35.90, tag:"Org", desc:"Entrega manual.", img:"./assets/products/cop.webp"},
  { id:"org_crime",    category:"Organizações", name:"Organização criminosa",  price: 35.90, tag:"Org", desc:"Entrega manual.", img:"./assets/products/fac.webp"},
  { id:"org_medic",    category:"Organizações", name:"Organização médico",     price: 35.90, tag:"Org", desc:"Entrega manual.", img:"./assets/products/med.webp"},
  { id:"org_mechanic", category:"Organizações", name:"Organização mecânico",   price: 45.90, tag:"Org", desc:"Entrega manual.", img:"./assets/products/mec.webp"},

  { id:"unban_serial",  category:"Unban", name:"Desban Serial",  price: 100.00, tag:"Serviço", desc:"1 UN.", img:"./assets/products/serial.webp" },
  { id:"unban_account", category:"Unban", name:"Desban Conta",   price: 50.00,  tag:"Serviço", desc:"1 UN.", img:"./assets/products/conta.webp" },
  { id:"unban_discord", category:"Unban", name:"Desban Discord", price: 14.99,  tag:"Serviço", desc:"1 UN.", img:"./assets/products/discord.webp" },
];

// Equipe
const teamData = [
  { name:"AQUILES", role:"Fundador • Malibu Roleplay", bio:"Direção do projeto, decisões finais e visão do RP.", links:[["TikTok","https://www.tiktok.com/@aquilesrp"]] },
  { name:"ANNY",    role:"Fundadora • Malibu Roleplay", bio:"Administração geral, organização e padronização das regras e experiência do RP.", links:[["TikTok","https://www.tiktok.com/@beckpoar"]] },
  { name:"VT",      role:"Programador • Malibu Roleplay", bio:"Desenvolvimento de scripts, estabilidade, otimização e segurança do servidor.", links:[["TikTok","#"]] },
  { name:"GORDIN",  role:"Adminstrador • Malibu Roleplay", bio:"Responsável pela adminstração do servidor.", links:[["TikTok","https://www.tiktok.com/@deryck.thadeu"]] },
  { name:"KING",    role:"Adminstrador • Malibu Roleplay", bio:"Responsável pela adminstração do servidor.", links:[["TikTok","https://www.tiktok.com/@gb.schmitz"]] },
  { name:"MENORZIN",role:"Adminstrador • Malibu Roleplay", bio:"Responsável pela adminstração do servidor.", links:[["TikTok","https://www.tiktok.com/@bunny.vsfd"]] },
  { name:"SNAKE",  role:"Adminstrador  • Malibu Roleplay", bio:"Responsável pela adminstração do servidor.", links:[["TikTok","https://www.tiktok.com/@userww...1"]] },
  { name:"KAKÁ",    role:"Adminstrador • Malibu Roleplay", bio:"Responsável pela adminstração do servidor.", links:[["TikTok","https://www.tiktok.com/@kakazl34"]] },
  { name:"MULTZ",   role:"Adminstrador • Malibu Roleplay", bio:"Responsável pela adminstração do servidor.", links:[["TikTok","https://www.tiktok.com/@tk.maell7"]] },
  { name:"CADU",    role:"Adminstrador • Malibu Roleplay", bio:"Responsável pela adminstração do servidor.", links:[["TikTok","https://www.tiktok.com/@kduzn0"]] },
  { name:"JOÃO",    role:"Adminstrador • Malibu Roleplay", bio:"Responsável pela adminstração do servidor.", links:[["TikTok","https://www.tiktok.com/@oaoj157"]] },
  { name:"DoisKa",    role:"Adminstrador • Malibu Roleplay", bio:"Responsável pela adminstração do servidor.", links:[["TikTok","#"]] },
];

// ===== Estado =====
const cart = new Map();
const fmtBRL = (v) => Number(v || 0).toLocaleString("pt-BR", { style:"currency", currency:"BRL" });

const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
const byId = (id) => document.getElementById(id);

function on(el, ev, fn, opts){
  if (!el) return;
  el.addEventListener(ev, fn, opts);
}

function safeText(el, text){
  if (!el) return;
  el.textContent = text;
}

function safeShow(el, show, displayStyle="block"){
  if (!el) return;
  el.style.display = show ? displayStyle : "none";
}


function setPage(page){
  pages.forEach(p => byId(`page-${p}`)?.classList.toggle("show", p === page));
  $$(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.page === page));
  window.location.hash = page;
  window.scrollTo({ top:0, behavior:"smooth" });
}

function cartCount(){
  let n = 0;
  for (const qty of cart.values()) n += qty;
  return n;
}

function cartTotal(){
  let total = 0;
  for (const [id, qty] of cart.entries()){
    const p = productsData.find(x => x.id === id);
    total += (p?.price || 0) * qty;
  }
  return total;
}

function renderCart(){
  safeText(byId("cartCount"), String(cartCount()));

  const box = byId("cartItems");
  const totalEl = byId("cartTotal");
  if (totalEl) totalEl.textContent = fmtBRL(cartTotal());
  if (!box) return;

  if (cartCount() === 0){
    box.innerHTML = `<div class="muted">Seu carrinho está vazio. Vá na Loja e adicione produtos.</div>`;
    return;
  }

  box.innerHTML = "";
  for (const [id, qty] of cart.entries()){
    const p = productsData.find(x => x.id === id);
    if (!p) continue;

    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div class="left">
        <div class="title">${p.name}</div>
        <div class="sub">${qty} × ${fmtBRL(p.price)} • <span class="muted">${p.tag}</span></div>
      </div>
      <div class="actions">
        <button data-act="dec" data-id="${id}" type="button">-</button>
        <strong>${qty}</strong>
        <button data-act="inc" data-id="${id}" type="button">+</button>
        <button data-act="del" data-id="${id}" type="button">Remover</button>
      </div>
    `;
    box.appendChild(row);
  }

  $$("button[data-act]", box).forEach(btn=>{
    on(btn, "click", ()=>{
      const id = btn.dataset.id;
      const act = btn.dataset.act;
      if (!id || !act) return;

      if (act === "inc") cart.set(id, (cart.get(id)||0) + 1);
      if (act === "dec") cart.set(id, Math.max(1, (cart.get(id)||1) - 1));
      if (act === "del") cart.delete(id);

      renderCart();
      renderProducts(byId("searchInput")?.value || "");
    });
  });
}

// ===== Produtos =====
function renderProducts(filter=""){
  const wrap = byId("products");
  if (!wrap) return;

  wrap.innerHTML = "";
  const q = (filter || "").trim().toLowerCase();

  const items = productsData.filter(p => {
    const inCat = (activeCategory === "Todos") || (p.category === activeCategory);
    const inSearch = (!q) || p.name.toLowerCase().includes(q) || (p.tag||"").toLowerCase().includes(q);
    return inCat && inSearch;
  });

  if (items.length === 0){
    wrap.innerHTML = `<div class="card"><div class="muted">Nenhum produto nessa aba (ou nessa busca).</div></div>`;
    return;
  }

  items.forEach(p=>{
    const el = document.createElement("div");
    el.className = "prod";
    const qty = cart.get(p.id) || 0;

    el.innerHTML = `
      <div class="prod-img"><img src="${p.img}" alt="${p.name}"></div>
      <span class="badge">${p.tag}</span>
      <div class="name">${p.name}</div>
      <div class="muted small">${p.desc}</div>
      <div class="row">
        <div>
          <div class="price">${fmtBRL(p.price)}</div>
          <div class="muted small">Entrega manual pela staff</div>
        </div>
        <div class="qty">
          <button data-act="dec" type="button">-</button>
          <span>${qty}</span>
          <button data-act="inc" type="button">+</button>
        </div>
      </div>
    `;

    const bDec = $("button[data-act='dec']", el);
    const bInc = $("button[data-act='inc']", el);

    on(bDec, "click", ()=>{
      if (!cart.has(p.id)) return;
      const n = cart.get(p.id);
      if (n <= 1) cart.delete(p.id);
      else cart.set(p.id, n - 1);

      renderProducts(byId("searchInput")?.value || "");
      renderCart();
    });

    on(bInc, "click", ()=>{
      if (!isUserLogged()) {
        toast("Faça login com Discord para comprar.");
        return;
      }

      cart.set(p.id, (cart.get(p.id)||0) + 1);
      renderProducts(byId("searchInput")?.value || "");
      renderCart();
    });

    wrap.appendChild(el);
  });
}

// ===== Categorias =====
function renderCategoryTabs(){
  const wrap = byId("categoryTabs");
  if (!wrap) return;

  wrap.innerHTML = "";
  categories.forEach(cat=>{
    const b = document.createElement("button");
    b.className = "tab" + (cat === activeCategory ? " active" : "");
    b.type = "button";
    b.textContent = cat;

    on(b, "click", ()=>{
      activeCategory = cat;
      $$(".tab", wrap).forEach(t => t.classList.remove("active"));
      b.classList.add("active");
      renderProducts(byId("searchInput")?.value || "");
    });

    wrap.appendChild(b);
  });
}

// ===== Equipe =====
function renderTeam(){
  const wrap = byId("teamCards");
  if (!wrap) return;

  wrap.innerHTML = "";
  teamData.forEach(m=>{
    const el = document.createElement("div");
    el.className = "member";
    el.innerHTML = `
      <div class="avatar">${m.name.slice(0,1).toUpperCase()}</div>
      <div class="name">${m.name}</div>
      <div class="role">${m.role}</div>
      <div class="bio">${m.bio}</div>
      <div class="links">
        ${m.links.map(l=>`<a href="${l[1]}" target="_blank" rel="noopener">${l[0]}</a>`).join("")}
      </div>
    `;
    wrap.appendChild(el);
  });
}

function toast(msg){
  const t = byId("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"), 3400);
}

async function payNow(){
  if (!isUserLogged()) {
    toast("Você precisa estar logado com Discord para finalizar a compra.");
    return;
  }

  if (cartCount() === 0) return toast("Carrinho vazio. Adicione itens na Loja.");

  const name = (byId("buyerName")?.value || "").trim();
  const email = (byId("buyerEmail")?.value || "").trim();
  if (!name || !email) return toast("Preencha nome e e-mail.");

  const items = [];
  for (const [id, qty] of cart.entries()){
    const p = productsData.find(x => x.id === id);
    if (!p) continue;
    items.push({ id, title:p.name, unit_price:p.price, quantity:qty });
  }

  try{
    const res = await fetch("/api/mp_create_preference",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ buyer:{name,email}, items })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Falha no Mercado Pago");
    window.location.href = data.init_point;
  }catch(err){
    toast(err?.message || "Erro ao iniciar pagamento.");
  }
}

function openDiscordModal(){
  const modal = byId("discordModal");
  if (!modal) return;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  safeText(byId("discordInviteText"), DISCORD_INVITE_URL ? DISCORD_INVITE_URL : "Ainda não definido");
}

function closeDiscordModal(){
  const modal = byId("discordModal");
  if (!modal) return;
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

const auth = {
  btnLogin: null,
  userBox: null,
  btnLogout: null,
};

function bindDiscordAuthUI(){
  auth.btnLogin = byId("btnLogin");
  auth.userBox = byId("userBox");
  auth.btnLogout = byId("btnLogout");

  on(auth.btnLogin, "click", () => {
    window.location.href = "/api/discord-auth";
  });

  on(auth.btnLogout, "click", async () => {
    await fetch("/api/logout");
    window.location.reload();
  });
}

async function refreshDiscordUserUI(){
  try {
    const res = await fetch("/api/me", { cache: "no-store" });
    const data = await res.json();

    if (!data?.logged) {
      safeShow(auth.btnLogin, true, "inline-flex");
      safeShow(auth.userBox, false);
      return;
    }

    safeShow(auth.btnLogin, false);
    safeShow(auth.userBox, true, "flex");

    safeText(byId("username"), data.user?.username || "Usuário");

    const avatarEl = byId("avatar");
    if (avatarEl) {
      const id = data.user?.id;
      const av = data.user?.avatar;
      avatarEl.src = (id && av)
        ? `https://cdn.discordapp.com/avatars/${id}/${av}.png`
        : "https://cdn.discordapp.com/embed/avatars/0.png";

      avatarEl.onerror = () => { avatarEl.src = "https://cdn.discordapp.com/embed/avatars/0.png"; };
    }
  } catch {
    safeShow(auth.btnLogin, true, "inline-flex");
    safeShow(auth.userBox, false);
  }
}

function isUserLogged(){
  return document.getElementById("userBox")?.style.display !== "none";
}


function bindGlobalUI(){
  safeText(byId("year"), String(new Date().getFullYear()));

  $$(".nav-btn").forEach(btn=>{
    on(btn, "click", ()=>{
      const page = btn.dataset.page;
      if (!page) return;
      setPage(page);
      renderCart();
    });
  });

  on(byId("btnGoStore"), "click", (e)=>{ e.preventDefault(); setPage("store"); });
  on(byId("btnGoStore2"), "click", (e)=>{ e.preventDefault(); setPage("store"); });

  on(byId("btnCopyIP"), "click", async (e)=>{
    e.preventDefault();
    if (!CONNECT_CMD) return toast("IP ainda não definido. Assim que tiver, eu coloco o connect aqui.");
    try{
      await navigator.clipboard.writeText(CONNECT_CMD);
      toast(`Connect copiado: ${CONNECT_CMD}`);
    }catch{
      toast("Não foi possível copiar. Copie manualmente.");
    }
  });

  on(byId("btnClearCart"), "click", ()=>{
    cart.clear();
    renderProducts(byId("searchInput")?.value || "");
    renderCart();
  });

  on(byId("btnPay"), "click", payNow);
  on(byId("searchInput"), "input", (e)=> renderProducts(e.target.value));

  on(byId("btnBannerStore"), "click", ()=> setPage("store"));
  on(byId("btnBannerDiscord"), "click", openDiscordModal);

  on(byId("btnDiscord"), "click", openDiscordModal);
  on(byId("btnDiscordFloat"), "click", openDiscordModal);
  on(byId("discordClose"), "click", closeDiscordModal);

  const modal = byId("discordModal");
  if (modal) on(modal, "click", (e)=>{ if (e.target?.dataset?.close) closeDiscordModal(); });

  on(byId("btnCopyDiscord"), "click", async ()=>{
    if (!DISCORD_INVITE_URL) return toast("Discord ainda não definido. Me envie o link do convite.");
    try{
      await navigator.clipboard.writeText(DISCORD_INVITE_URL);
      toast("Convite do Discord copiado!");
    }catch{
      toast("Não foi possível copiar o convite.");
    }
  });

  on(byId("btnOpenDiscord"), "click", ()=>{
    if (!DISCORD_INVITE_URL) return toast("Discord ainda não definido. Me envie o link do convite.");
    window.open(DISCORD_INVITE_URL, "_blank", "noopener");
  });
}

function boot(){
  bindGlobalUI();
  renderCategoryTabs();
  renderProducts("");
  renderTeam();
  renderCart();

  bindDiscordAuthUI();
  refreshDiscordUserUI();

  const hashPage = (window.location.hash || "").replace("#", "");
  if (hashPage && pages.includes(hashPage)) setPage(hashPage);
}

document.addEventListener("DOMContentLoaded", boot);
