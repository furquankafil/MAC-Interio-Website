/* MAC INTERIO — Little Star · Shared interactions */
(function(){
  "use strict";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header state + active nav ---------- */
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if(!header) return;
    header.classList.toggle("scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, {passive:true});
  onScroll();

  const page = (document.body.dataset.page || "home").toLowerCase();
  document.querySelectorAll("[data-nav]").forEach(a => {
    if(a.dataset.nav === page) a.classList.add("active");
  });

  /* ---------- Mobile menu ---------- */
  const burger = document.querySelector(".hamburger");
  const mmenu = document.querySelector(".mobile-menu");
  const setMenu = (open) => {
    if(!mmenu || !burger) return;
    mmenu.classList.toggle("open", open);
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("menu-open", open);
    if(open && !reduceMotion){
      mmenu.querySelectorAll("a.m-link").forEach((l,i) => {
        l.style.transitionDelay = (0.08 + i*0.06) + "s";
      });
    }
  };
  if(burger && mmenu){
    burger.addEventListener("click", () => setMenu(!mmenu.classList.contains("open")));
    mmenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", e => { if(e.key === "Escape") setMenu(false); });
  }

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, {threshold: 0.12, rootMargin: "0px 0px -6% 0px"});
  document.querySelectorAll(".reveal, .img-reveal").forEach(el => io.observe(el));

  /* ---------- Toast ---------- */
  let toastTimer;
  window.showToast = function(msg){
    let t = document.querySelector(".toast");
    if(!t){
      t = document.createElement("div");
      t.className = "toast"; t.setAttribute("role","status");
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 4200);
  };

  /* ---------- Product card rendering ---------- */
  const WA_SVG = '<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 3C9.4 3 4 8.4 4 15c0 2.4.7 4.6 2 6.5L4 29l7.7-2c1.8 1 3.9 1.5 6 1.5h.3c6.6 0 12-5.4 12-12S22.6 3 16 3zm0 22.2c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-4.6 1.2 1.2-4.4-.3-.4c-1.1-1.7-1.7-3.6-1.7-5.6C4.9 9.4 10 4.6 16 4.6S27.1 9.7 27.1 15.5 22.2 25.2 16 25.2zm5.9-7.5c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.2-.2.3-.8 1.1-1 1.3-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-.9-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5L14.2 9c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.2-.8.5-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5 0-.2-.3-.2-.6-.4z"/></svg>';

  function cardHTML(p){
    const flags = p.cat === "dining" ? '<span class="card-flag gold">Signature</span>'
      : p.catLabel.toLowerCase().includes("showroom") ? '<span class="card-flag">Showroom</span>' : "";
    return `
    <article class="card reveal" data-cat="${p.cat}">
      <div class="card-media">
        <img src="./${p.img}" alt="${p.alt}" loading="lazy" width="800" height="680">
        ${flags}
      </div>
      <div class="card-body">
        <p class="card-cat">${p.catLabel}</p>
        <h3 class="card-name">${p.name}</h3>
        <p class="card-desc">${p.desc}</p>
        <div class="card-tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
        <div class="card-foot">
          <button class="link-more" data-view="${p.id}">View Details →</button>
          <a class="btn btn-sm btn-wa" data-wa="${p.id}" href="${waProductURL(p)}" target="_blank" rel="noopener">${WA_SVG} Enquire</a>
        </div>
      </div>
    </article>`;
  }

  document.querySelectorAll("[data-product-grid]").forEach(grid => {
    const filter = (grid.dataset.productGrid || "all").toLowerCase();
    const ids = (grid.dataset.ids || "").split(",").map(s => s.trim()).filter(Boolean);
    let list = PRODUCTS.slice();
    if(ids.length) list = ids.map(productById).filter(Boolean);
    else if(filter !== "all") list = list.filter(p => p.cat === filter);
    grid.innerHTML = list.map(cardHTML).join("");
    grid.querySelectorAll(".reveal").forEach(el => io.observe(el));
  });

  /* ---------- Product modal ---------- */
  const modal = document.getElementById("product-modal");
  function openProduct(id){
    const p = productById(id);
    if(!p || !modal) return;
    modal.querySelector(".modal-media").innerHTML =
      `<img src="./${p.img}" alt="${p.alt}">`;
    modal.querySelector(".modal-body").innerHTML = `
      <p class="eyebrow">${p.catLabel}</p>
      <h3>${p.name}</h3>
      <p style="color:var(--muted);font-size:15px">${p.desc}</p>
      <dl class="modal-spec">
        <dt>Material</dt><dd>${p.material}</dd>
        <dt>Style</dt><dd>${p.style}</dd>
        <dt>Configuration</dt><dd>${p.seats}</dd>
        <dt>Customization</dt><dd><strong>100% Customizable</strong> — size, shape, stone, wood, metal, finish, base, colour &amp; seating.</dd>
        <dt>Pricing</dt><dd><strong>Price on Request</strong> — enquire for manufacturer pricing.</dd>
      </dl>
      <div class="btn-row" style="margin-top:6px">
        <a class="btn btn-wa" href="${waProductURL(p)}" target="_blank" rel="noopener" data-wa-modal="${p.id}">${WA_SVG} Enquire on WhatsApp</a>
      </div>
      <p class="modal-note">Your enquiry opens WhatsApp with the product name, category and image reference (<strong>${p.img}</strong>) already written — just press send, and attach the product photo in the chat so our team can confirm the exact piece.</p>`;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal-close").focus();
  }
  function closeProduct(){
    if(!modal) return;
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
  document.addEventListener("click", e => {
    const v = e.target.closest("[data-view]");
    if(v){ openProduct(v.dataset.view); return; }
    if(e.target.closest(".modal-veil") || e.target.closest(".modal-close")) closeProduct();
    const w = e.target.closest("[data-wa], [data-wa-modal]");
    if(w){
      const id = w.dataset.wa || w.dataset.waModal;
      const p = productById(id);
      showToast(p ? `Opening WhatsApp for “${p.name}” — press send, then attach the product photo in chat.` : "Opening WhatsApp — press send to start your enquiry.");
    }
    const c = e.target.closest("[data-custom-wa]");
    if(c) showToast("Opening WhatsApp — describe your size, material and finish in the chat.");
  });
  document.addEventListener("keydown", e => { if(e.key === "Escape") closeProduct(); });

  /* ---------- Gallery lightbox ---------- */
  const lb = document.getElementById("lightbox");
  let lbItems = [], lbIndex = 0;
  function lbShow(i){
    if(!lb || !lbItems.length) return;
    lbIndex = (i + lbItems.length) % lbItems.length;
    const it = lbItems[lbIndex];
    lb.querySelector("img").src = it.src;
    lb.querySelector("img").alt = it.alt;
    lb.querySelector(".lightbox-cap").textContent = it.cap;
  }
  function lbOpen(items, i){
    if(!lb) return;
    lbItems = items; lb.classList.add("open");
    document.body.style.overflow = "hidden";
    lbShow(i);
  }
  function lbClose(){
    if(!lb) return;
    lb.classList.remove("open");
    document.body.style.overflow = "";
  }
  document.addEventListener("click", e => {
    const g = e.target.closest("[data-lightbox]");
    if(g){
      const group = g.dataset.lightbox;
      const items = [...document.querySelectorAll(`[data-lightbox="${group}"]`)].map(b => ({
        src: b.dataset.full || b.querySelector("img").src,
        alt: b.querySelector("img").alt || "",
        cap: b.dataset.cap || b.querySelector("img").alt || ""
      }));
      const idx = [...document.querySelectorAll(`[data-lightbox="${group}"]`)].indexOf(g);
      lbOpen(items, idx);
      return;
    }
    if(e.target.closest(".lb-close") || e.target === lb) lbClose();
    if(e.target.closest(".lb-prev")) lbShow(lbIndex - 1);
    if(e.target.closest(".lb-next")) lbShow(lbIndex + 1);
  });
  document.addEventListener("keydown", e => {
    if(!lb || !lb.classList.contains("open")) return;
    if(e.key === "Escape") lbClose();
    if(e.key === "ArrowLeft") lbShow(lbIndex - 1);
    if(e.key === "ArrowRight") lbShow(lbIndex + 1);
  });

  /* ---------- Collection filters ---------- */
  document.querySelectorAll("[data-filter-bar]").forEach(bar => {
    const target = document.querySelector(bar.dataset.filterBar);
    if(!target) return;
    bar.addEventListener("click", e => {
      const btn = e.target.closest("button[data-filter]");
      if(!btn) return;
      bar.querySelectorAll("button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      target.querySelectorAll("[data-cat]").forEach(card => {
        card.style.display = (f === "all" || card.dataset.cat === f) ? "" : "none";
      });
    });
  });

  /* ---------- Contact / callback form → WhatsApp ---------- */
  const form = document.getElementById("callback-form");
  if(form){
    form.addEventListener("submit", e => {
      e.preventDefault();
      const name = form.querySelector("#cf-name").value.trim();
      const phone = form.querySelector("#cf-phone").value.trim();
      const product = form.querySelector("#cf-product").value;
      const msg = form.querySelector("#cf-message").value.trim();
      if(!name || !phone){
        showToast("Please share your name and phone number so we can call you back.");
        return;
      }
      const text =
`Hello MAC INTERIO - Little Star,

I would like to request a callback.

Name: ${name}
Phone: ${phone}
Product interested in: ${product}
Message: ${msg || "—"}`;
      window.open("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text), "_blank", "noopener");
      showToast("Opening WhatsApp with your callback request — press send to confirm.");
      form.reset();
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
})();
