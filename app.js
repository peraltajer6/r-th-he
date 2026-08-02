// app.js — routing + rendering. Edit medicines.js to change catalog content;
// this file shouldn't need to change for normal content updates.

const LANGS = [
  { code: "en", label: "EN", dir: "ltr" },
  { code: "ar", label: "\u0639", dir: "rtl" },
  { code: "es", label: "ES", dir: "ltr" },
  { code: "fr", label: "FR", dir: "ltr" },
  { code: "de", label: "DE", dir: "ltr" },
];

const STRINGS = {
  en: {
    chooseLanguage: "Choose your language",
    catalogEyebrow: "MediCatalog",
    catalogTitle: "Medicines Catalog",
    catalogTagline: "Browse our range of pharmaceutical products.",
    welcomeTitle: "Welcome",
    welcomeTagline: "Your trusted source for quality medicines, delivered with care.",
    searchPlaceholder: "Search medicines…",
    all: "All",
    backToCatalog: "Back to catalog",
    productDetails: "Product details",
    inStock: "In stock",
    outOfStock: "Out of stock",
    price: "Price",
    addToCart: "Add to cart",
    unavailable: "Unavailable",
    strength: "Strength",
    form: "Form",
    shippingTitle: "Shipping",
    shippingBody: "Standard delivery in 2\u20134 business days. Free shipping on orders over $50.",
    paymentTitle: "Payment",
    paymentBody: "Accepts Visa, Mastercard, and PayPal. Secure checkout.",
    noResults: "No medicines match your search.",
    addedToCart: "Added to cart",
  },
  ar: {
    chooseLanguage: "\u0627\u062e\u062a\u0631 \u0644\u063a\u062a\u0643",
    catalogEyebrow: "\u0645\u064a\u062f\u064a \u0643\u0627\u062a\u0627\u0644\u0648\u062c",
    catalogTitle: "\u0643\u062a\u0627\u0644\u0648\u062c \u0627\u0644\u0623\u062f\u0648\u064a\u0629",
    catalogTagline: "\u062a\u0635\u0641\u062d \u0645\u062c\u0645\u0648\u0639\u062a\u0646\u0627 \u0645\u0646 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0627\u0644\u0635\u064a\u062f\u0644\u064a\u0629.",
    welcomeTitle: "\u0623\u0647\u0644\u0627\u064b",
    welcomeTagline: "\u0645\u0635\u062f\u0631\u0643 \u0627\u0644\u0645\u0648\u062b\u0648\u0642 \u0644\u0644\u0623\u062f\u0648\u064a\u0629 \u0639\u0627\u0644\u064a\u0629 \u0627\u0644\u062c\u0648\u062f\u0629.",
    searchPlaceholder: "\u0627\u0628\u062d\u062b \u0639\u0646 \u0627\u0644\u0623\u062f\u0648\u064a\u0629\u2026",
    all: "\u0627\u0644\u0643\u0644",
    backToCatalog: "\u0627\u0644\u0639\u0648\u062f\u0629 \u0644\u0644\u0643\u0627\u062a\u0627\u0644\u0648\u062c",
    productDetails: "\u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u0645\u0646\u062a\u062c",
    inStock: "\u0645\u062a\u0648\u0641\u0631",
    outOfStock: "\u063a\u064a\u0631 \u0645\u062a\u0648\u0641\u0631",
    price: "\u0627\u0644\u0633\u0639\u0631",
    addToCart: "\u0623\u0636\u0641 \u0625\u0644\u0649 \u0627\u0644\u0633\u0644\u0629",
    unavailable: "\u063a\u064a\u0631 \u0645\u062a\u0627\u062d",
    strength: "\u0627\u0644\u062a\u0631\u0643\u064a\u0632",
    form: "\u0627\u0644\u0634\u0643\u0644",
    shippingTitle: "\u0627\u0644\u0634\u062d\u0646",
    shippingBody: "\u062a\u0648\u0635\u064a\u0644 \u0642\u064a\u0627\u0633\u064a \u062e\u0644\u0627\u0644 2\u20134 \u0623\u064a\u0627\u0645 \u0639\u0645\u0644. \u0634\u062d\u0646 \u0645\u062c\u0627\u0646\u064a \u0644\u0644\u0637\u0644\u0628\u0627\u062a \u0641\u0648\u0642 50 \u062f\u0648\u0644\u0627\u0631\u0627\u064b.",
    paymentTitle: "\u0627\u0644\u062f\u0641\u0639",
    paymentBody: "\u064a\u0642\u0628\u0644 \u0641\u064a\u0632\u0627 \u0648\u0645\u0627\u0633\u062a\u0631\u0643\u0627\u0631\u062f \u0648\u0628\u0627\u064a \u0628\u0627\u0644. \u062f\u0641\u0639 \u0622\u0645\u0646.",
    noResults: "\u0644\u0627 \u062a\u0648\u062c\u062f \u0623\u062f\u0648\u064a\u0629 \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0628\u062d\u062b\u0643.",
    addedToCart: "\u0623\u0636\u064a\u0641 \u0625\u0644\u0649 \u0627\u0644\u0633\u0644\u0629",
  },
  es: {
    chooseLanguage: "Elige tu idioma",
    catalogEyebrow: "MediCatalog",
    catalogTitle: "Cat\u00e1logo de medicinas",
    catalogTagline: "Explora nuestra gama de productos farmac\u00e9uticos.",
    welcomeTitle: "Bienvenido",
    welcomeTagline: "Tu fuente de confianza para medicinas de calidad, entregadas con cuidado.",
    searchPlaceholder: "Buscar medicinas\u2026",
    all: "Todos",
    backToCatalog: "Volver al cat\u00e1logo",
    productDetails: "Detalles del producto",
    inStock: "En stock",
    outOfStock: "Agotado",
    price: "Precio",
    addToCart: "A\u00f1adir al carrito",
    unavailable: "No disponible",
    strength: "Concentraci\u00f3n",
    form: "Forma",
    shippingTitle: "Env\u00edo",
    shippingBody: "Entrega est\u00e1ndar en 2\u20134 d\u00edas h\u00e1biles. Env\u00edo gratis en pedidos superiores a $50.",
    paymentTitle: "Pago",
    paymentBody: "Aceptamos Visa, Mastercard y PayPal. Pago seguro.",
    noResults: "Ninguna medicina coincide con tu b\u00fasqueda.",
    addedToCart: "A\u00f1adido al carrito",
  },
  fr: {
    chooseLanguage: "Choisissez votre langue",
    catalogEyebrow: "MediCatalog",
    catalogTitle: "Catalogue de m\u00e9dicaments",
    catalogTagline: "Parcourez notre gamme de produits pharmaceutiques.",
    welcomeTitle: "Bienvenue",
    welcomeTagline: "Votre source de confiance pour des m\u00e9dicaments de qualit\u00e9, livr\u00e9s avec soin.",
    searchPlaceholder: "Rechercher des m\u00e9dicaments\u2026",
    all: "Tous",
    backToCatalog: "Retour au catalogue",
    productDetails: "D\u00e9tails du produit",
    inStock: "En stock",
    outOfStock: "Rupture de stock",
    price: "Prix",
    addToCart: "Ajouter au panier",
    unavailable: "Indisponible",
    strength: "Dosage",
    form: "Forme",
    shippingTitle: "Livraison",
    shippingBody: "Livraison standard en 2\u20134 jours ouvr\u00e9s. Livraison gratuite d\u00e8s $50 d'achat.",
    paymentTitle: "Paiement",
    paymentBody: "Nous acceptons Visa, Mastercard et PayPal. Paiement s\u00e9curis\u00e9.",
    noResults: "Aucun m\u00e9dicament ne correspond \u00e0 votre recherche.",
    addedToCart: "Ajout\u00e9 au panier",
  },
  de: {
    chooseLanguage: "W\u00e4hle deine Sprache",
    catalogEyebrow: "MediCatalog",
    catalogTitle: "Medikamentenkatalog",
    catalogTagline: "Durchst\u00f6bern Sie unser Sortiment an Arzneimitteln.",
    welcomeTitle: "Willkommen",
    welcomeTagline: "Ihre vertrauenswürdige Quelle f\u00fcr hochwertige Medikamente, sorgf\u00e4ltig geliefert.",
    searchPlaceholder: "Medikamente suchen\u2026",
    all: "Alle",
    backToCatalog: "Zur\u00fcck zum Katalog",
    productDetails: "Produktdetails",
    inStock: "Auf Lager",
    outOfStock: "Nicht vorr\u00e4tig",
    price: "Preis",
    addToCart: "In den Warenkorb",
    unavailable: "Nicht verf\u00fcgbar",
    strength: "St\u00e4rke",
    form: "Form",
    shippingTitle: "Versand",
    shippingBody: "Standardlieferung in 2\u20134 Werktagen. Kostenloser Versand ab $50 Bestellwert.",
    paymentTitle: "Zahlung",
    paymentBody: "Wir akzeptieren Visa, Mastercard und PayPal. Sichere Kasse.",
    noResults: "Keine Medikamente entsprechen deiner Suche.",
    addedToCart: "Zum Warenkorb hinzugef\u00fcgt",
  },
};

