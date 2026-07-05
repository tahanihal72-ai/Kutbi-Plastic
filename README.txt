<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title id="pageTitle">Business Website</title>
  <meta name="description" id="pageDescription" content="Modern local business website" />
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <header class="site-header">
    <a class="brand" href="#home" data-nav="home">
      <span id="brandName">Business</span>
      <small id="brandTagline">Wholesale & Retail</small>
    </a>
    <button class="menu-btn" id="menuBtn" aria-label="Open menu">☰</button>
    <nav class="nav" id="nav">
      <a href="#home" data-nav="home">Home</a>
      <a href="#products" data-nav="products">Products</a>
      <a href="#gallery" data-nav="gallery">Gallery</a>
      <a href="#wholesale" data-nav="wholesale">Wholesale</a>
      <a href="#contact" data-nav="contact">Contact</a>
    </nav>
  </header>

  <main>
    <section id="home" class="hero section active">
      <div class="hero-bg" id="heroBg"></div>
      <div class="hero-content">
        <span class="eyebrow" id="heroTagline"></span>
        <h1 id="heroTitle"></h1>
        <p id="heroDescription"></p>
        <div class="hero-actions">
          <a class="btn primary" href="#products" data-nav="products">View Products</a>
          <a class="btn secondary" id="heroWhatsapp" target="_blank">WhatsApp Enquiry</a>
        </div>
      </div>
    </section>

    <section class="section light" id="featuresSection">
      <div class="container">
        <div class="section-title">
          <span class="eyebrow">Why choose us</span>
          <h2>Reliable supply for local businesses</h2>
        </div>
        <div class="cards" id="featuresGrid"></div>
      </div>
    </section>

    <section class="section" id="aboutSection">
      <div class="container split">
        <div>
          <span class="eyebrow">About</span>
          <h2 id="aboutTitle"></h2>
          <p id="aboutText"></p>
          <ul class="check-list" id="servicesList"></ul>
        </div>
        <img class="about-img" id="aboutImg" alt="Business interior" />
      </div>
    </section>

    <section id="products" class="section page-section">
      <div class="container">
        <div class="section-title center">
          <span class="eyebrow">Products</span>
          <h2>Product catalogue</h2>
          <p>Search products and send enquiry directly on WhatsApp.</p>
        </div>
        <div class="toolbar">
          <input id="searchInput" type="search" placeholder="Search products..." />
          <select id="categoryFilter">
            <option value="all">All Categories</option>
          </select>
        </div>
        <div class="product-grid" id="productGrid"></div>
      </div>
    </section>

    <section id="gallery" class="section light page-section">
      <div class="container">
        <div class="section-title center">
          <span class="eyebrow">Gallery</span>
          <h2>Shop and stock photos</h2>
        </div>
        <div class="gallery" id="galleryGrid"></div>
      </div>
    </section>

    <section id="wholesale" class="section page-section">
      <div class="container split">
        <div>
          <span class="eyebrow">Wholesale</span>
          <h2>Bulk supply enquiry</h2>
          <p id="policyText"></p>
          <div class="notice">Best for kirana stores, local retailers and regular bulk buyers.</div>
        </div>
        <form class="form-card" id="wholesaleForm">
          <h3>Send Wholesale Request</h3>
          <input name="name" required placeholder="Your name / shop name" />
          <input name="phone" required placeholder="Mobile number" />
          <select name="category" required id="formCategory"></select>
          <textarea name="message" rows="4" required placeholder="Write item name, quantity and requirement"></textarea>
          <button class="btn primary" type="submit">Send on WhatsApp</button>
        </form>
      </div>
    </section>

    <section id="contact" class="section dark page-section">
      <div class="container contact-grid">
        <div>
          <span class="eyebrow">Contact</span>
          <h2 id="contactName"></h2>
          <p id="contactAddress"></p>
          <p id="contactHours"></p>
          <div class="contact-actions">
            <a class="btn primary" id="callBtn">Call Now</a>
            <a class="btn secondary" id="whatsappBtn" target="_blank">WhatsApp</a>
          </div>
        </div>
        <iframe id="mapFrame" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </section>
  </main>

  <footer class="footer">
    <p id="footerText"></p>
  </footer>

  <a class="float-whatsapp" id="floatWhatsapp" target="_blank" aria-label="WhatsApp">WhatsApp</a>

  <script src="config.js"></script>
  <script src="app.js"></script>
</body>
</html>
