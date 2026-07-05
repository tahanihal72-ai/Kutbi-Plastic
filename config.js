const cfg = BUSINESS_CONFIG;

function setTheme() {
  document.documentElement.style.setProperty("--primary", cfg.theme.primary);
  document.documentElement.style.setProperty("--dark", cfg.theme.dark);
  document.documentElement.style.setProperty("--accent", cfg.theme.accent);
  document.documentElement.style.setProperty("--light", cfg.theme.light);
}

function whatsappUrl(message) {
  return `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(message)}`;
}

function initContent() {
  document.title = `${cfg.name} | ${cfg.tagline}`;
  document.querySelector("#pageDescription").content = cfg.description;
  document.querySelector("#brandName").textContent = cfg.name;
  document.querySelector("#brandTagline").textContent = cfg.tagline;
  document.querySelector("#heroTagline").textContent = cfg.tagline;
  document.querySelector("#heroTitle").textContent = `${cfg.name} for ${cfg.targetCustomers}`;
  document.querySelector("#heroDescription").textContent = cfg.description;
  document.querySelector("#heroBg").style.backgroundImage = `url('${cfg.images.hero}')`;
  document.querySelector("#heroWhatsapp").href = whatsappUrl(`Hello ${cfg.name}, I want to enquire about wholesale products.`);
  document.querySelector("#aboutTitle").textContent = `About ${cfg.name}`;
  document.querySelector("#aboutText").textContent = cfg.description;
  document.querySelector("#aboutImg").src = cfg.images.about;
  document.querySelector("#policyText").textContent = cfg.policy;
  document.querySelector("#contactName").textContent = cfg.name;
  document.querySelector("#contactAddress").textContent = cfg.address;
  document.querySelector("#contactHours").textContent = cfg.openingHours;
  document.querySelector("#callBtn").href = `tel:${cfg.phone.replace(/\s/g, "")}`;
  document.querySelector("#whatsappBtn").href = whatsappUrl(`Hello ${cfg.name}, I want to contact you.`);
  document.querySelector("#floatWhatsapp").href = whatsappUrl(`Hello ${cfg.name}, I want product details.`);
  document.querySelector("#footerText").textContent = `© ${new Date().getFullYear()} ${cfg.name}. All rights reserved.`;
  document.querySelector("#mapFrame").src = `https://www.google.com/maps?q=${encodeURIComponent(cfg.mapQuery)}&output=embed`;

  document.querySelector("#featuresGrid").innerHTML = cfg.features.map(item => `<div class="card">${item}</div>`).join("");
  document.querySelector("#servicesList").innerHTML = cfg.services.map(item => `<li>${item}</li>`).join("");

  const categoryOptions = cfg.categories.map(cat => `<option value="${cat}">${cat}</option>`).join("");
  document.querySelector("#categoryFilter").insertAdjacentHTML("beforeend", categoryOptions);
  document.querySelector("#formCategory").innerHTML = `<option value="">Select category</option>${categoryOptions}`;

  renderProducts();
  renderGallery();
}

function renderProducts() {
  const search = document.querySelector("#searchInput").value.toLowerCase();
  const category = document.querySelector("#categoryFilter").value;
  const products = cfg.products.filter(product => {
    const matchesSearch = `${product.name} ${product.category} ${product.details}`.toLowerCase().includes(search);
    const matchesCategory = category === "all" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  document.querySelector("#productGrid").innerHTML = products.map(product => {
    const msg = `Hello ${cfg.name}, I want details for ${product.name}.`;
    return `
      <article class="product-card">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <div class="product-body">
          <span class="badge">${product.category}</span>
          <h3>${product.name}</h3>
          <p>${product.details}</p>
          <div class="price">${product.price}</div>
          <a class="btn primary" target="_blank" href="${whatsappUrl(msg)}">Enquire on WhatsApp</a>
        </div>
      </article>
    `;
  }).join("") || `<p>No product found.</p>`;
}

function renderGallery() {
  document.querySelector("#galleryGrid").innerHTML = cfg.images.gallery
    .map((img, index) => `<img src="${img}" alt="${cfg.name} gallery image ${index + 1}" loading="lazy">`)
    .join("");
}

function initForm() {
  document.querySelector("#wholesaleForm").addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(event.target);
    const msg = `Wholesale Enquiry for ${cfg.name}\n\nName/Shop: ${data.get("name")}\nPhone: ${data.get("phone")}\nCategory: ${data.get("category")}\nRequirement: ${data.get("message")}`;
    window.open(whatsappUrl(msg), "_blank");
    event.target.reset();
  });
}

function initNavigation() {
  const menu = document.querySelector("#nav");
  document.querySelector("#menuBtn").addEventListener("click", () => menu.classList.toggle("open"));
  document.querySelectorAll("[data-nav]").forEach(link => {
    link.addEventListener("click", () => menu.classList.remove("open"));
  });
}

function initFilters() {
  document.querySelector("#searchInput").addEventListener("input", renderProducts);
  document.querySelector("#categoryFilter").addEventListener("change", renderProducts);
}

setTheme();
initContent();
initForm();
initNavigation();
initFilters();