const state = {
  lang: "en",
  search: "",
  category: "All",
  qty: {},
};

function t(key) {
  return (STRINGS[state.lang] && STRINGS[state.lang][key]) || STRINGS.en[key];
}

function formIcon(form) {
  if (form === "Capsule") return "ti-pill";
  if (form === "Liquid") return "ti-flask-2";
  return "ti-pill";
}

function money(n) {
  return "$" + n.toFixed(2);
}

function setLang(code) {
  state.lang = code;
  const meta = LANGS.find((l) => l.code === code);
  document.body.dir = meta.dir;
  render();
}

function renderLangSwitch() {
  return `<div class="lang-switch">${LANGS.map(
    (l) => `<button class="lang-btn ${l.code === state.lang ? "active" : ""}" onclick="setLang('${l.code}')">${l.label}</button>`
  ).join("")}</div>`;
}

function goHome() {
  location.hash = "";
}

function goProduct(id) {
  location.hash = "#product-" + id;
}

function setQty(id, delta) {
  const current = state.qty[id] || 1;
  const next = Math.max(1, current + delta);
  state.qty[id] = next;
  const el = document.getElementById("qty-value");
  if (el) el.textContent = next;
}

function addToCart(id) {
  const toast = document.getElementById("cart-toast");
  toast.textContent = t("addedToCart");
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 1600);
}

