const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const fields = {
  businessName: $("#businessName"),
  businessCategory: $("#businessCategory"),
  phoneNumber: $("#phoneNumber"),
  emailAddress: $("#emailAddress"),
  businessDescription: $("#businessDescription"),
  aiMindset: $("#aiMindset"),
  products: $("#products"),
  services: $("#services"),
  mapQuery: $("#mapQuery"),
  googleMapUrl: $("#googleMapUrl"),
  mapCoordinates: $("#mapCoordinates"),
  landmark: $("#landmark"),
  serviceArea: $("#serviceArea"),
  targetCustomers: $("#targetCustomers"),
  businessHours: $("#businessHours"),
  themeSelector: $("#themeSelector"),
  appPrimaryColor: $("#appPrimaryColor"),
  appBackgroundColor: $("#appBackgroundColor"),
  appTextColor: $("#appTextColor"),
  sitePrimaryColor: $("#sitePrimaryColor"),
  siteSecondaryColor: $("#siteSecondaryColor"),
  siteBackgroundColor: $("#siteBackgroundColor"),
  siteTextColor: $("#siteTextColor"),
  siteButtonColor: $("#siteButtonColor"),
  metaTitle: $("#metaTitle"),
  metaDescription: $("#metaDescription"),
  seoKeywords: $("#seoKeywords")
};

const preview = {
  root: $("#websitePreview"),
  logo: $("#previewLogo"),
  category: $("#previewCategory"),
  name: $("#previewName"),
  heroText: $("#previewHeroText"),
  aboutTitle: $("#previewAboutTitle"),
  description: $("#previewDescription"),
  productList: $("#productList"),
  serviceList: $("#serviceList"),
  gallery: $("#previewGalleryGrid"),
  heroMedia: $("#heroMedia"),
  aboutImage: $("#aboutImageSlot"),
  mapTitle: $("#previewMapTitle"),
  landmark: $("#previewLandmark"),
  serviceArea: $("#previewServiceArea"),
  mapLink: $("#mapLink"),
  phoneLink: $("#phoneLink"),
  emailLink: $("#emailLink"),
  whatsappButton: $("#whatsappButton"),
  whatsappHero: $("#whatsappHero"),
  floatingWhatsapp: $("#floatingWhatsapp"),
  contactText: $("#previewContactText"),
  copyright: $("#copyrightText"),
  developerCredit: $("#developerCredit"),
  status: $("#previewStatus"),
  hours: $("#previewHours"),
  target: $("#previewTarget"),
  vision: $("#previewVision"),
  faq: $("#faqList"),
  blog: $("#blogGrid"),
  testimonials: $("#testimonialSlider")
};

const state = {
  logoUrl: "",
  photoUrls: [],
  photoFiles: [],
  productImages: [],
  videos: [],
  catalogue: "",
  activeStep: 0,
  premiumMode: false,
  products: [
    { name: "Business website package", category: "Web", description: "Modern business website with hosting-ready static files.", price: "Custom", availability: "Available" },
    { name: "Cloud setup package", category: "Cloud", description: "Email, storage, backup and workspace setup for teams.", price: "Custom", availability: "Available" },
    { name: "Cybersecurity audit", category: "Security", description: "Practical security review for networks, devices and accounts.", price: "Custom", availability: "Available" }
  ],
  services: [
    { name: "Managed IT support", icon: "Support", description: "Reliable helpdesk and device support for daily business operations." },
    { name: "Network and server maintenance", icon: "Network", description: "Stable office networks, servers, backups and monitoring." },
    { name: "Website development and hosting", icon: "Web", description: "Professional websites built for trust, speed and conversion." }
  ],
  faqs: [
    ["Do you provide remote IT support?", "Yes, support can be provided remotely for software, email, cloud systems and troubleshooting."],
    ["Can you manage office networks?", "Yes, network setup, server maintenance, Wi-Fi optimization and backup planning are supported."],
    ["Do you build business websites?", "Yes, modern business websites, hosting setup and SEO-ready content can be delivered."]
  ],
  testimonials: [
    { name: "Ayesha Khan", rating: "5.0", text: "Professional IT support with quick response and clear communication." },
    { name: "Rohit Sharma", rating: "4.9", text: "Our office systems are more stable after their network and backup setup." },
    { name: "Nida Fatima", rating: "5.0", text: "Clean website delivery, reliable support and a very professional process." }
  ]
};

const aiOutput = $("#aiOutput");
const imageInsight = $("#imageInsight");
const photoGrid = $("#photoGrid");

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

function lines(value = "") {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

function initials(name) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((word) => word[0]).join("").toUpperCase() || "BA";
}

function cleanPhone(value) {
  return String(value || "").replace(/[^\d+]/g, "");
}