function setSearch(value) {
  state.search = value;
  renderCatalogGrid();
}

function setCategory(cat) {
  state.category = cat;
  render();
}

function filteredMedicines() {
  const q = state.search.trim().toLowerCase();
  return MEDICINES.filter((m) => {
    const matchesCategory = state.category === "All" || m.category === state.category;
    const matchesSearch = !q || m.name.toLowerCase().includes(q) || m.category.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });
}

function cardTemplate(m) {
  return `
    <div class="card" onclick="goProduct('${m.id}')">
      <div class="card-media">
        <span class="badge">${m.category}</span>
        <i class="ti ${formIcon(m.form)} icon-pill" aria-hidden="true"></i>
        <span class="form-label">Form: ${m.form}</span>
      </div>
      <div class="card-body">
        <h3>${m.name}</h3>
        <p class="card-meta">Strength: ${m.strength || "\u2014"} &nbsp;\u00b7&nbsp; ${m.form}</p>
        <p class="card-desc">${m.description}</p>
        <div class="card-footer">
          <div>
            <div class="price-label">${t("price")}</div>
            <div class="price-value">${money(m.price)}</div>
          </div>
          <button class="btn btn-primary" onclick="event.stopPropagation(); goProduct('${m.id}')" ${m.inStock ? "" : "disabled"}>
            ${m.inStock ? t("productDetails") : t("unavailable")}
          </button>
        </div>
      </div>
    </div>`;
}

function renderCatalogGrid() {
  const grid = document.getElementById("catalog-grid");
  if (!grid) return;
  const items = filteredMedicines();
  grid.innerHTML = items.length
    ? items.map(cardTemplate).join("")
    : `<div class="empty-state" style="grid-column: 1 / -1;">${t("noResults")}</div>`;
}