function getBusiness() {
  return {
    name: fields.businessName.value.trim() || "Your Business",
    category: fields.businessCategory.value.trim() || "Local business",
    description: fields.businessDescription.value.trim() || "A trusted local business ready to serve customers with care.",
    phone: fields.phoneNumber.value.trim() || "+91 98765 43210",
    email: fields.emailAddress.value.trim() || "hello@tndigitaltechnologies.com",
    mapQuery: fields.googleMapUrl.value.trim() || fields.mapCoordinates.value.trim() || fields.mapQuery.value.trim() || fields.businessName.value.trim() || "Local business",
    target: fields.targetCustomers.value.trim() || "Local customers",
    hours: fields.businessHours.value.trim() || "Open today"
  };
}

function syncStructuredData(business) {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: business.description,
    telephone: business.phone,
    email: business.email,
    areaServed: fields.serviceArea.value.trim(),
    url: $("#shareLink")?.value || ""
  };
  $("#structuredData").textContent = JSON.stringify(data);
  document.title = fields.metaTitle.value.trim() || `${business.name} | ${business.category}`;
  document.querySelector("meta[name='description']").setAttribute("content", fields.metaDescription.value.trim() || business.description);
}

function imageFor(index) {
  return state.photoUrls[index] || "";
}

function cardMarkup(item, index = 0, type = "product") {
  const image = type === "product" ? imageFor(index + 2) : imageFor(index + 5);
  if (typeof item === "string") return `<div class="mini-card">${escapeHtml(item)}</div>`;
  return `
    <div class="mini-card">
      ${image ? `<img src="${image}" alt="${escapeHtml(item.name)}">` : `<div class="card-icon">${type === "product" ? "IT" : "24"}</div>`}
      ${escapeHtml(item.name)}
      <small>${escapeHtml(item.category || item.icon || "Featured")} | ${escapeHtml(item.description || "")} ${item.price ? "| " + escapeHtml(item.price) : ""}</small>
      <button type="button">Quick Enquiry</button>
    </div>
  `;
}

function updatePreview() {
  const business = getBusiness();
  const whatsappUrl = `https://wa.me/${cleanPhone(business.phone).replace("+", "")}`;
  const quickProducts = lines(fields.products.value);
  const quickServices = lines(fields.services.value);

  preview.category.textContent = business.category;
  preview.name.textContent = business.name;
  preview.heroText.textContent = `${business.description.split(".")[0]}. Built for secure, scalable and dependable business technology.`;
  preview.aboutTitle.textContent = "Technology support built for serious businesses";
  preview.description.textContent = business.description;
  preview.productList.innerHTML = (quickProducts.length ? quickProducts.map((name) => ({ name, category: "Solution", description: "Professional business technology solution.", price: "Custom" })) : state.products).map((item, index) => cardMarkup(item, index, "product")).join("");
  preview.serviceList.innerHTML = (quickServices.length ? quickServices.map((name) => ({ name, icon: "Service", description: "Delivered with planning, support and documentation." })) : state.services).map((item, index) => cardMarkup(item, index, "service")).join("");
  preview.mapTitle.textContent = `Find ${business.name}`;
  preview.landmark.textContent = fields.landmark.value.trim() || "Add a nearby landmark";
  preview.serviceArea.textContent = fields.serviceArea.value.trim() || "Add the service area";
  preview.mapLink.href = normalizeMapLink(business.mapQuery);
  preview.phoneLink.textContent = business.phone;
  preview.phoneLink.href = `tel:${cleanPhone(business.phone)}`;
  preview.emailLink.textContent = business.email;
  preview.emailLink.href = `mailto:${business.email}`;
  preview.whatsappButton.href = whatsappUrl;
  preview.whatsappHero.href = whatsappUrl;
  preview.floatingWhatsapp.href = whatsappUrl;
  preview.contactText.textContent = `Call, email, or WhatsApp ${business.name} for fast help, orders, appointments, pricing and directions.`;
  preview.copyright.textContent = `Copyright ${new Date().getFullYear()} ${business.name}. All rights reserved.`;
  preview.hours.textContent = business.hours;
  preview.target.textContent = business.target;
  preview.vision.textContent = "Secure, scalable technology";
  $("#recentProjectName").textContent = business.name;

  if (state.logoUrl) preview.logo.innerHTML = `<img src="${state.logoUrl}" alt="${escapeHtml(business.name)} logo">`;
  else preview.logo.textContent = initials(business.name);

  preview.developerCredit.style.display = state.premiumMode ? "none" : "";
  renderGallery();
  renderFaq();
  renderBlog();
  renderTestimonials();
  calculateHealth();
  applyColorSettings();
  syncStructuredData(business);
  markReady();
}

function normalizeMapLink(value) {
  if (/^https?:\/\/(www\.)?google\./i.test(value) || /^https?:\/\/maps\.app\.goo\.gl/i.test(value)) return value;
  if (/^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/.test(value)) return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}`;
}

function renderGallery() {
  photoGrid.innerHTML = "";
  preview.gallery.innerHTML = "";
  if (!state.photoUrls.length) {
    preview.heroMedia.style.backgroundImage = "";
    preview.heroMedia.innerHTML = "<span>Business Photo</span>";
    preview.aboutImage.style.backgroundImage = "";
    preview.aboutImage.innerHTML = "<span>About Image</span>";
    preview.gallery.innerHTML = "<div></div><div></div><div></div>";
    return;
  }
  state.photoUrls.forEach((url, index) => {
    const thumb = document.createElement("img");
    thumb.src = url;
    thumb.alt = `Business upload ${index + 1}`;
    thumb.draggable = true;
    thumb.addEventListener("click", () => movePhotoToFront(index));
    photoGrid.appendChild(thumb);

    const galleryImage = document.createElement("img");
    galleryImage.src = url;
    galleryImage.alt = `Gallery image ${index + 1}`;
    preview.gallery.appendChild(galleryImage);
  });
  preview.heroMedia.style.backgroundImage = `linear-gradient(135deg, rgba(7, 27, 58, 0.1), rgba(37, 99, 235, 0.12)), url("${state.photoUrls[0]}")`;
  preview.heroMedia.innerHTML = "";
  preview.aboutImage.style.backgroundImage = `url("${state.photoUrls[1] || state.photoUrls[0]}")`;
  preview.aboutImage.innerHTML = "";
}

function movePhotoToFront(index) {
  const [item] = state.photoUrls.splice(index, 1);
  state.photoUrls.unshift(item);
  const [file] = state.photoFiles.splice(index, 1);
  if (file) state.photoFiles.unshift(file);
  updatePreview();
}

function renderFaq() {
  preview.faq.innerHTML = state.faqs.map(([q, a]) => `
    <details class="faq-item">
      <summary>${escapeHtml(q)}</summary>
      <p>${escapeHtml(a)}</p>
    </details>
  `).join("");
}

function renderBlog() {
  const business = getBusiness();
  const posts = [
    [`How ${business.name} keeps business technology reliable`, `A practical look at support, security, cloud systems and maintenance.`],
    [`Why professional IT services need a clean digital presence`, `Trust, clear contact options and strong technical positioning help clients decide faster.`],
    [`When to upgrade your office IT setup`, `Growing teams need better backups, secure access, stable networks and responsive support.`]
  ];
  preview.blog.innerHTML = posts.map(([title, text]) => `<article class="blog-card"><strong>${escapeHtml(title)}</strong><p>${escapeHtml(text)}</p></article>`).join("");
}

function renderTestimonials() {
  preview.testimonials.innerHTML = state.testimonials.map((item) => `
    <article class="testimonial-card">
      ${imageFor(8) ? `<img src="${imageFor(8)}" alt="${escapeHtml(item.name)}">` : `<div class="avatar">${escapeHtml(item.name[0])}</div>`}
      <span class="stars">★★★★★</span>
      <strong>${escapeHtml(item.name)} - ${escapeHtml(item.rating)}</strong>
      <p>${escapeHtml(item.text)}</p>
    </article>
  `).join("");
}

function renderManagers() {
  $("#productManager").innerHTML = state.products.map((item) => `
    <article><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.category)} | ${escapeHtml(item.price)} | ${escapeHtml(item.availability)}</small><small>${escapeHtml(item.description)}</small></article>
  `).join("");
  $("#serviceManager").innerHTML = state.services.map((item) => `
    <article><strong>${escapeHtml(item.icon)} ${escapeHtml(item.name)}</strong><small>${escapeHtml(item.description)}</small></article>
  `).join("");
}

function calculateHealth() {
  const business = getBusiness();
  const checks = {
    SEO: fields.metaTitle.value && fields.metaDescription.value ? 88 : 62,
    Performance: 91,
    Accessibility: 84,
    Branding: state.logoUrl ? 92 : 66,
    Images: state.photoUrls.length >= 3 ? 88 : 58,
    Mobile: 90,
    Security: 86
  };
  let score = Math.round(Object.values(checks).reduce((sum, value) => sum + value, 0) / Object.keys(checks).length);
  $("#overallScore").textContent = score;
  $("#scoreMetric").textContent = score;
  $("#healthBars").innerHTML = Object.entries(checks).map(([key, value]) => `
    <div class="health-row"><span>${key}</span><div class="bar"><i style="width:${value}%"></i></div><b>${value}</b></div>
  `).join("");
  const suggestions = [];
  if (!state.photoUrls.length) suggestions.push("Missing Hero Image");
  if (!state.logoUrl) suggestions.push("Need Logo");
  if (!state.faqs.length) suggestions.push("Need FAQ");
  if (!business.hours) suggestions.push("Need Business Hours");
  if (state.testimonials.length < 3) suggestions.push("Need Testimonials");
  if (!business.phone || !business.email) suggestions.push("Contact Information");
  suggestions.push("Need Better CTA", "Add Social Media", "More Products");
  $("#healthSuggestions").innerHTML = suggestions.slice(0, 8).map((item) => `<div>${item}</div>`).join("");
}

function analyzeImages() {
  const count = state.photoUrls.length;
  if (!count) {
    imageInsight.textContent = "Missing images: add exterior, interior, products, staff, logo and banner images for a stronger premium website.";
    return;
  }
  const names = state.photoFiles.map((file) => file.name.toLowerCase()).join(" ");
  const detected = [
    names.includes("product") || count > 2 ? "Products" : "Need product images",
    names.includes("office") || names.includes("interior") || count > 1 ? "Office / Interior" : "Need office image",
    names.includes("team") || names.includes("staff") || count > 4 ? "Team / Staff" : "Need team photo",
    state.logoUrl ? "Logo" : "Missing logo",
    names.includes("banner") || count > 0 ? "Hero banner" : "Need hero banner"
  ];
  const resolution = count >= 3 ? "Resolution readiness looks good for a local business gallery." : "Some images may feel low-depth because the gallery has fewer than 3 photos.";
  imageInsight.textContent = `${count} uploaded. Detected: ${detected.join(", ")}. ${resolution} Enhancement placeholder: brightness, crop and sharpness optimization ready.`;
}

function generateSuggestion() {
  const b = getBusiness();
  aiOutput.innerHTML = `<strong>Strategy:</strong> Position ${escapeHtml(b.name)} as a professional ${escapeHtml(b.category)} provider for ${escapeHtml(b.target)}.<br><strong>Advisor:</strong> Use a strong technology hero image, clear service cards, business hours, FAQ, testimonials and direct contact actions.`;
}

function writeCopy() {
  const b = getBusiness();
  fields.businessDescription.value = `${b.name} provides professional ${b.category} for teams that need reliable systems, secure operations and responsive technical support. Explore services, review solutions and contact the team for a consultation.`;
  aiOutput.innerHTML = `<strong>Copywriter:</strong> Rewritten about and hero copy for ${escapeHtml(b.name)}.`;
  updatePreview();
}

function runAiAction(type) {
  const b = getBusiness();
  const output = {
    hero: `${b.name} delivers professional ${b.category} with reliable support, secure systems and clear communication.`,
    about: `${b.name} helps ${b.target} operate with stronger technology, safer systems and responsive service.`,
    faq: "Generated FAQ: support response, service coverage, onboarding, security and maintenance.",
    services: "Generated Services: IT support, cloud setup, cybersecurity, website development and maintenance.",
    vision: "Vision: Become the most trusted technology partner for growing businesses.",
    mission: "Mission: Keep client systems secure, reliable, fast and easy to manage.",
    products: "Generated solution descriptions with business benefits, delivery scope and availability.",
    privacy: "Privacy Policy: Customer contact details are used only for service, follow-up and order communication.",
    terms: "Terms: Prices and availability may change; customers should confirm details before purchase.",
    contact: "Contact Content: Call, WhatsApp or email for consultations, support requests and project discussions.",
    metaTitle: `${b.name} | Premium ${b.category}`,
    metaDescription: `${b.name} offers trusted ${b.category}, quick support, WhatsApp contact and local service for ${b.target}.`
  };
  if (type === "hero") fields.aiMindset.value = output.hero;
  if (type === "about") fields.businessDescription.value = output.about;
  if (type === "faq") state.faqs.push(["How do I get the fastest response?", "Use WhatsApp for quick replies, product details and directions."]);
  if (type === "services") fields.services.value = "Premium consultation\nFast local support\nWhatsApp ordering\nAfter-sales assistance";
  if (type === "metaTitle") fields.metaTitle.value = output.metaTitle;
  if (type === "metaDescription") fields.metaDescription.value = output.metaDescription;
  aiOutput.innerHTML = `<strong>${escapeHtml(type)}:</strong> ${escapeHtml(output[type])}`;
  updatePreview();
}

function fillFromChat() {
  const text = $("#aiChatInput").value.trim();
  if (!text) {
    aiOutput.textContent = "Add a business brief first, then the assistant can auto-fill the builder.";
    return;
  }
  const nameMatch = text.match(/(?:own|run|started|business called)\s+([A-Z][A-Za-z0-9 &-]+)/i);
  const sellMatch = text.match(/sell\s+([^.,]+)/i);
  const customerMatch = text.match(/customers are\s+([^.,]+)/i);
  if (nameMatch) fields.businessName.value = nameMatch[1].trim();
  if (sellMatch) fields.businessCategory.value = sellMatch[1].trim();
  if (customerMatch) fields.targetCustomers.value = customerMatch[1].trim();
  fields.businessDescription.value = `${fields.businessName.value || "This business"} supplies ${fields.businessCategory.value || "quality products"} for ${fields.targetCustomers.value || "local customers"} with professional service, clear communication and reliable support.`;
  fields.products.value = sellMatch ? `${sellMatch[1].trim()}\nBulk orders\nPremium product range` : fields.products.value;
  fields.services.value = "Managed IT support\nCloud migration\nCybersecurity monitoring\nWebsite development";
  fields.metaTitle.value = `${fields.businessName.value} | ${fields.businessCategory.value}`;
  fields.metaDescription.value = `Premium ${fields.businessCategory.value} for ${fields.targetCustomers.value}. Contact on WhatsApp for pricing and orders.`;
  aiOutput.innerHTML = "<strong>Assistant:</strong> Business name, category, about, products, services, target customers and SEO fields were filled from the brief.";
  updatePreview();
}

function applyTheme() {
  const selected = fields.themeSelector.value || "Corporate";
  const command = ($("#designerCommand")?.value || selected).toLowerCase();
  const palettes = {
    minimal: ["#0f172a", "#38bdf8", "#ffffff", "#1f2937", "#2563eb"],
    corporate: ["#0b3d91", "#38bdf8", "#ffffff", "#1f2937", "#2563eb"],
    luxury: ["#111827", "#d4af37", "#fbfbf9", "#1f2937", "#111827"],
    medical: ["#075985", "#7dd3fc", "#f8fbff", "#1f2937", "#0284c7"],
    restaurant: ["#7c2d12", "#fb923c", "#fff7ed", "#2f241f", "#ea580c"],
    electronics: ["#083344", "#22d3ee", "#ecfeff", "#164e63", "#0891b2"],
    fashion: ["#111111", "#f0abfc", "#faf5ff", "#27272a", "#111111"],
    wholesale: ["#1e3a8a", "#f97316", "#f8fafc", "#1f2937", "#2563eb"],
    industrial: ["#1f2937", "#f59e0b", "#f3f4f6", "#111827", "#374151"],
    school: ["#1d4ed8", "#facc15", "#eff6ff", "#1e293b", "#2563eb"],
    hotel: ["#1c1917", "#d4af37", "#fafaf9", "#292524", "#92400e"],
    "corporate dark": ["#020617", "#38bdf8", "#0f172a", "#e5e7eb", "#2563eb"],
    "apple style": ["#111827", "#60a5fa", "#f8fafc", "#111827", "#2563eb"],
    "modern gradient": ["#4338ca", "#06b6d4", "#f8fafc", "#111827", "#7c3aed"]
  };
  const key = Object.keys(palettes).find((item) => command.includes(item)) || selected.toLowerCase();
  const palette = palettes[key] || palettes.corporate;
  const theme = key.includes("luxury") ? "theme-luxury" :
    key.includes("medical") ? "theme-medical" :
    key.includes("fashion") ? "theme-fashion" :
    key.includes("apple") ? "theme-apple" :
    key.includes("gradient") ? "theme-gradient" :
    "theme-corporate";

  [fields.sitePrimaryColor.value, fields.siteSecondaryColor.value, fields.siteBackgroundColor.value, fields.siteTextColor.value, fields.siteButtonColor.value] = palette;
  preview.root.className = `website-preview ${theme}`;
  applyColorSettings();
}

function applyColorSettings() {
  const root = document.documentElement;
  root.style.setProperty("--accent", fields.appPrimaryColor.value);
  root.style.setProperty("--accent-strong", fields.appPrimaryColor.value);
  root.style.setProperty("--bg", fields.appBackgroundColor.value);
  root.style.setProperty("--ink", fields.appTextColor.value);
  preview.root.style.setProperty("--site-primary", fields.sitePrimaryColor.value);
  preview.root.style.setProperty("--site-secondary", fields.siteSecondaryColor.value);
  preview.root.style.setProperty("--site-bg", fields.siteBackgroundColor.value);
  preview.root.style.setProperty("--site-text", fields.siteTextColor.value);
  preview.root.style.setProperty("--site-button", fields.siteButtonColor.value);
}

function advisor() {
  const suggestions = [
    "Better Colors: choose a theme that matches the business category and customer trust level.",
    "Better Hero: use the strongest exterior/product photo as the first visual.",
    "Better CTA: keep WhatsApp and phone visible above the fold.",
    "More Images: add staff, storefront, product close-ups and delivery proof.",
    "Testimonials: add 3-6 customer reviews with ratings.",
    "Business Hours: keep hours visible in About and Contact.",
    "Social Media: add Instagram, Facebook and Google Business links."
  ];
  $("#advisorList").innerHTML = suggestions.map((item) => `<div>${item}</div>`).join("");
}

function setStep(index) {
  state.activeStep = Math.max(0, Math.min(8, index));
  $$("#wizardSteps button").forEach((button, i) => button.classList.toggle("active", i === state.activeStep));
  $$(".wizard-card").forEach((panel, i) => panel.classList.toggle("active", i === state.activeStep));
  $("#currentStepText").textContent = `Step ${state.activeStep + 1}`;
}

function markReady() {
  preview.status.textContent = "Updated";
  window.clearTimeout(markReady.timer);
  markReady.timer = window.setTimeout(() => { preview.status.textContent = "Ready"; }, 700);
}

function resetApp() {
  fields.businessName.value = "";
  fields.businessCategory.value = "";
  fields.phoneNumber.value = "";
  fields.emailAddress.value = "";
  fields.businessDescription.value = "";
  fields.products.value = "";
  fields.services.value = "";
  fields.mapQuery.value = "";
  fields.googleMapUrl.value = "";
  fields.mapCoordinates.value = "";
  fields.landmark.value = "";
  fields.serviceArea.value = "";
  fields.targetCustomers.value = "";
  fields.businessHours.value = "";
  state.logoUrl = "";
  state.photoUrls = [];
  state.photoFiles = [];
  state.premiumMode = false;
  aiOutput.textContent = "Use the assistant buttons to generate positioning, copy, SEO, policies and section ideas.";
  updatePreview();
}

function prepareDeploy() {
  $("#deployStatus").textContent = "Deployment Status: Static package ready for Netlify upload.";
  $("#deployMetric").textContent = "Ready";
  $("#shareLink").value = `https://${getBusiness().name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "tn-digital-technologies"}.netlify.app`;
}