function renderHome() {
  document.getElementById("topbar-left").innerHTML = "";
  document.getElementById("topbar-right").innerHTML = renderLangSwitch();

  const categoryChips = ["All", ...CATEGORIES];

  document.getElementById("app").innerHTML = `
    <section class="welcome">
      <h1>${t("welcomeTitle")}</h1>
      <p class="tagline">${t("welcomeTagline")}</p>

      <div class="lang-section">
        <div class="eyebrow">${t("chooseLanguage")}</div>
        <div class="pill-row">
          ${LANGS.map(
            (l) => `<button class="pill-choice ${l.code === state.lang ? "active" : ""}" onclick="setLang('${l.code}')">${
              { en: "English", ar: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629", es: "Espa\u00f1ol", fr: "Fran\u00e7ais", de: "Deutsch" }[l.code]
            }</button>`
          ).join("")}
        </div>
      </div>

      <div class="catalog-heading">
        <div class="eyebrow">${t("catalogEyebrow")}</div>
        <h2>${t("catalogTitle")}</h2>
        <p>${t("catalogTagline")}</p>
      </div>

      <div class="search-box">
        <i class="ti ti-search" aria-hidden="true"></i>
        <input type="text" placeholder="${t("searchPlaceholder")}" value="${state.search}" oninput="setSearch(this.value)" />
      </div>

      <div class="category-row">
        ${categoryChips
          .map(
            (c) =>
              `<button class="category-chip ${c === state.category ? "active" : ""}" onclick="setCategory('${c}')">${
                c === "All" ? t("all") : c
              }</button>`
          )
          .join("")}
      </div>
    </section>

    <section class="catalog">
      <div class="catalog-grid" id="catalog-grid"></div>
    </section>
  `;

  renderCatalogGrid();
}

function renderProduct(id) {
  const m = MEDICINES.find((x) => x.id === id);
  if (!m) {
    goHome();
    return;
  }
  state.qty[id] = state.qty[id] || 1;

  document.getElementById("topbar-left").innerHTML = `
    <button class="back-link" onclick="goHome()">
      <i class="ti ti-arrow-left" aria-hidden="true"></i> ${t("backToCatalog")}
    </button>`;
  document.getElementById("topbar-right").innerHTML = `
    <button class="brand" onclick="goHome()">
      <span class="mark">Rx</span>
      <span>MediCatalog</span>
    </button>`;

  document.getElementById("app").innerHTML = `
    <section class="product">
      <div class="product-grid">
        <div class="product-media">
          <i class="ti ${formIcon(m.form)} icon-pill" aria-hidden="true"></i>
          <span class="form-label">${m.form}</span>
        </div>
        <div class="product-info">
          <div class="eyebrow">${m.category}</div>
          <h1>${m.name}</h1>
          <div class="meta-row">
            <span>${t("strength")}: ${m.strength || "\u2014"}</span>
            <span class="dot"></span>
            <span>${t("form")}: ${m.form}</span>
            <span class="stock-pill ${m.inStock ? "" : "out"}">${m.inStock ? t("inStock") : t("outOfStock")}</span>
          </div>
          <p class="product-desc">${m.description}</p>
          <div class="price-block">
            <div class="price-label">${t("price")}</div>
            <div class="price-value">${money(m.price)}</div>
          </div>
          <div class="purchase-row">
            <div class="qty-control">
              <button onclick="setQty('${m.id}', -1)" aria-label="Decrease quantity">\u2212</button>
              <span id="qty-value">${state.qty[m.id]}</span>
              <button onclick="setQty('${m.id}', 1)" aria-label="Increase quantity">+</button>
            </div>
            <button class="btn btn-primary btn-add" onclick="addToCart('${m.id}')" ${m.inStock ? "" : "disabled"}>
              ${m.inStock ? t("addToCart") : t("unavailable")}
            </button>
          </div>
        </div>
      </div>

      <div class="info-cards">
        <div class="info-card">
          <div class="info-head">
            <div class="info-icon"><i class="ti ti-truck-delivery" aria-hidden="true"></i></div>
            <h3>${t("shippingTitle")}</h3>
          </div>
          <p>${t("shippingBody")}</p>
        </div>
        <div class="info-card">
          <div class="info-head">
            <div class="info-icon"><i class="ti ti-credit-card" aria-hidden="true"></i></div>
            <h3>${t("paymentTitle")}</h3>
          </div>
          <p>${t("paymentBody")}</p>
        </div>
      </div>
    </section>
  `;
}

function render() {
  const hash = location.hash;
  if (hash.startsWith("#product-")) {
    renderProduct(hash.replace("#product-", ""));
  } else {
    renderHome();
  }
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", render);
render();