function crc32(text) {
  const table = crc32.table || (crc32.table = Array.from({ length: 256 }, (_, index) => {
    let value = index;
    for (let bit = 0; bit < 8; bit += 1) value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    return value >>> 0;
  }));
  const bytes = new TextEncoder().encode(text);
  let crc = -1;
  bytes.forEach((byte) => {
    crc = (crc >>> 8) ^ table[(crc ^ byte) & 0xff];
  });
  return (crc ^ -1) >>> 0;
}

function numberToBytes(value, length) {
  return Array.from({ length }, (_, index) => (value >>> (index * 8)) & 0xff);
}

function stringBytes(text) {
  return Array.from(new TextEncoder().encode(text));
}

function createZip(files) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  files.forEach((file) => {
    const name = stringBytes(file.name);
    const content = stringBytes(file.content);
    const crc = crc32(file.content);
    const localHeader = [
      ...numberToBytes(0x04034b50, 4), ...numberToBytes(20, 2), ...numberToBytes(0, 2),
      ...numberToBytes(0, 2), ...numberToBytes(0, 2), ...numberToBytes(0, 2),
      ...numberToBytes(crc, 4), ...numberToBytes(content.length, 4), ...numberToBytes(content.length, 4),
      ...numberToBytes(name.length, 2), ...numberToBytes(0, 2), ...name
    ];
    localParts.push(...localHeader, ...content);
    centralParts.push(
      ...numberToBytes(0x02014b50, 4), ...numberToBytes(20, 2), ...numberToBytes(20, 2),
      ...numberToBytes(0, 2), ...numberToBytes(0, 2), ...numberToBytes(0, 2), ...numberToBytes(0, 2),
      ...numberToBytes(crc, 4), ...numberToBytes(content.length, 4), ...numberToBytes(content.length, 4),
      ...numberToBytes(name.length, 2), ...numberToBytes(0, 2), ...numberToBytes(0, 2),
      ...numberToBytes(0, 2), ...numberToBytes(0, 2), ...numberToBytes(0, 4),
      ...numberToBytes(offset, 4), ...name
    );
    offset += localHeader.length + content.length;
  });

  const end = [
    ...numberToBytes(0x06054b50, 4), ...numberToBytes(0, 2), ...numberToBytes(0, 2),
    ...numberToBytes(files.length, 2), ...numberToBytes(files.length, 2),
    ...numberToBytes(centralParts.length, 4), ...numberToBytes(localParts.length, 4),
    ...numberToBytes(0, 2)
  ];
  return new Blob([new Uint8Array([...localParts, ...centralParts, ...end])], { type: "application/zip" });
}

function generatedWebsiteHtml() {
  const business = getBusiness();
  const previewHtml = preview.root.cloneNode(true);
  previewHtml.querySelectorAll("script").forEach((node) => node.remove());
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(business.name)}</title>
  <meta name="description" content="${escapeHtml(fields.metaDescription.value || business.description)}">
  <style>
    body{margin:0;font-family:Inter,Arial,sans-serif;background:#fff;color:#1f2937}
    a{text-decoration:none;color:inherit}button,input,textarea{font:inherit}
    .website-preview{background:#fff;color:#17211b}.site-header{position:sticky;top:0;z-index:5;min-height:66px;padding:14px 24px;display:flex;align-items:center;justify-content:space-between;gap:18px;background:rgba(255,255,255,.9);border-bottom:1px solid #e2e8f0;backdrop-filter:blur(18px)}.site-logo{width:48px;height:48px;display:grid;place-items:center;border-radius:14px;background:linear-gradient(135deg,#0b3d91,#38bdf8);color:#fff;font-weight:900;overflow:hidden}.site-logo img{width:100%;height:100%;object-fit:cover}.site-header nav{display:flex;gap:12px;flex-wrap:wrap;align-items:center;color:#475569;font-weight:900;font-size:12px}.site-header nav a{padding:8px 10px;border-radius:999px}.nav-cta{background:#2563eb;color:#fff}.site-hero{display:grid;grid-template-columns:1.05fr .95fr;min-height:560px;position:relative;overflow:hidden;background:linear-gradient(90deg,rgba(7,27,58,.94),rgba(11,61,145,.78),rgba(15,23,42,.25)),#0b3d91;color:#fff}.hero-copy{padding:clamp(34px,6vw,70px);display:flex;flex-direction:column;justify-content:center;gap:18px}.site-hero h2{font-size:clamp(40px,6vw,78px);line-height:1.02;margin:0}.site-hero p{font-size:18px;line-height:1.7;color:rgba(255,255,255,.86)}.hero-copy span,.site-eyebrow{color:#bae6fd;text-transform:uppercase;font-size:12px;font-weight:900}.hero-actions,.button-row{display:flex;gap:10px;flex-wrap:wrap}.site-button,.whatsapp-button{display:inline-flex;justify-content:center;padding:13px 16px;border-radius:999px;background:#2563eb;color:#fff;font-weight:900}.site-button.secondary{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.34)}.hero-media,.about-image{min-height:310px;border-radius:24px;margin:26px;background:#e0f2fe center/cover no-repeat;box-shadow:0 30px 70px rgba(15,23,42,.24)}.hero-stats,.value-grid,.timeline,.why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.hero-stats div{padding:14px;border:1px solid rgba(255,255,255,.18);border-radius:18px;background:rgba(255,255,255,.1)}.site-section{padding:clamp(48px,7vw,86px);border-bottom:1px solid #e9eee9}.site-section h3{font-size:clamp(30px,4vw,50px);line-height:1.08;margin:8px 0 0}.site-section p{color:#59645d;line-height:1.75}.about-layout,.split-section,.location-section,.contact-section{display:grid;grid-template-columns:1fr 1fr;gap:34px;align-items:center}.mini-card-grid,.faq-list,.blog-grid,.testimonial-slider{display:grid;gap:18px;margin-top:24px}.mini-card,.faq-item,.blog-card,.testimonial-card,.contact-card,.why-grid div,.value-grid div,.timeline div{padding:20px;background:#fff;border:1px solid #e2e8f0;border-radius:22px;box-shadow:0 18px 45px rgba(15,23,42,.07)}.mini-card img{width:100%;aspect-ratio:1.2;object-fit:cover;border-radius:18px;margin-bottom:14px}.site-gallery{display:grid;grid-template-columns:1.1fr .9fr 1fr;grid-auto-rows:170px;gap:16px;margin-top:26px}.site-gallery img,.site-gallery div{width:100%;height:100%;object-fit:cover;border-radius:22px;background:#dbeafe}.site-gallery img:nth-child(1),.site-gallery div:nth-child(1){grid-row:span 2}.map-card{min-height:185px;display:grid;place-items:center;border-radius:22px;background:#eff6ff;color:#0b3d91;font-weight:900}.floating-whatsapp{position:fixed;right:18px;bottom:18px;padding:13px 16px;border-radius:999px;background:#2563eb;color:#fff;font-weight:900}.site-footer{padding:28px;background:#071b3a;color:#fff;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}@media(max-width:900px){.site-hero,.about-layout,.split-section,.location-section,.contact-section,.hero-stats,.value-grid,.timeline,.why-grid{grid-template-columns:1fr}.site-header nav{display:none}.site-gallery{grid-template-columns:1fr;grid-auto-rows:220px}.hero-media,.about-image{margin:20px;min-height:240px}}
  </style>
</head>
<body>${previewHtml.innerHTML}</body>
</html>`;
}

function projectDataJson() {
  return JSON.stringify({
    business: getBusiness(),
    products: lines(fields.products.value),
    services: lines(fields.services.value),
    seo: {
      title: fields.metaTitle.value,
      description: fields.metaDescription.value,
      keywords: fields.seoKeywords.value
    },
    exportedAt: new Date().toISOString()
  }, null, 2);
}

function downloadGeneratedZip() {
  updatePreview();
  const business = getBusiness();
  const slug = business.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "business-website";
  const files = [
    { name: "index.html", content: generatedWebsiteHtml() },
    { name: "project-data.json", content: projectDataJson() },
    { name: "README.txt", content: `${business.name}\n\nOpen index.html in a browser or upload this folder to Netlify.\n\nGenerated by TN Digital Technologies.\nWebsite Designed & Developed by Taha Nihal.\n` }
  ];
  const zip = createZip(files);
  const url = URL.createObjectURL(zip);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${slug}-website.zip`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  $("#deployStatus").textContent = "Deployment Status: ZIP downloaded successfully.";
}

function generateMarketing(format) {
  const b = getBusiness();
  $("#marketingOutput").innerHTML = `<strong>${escapeHtml(format)}:</strong> ${escapeHtml(b.name)} wishes customers a wonderful ${escapeHtml(format)}. Visit us for trusted ${escapeHtml(b.category)}, quick service and WhatsApp support.`;
}

function initEvents() {
  Object.values(fields).filter(Boolean).forEach((field) => {
    field.addEventListener("input", updatePreview);
    field.addEventListener("change", updatePreview);
  });
  $("#logoUpload").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;
    state.logoUrl = URL.createObjectURL(file);
    analyzeImages();
    updatePreview();
  });
  $("#photoUpload").addEventListener("change", (event) => {
    state.photoFiles = Array.from(event.target.files);
    state.photoUrls = state.photoFiles.map((file) => URL.createObjectURL(file));
    analyzeImages();
    updatePreview();
  });
  $("#videoUpload").addEventListener("change", (event) => { state.videos = Array.from(event.target.files).map((file) => file.name); });
  $("#catalogueUpload").addEventListener("change", (event) => { state.catalogue = event.target.files[0]?.name || ""; });
  $("#productImageUpload").addEventListener("change", (event) => { state.productImages = Array.from(event.target.files).map((file) => URL.createObjectURL(file)); });
  $("#suggestButton").addEventListener("click", generateSuggestion);
  $("#copyButton").addEventListener("click", writeCopy);
  $("#chatFillButton").addEventListener("click", fillFromChat);
  $("#analyzeButton").addEventListener("click", analyzeImages);
  $("#advisorButton").addEventListener("click", advisor);
  $("#generateButton").addEventListener("click", updatePreview);
  $("#resetButton").addEventListener("click", resetApp);
  $("#themeModeButton").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    $("#themeModeButton").textContent = document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
  });
  $("#premiumModeButton").addEventListener("click", () => {
    state.premiumMode = !state.premiumMode;
    updatePreview();
  });
  fields.themeSelector.addEventListener("change", () => {
    applyTheme();
    updatePreview();
  });
  $("#applyThemeButton").addEventListener("click", () => {
    applyTheme();
    updatePreview();
  });
  $("#deployButton").addEventListener("click", prepareDeploy);
  $("#downloadZipButton").addEventListener("click", downloadGeneratedZip);
  $("#addProductButton").addEventListener("click", () => {
    state.products.push({ name: "New premium product", category: "Featured", description: "Add product details, image and availability.", price: "Custom", availability: "Available" });
    renderManagers();
    updatePreview();
  });
  $("#addServiceButton").addEventListener("click", () => {
    state.services.push({ name: "New premium service", icon: "Service", description: "Add a service description and image." });
    renderManagers();
    updatePreview();
  });
  $$(".ai-action-grid button").forEach((button) => button.addEventListener("click", () => runAiAction(button.dataset.ai)));
  $$("#wizardSteps button").forEach((button) => button.addEventListener("click", () => setStep(Number(button.dataset.step))));
  $("#prevStepButton").addEventListener("click", () => setStep(state.activeStep - 1));
  $("#nextStepButton").addEventListener("click", () => setStep(state.activeStep + 1));
  $$(".chip-grid button").forEach((button) => button.addEventListener("click", () => generateMarketing(button.dataset.poster)));
  $$(".quick-actions button").forEach((button) => button.addEventListener("click", () => {
    document.querySelector(button.dataset.jump)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }));
  $$(".template-grid button").forEach((button) => button.addEventListener("click", () => {
    fields.themeSelector.value = button.dataset.template;
    $("#designerCommand").value = `Make it ${button.dataset.template}`;
    applyTheme();
    updatePreview();
  }));
}

function initCrm() {
  const rows = [
    ["Amaan", "+91 90000 10001", "Follow-up", "Asked for bulk pricing"],
    ["Sara", "+91 90000 10002", "New", "Needs catalogue"],
    ["Imran", "+91 90000 10003", "Won", "WhatsApp order placed"]
  ];
  $("#crmTable").innerHTML = rows.map(([name, phone, status, notes]) => `
    <div class="crm-row"><span>${escapeHtml(name)}<br><small>${escapeHtml(phone)}</small></span><strong>${escapeHtml(status)}</strong><small>${escapeHtml(notes)}</small></div>
  `).join("");
}

renderManagers();
initCrm();
initEvents();
advisor();
calculateHealth();
updatePreview();
