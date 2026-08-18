(() => {
  const one = (selector, root = document) => root.querySelector(selector);
  const many = (selector, root = document) => [...root.querySelectorAll(selector)];
  const money = (value) => `₹${Math.round(value).toLocaleString("en-IN")}`;

  function setupNavigation() {
    const toggle = one(".menu-toggle");
    const drawer = one(".mobile-drawer");
    const close = one(".drawer-close");
    const openDrawer = () => {
      drawer?.classList.add("open");
      toggle?.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    };
    const closeDrawer = () => {
      drawer?.classList.remove("open");
      toggle?.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };

    toggle?.setAttribute("aria-expanded", "false");
    toggle?.addEventListener("click", openDrawer);
    close?.addEventListener("click", closeDrawer);
    drawer?.addEventListener("click", (event) => {
      if (event.target === drawer) closeDrawer();
    });
    many(".drawer-links a").forEach((link) => link.addEventListener("click", closeDrawer));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeDrawer();
    });

    const currentPage = location.pathname.split("/").pop() || "index.html";
    many(".nav-links a").forEach((link) => {
      const target = (link.getAttribute("href") || "").split("#")[0];
      link.classList.toggle("active", target === currentPage);
    });
  }

  function setupSmoothAnchors() {
    many('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const target = one(link.getAttribute("href"));
        if (!target) return;
        event.preventDefault();
        const offset = document.querySelector(".site-nav")?.offsetHeight || 0;
        const top = target.getBoundingClientRect().top + window.scrollY - offset - 12;
        window.scrollTo({ top, behavior: "smooth" });
        history.replaceState(null, "", link.getAttribute("href"));
      });
    });
  }

  function setupRevealMotion() {
    const items = many(".reveal");
    if (!items.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((item) => item.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.1 }
    );
    items.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index * 40, 240)}ms`;
      observer.observe(item);
    });
  }

  function setupCalculators() {
    const amounts = many('[data-calc="amount"]');
    const rates = many('[data-calc="rate"]');
    const tenures = many('[data-calc="tenure"]');
    const outputs = many("[data-emi]");
    const count = Math.max(amounts.length, rates.length, tenures.length, outputs.length);

    for (let index = 0; index < count; index += 1) {
      const amount = amounts[index] || amounts[0];
      const rate = rates[index] || rates[0];
      const tenure = tenures[index] || tenures[0];
      const output = outputs[index] || outputs[0];
      if (!amount || !rate || !tenure || !output) continue;

      const card = amount.closest(".floating-card, .compare-card, section") || document;
      const ranges = many(".range", card);
      const amountValue = one("b", ranges[0]);
      const rateValue = one("b", ranges[1]);
      const tenureValue = one("b", ranges[2]);

      const update = () => {
        const principal = Number(amount.value);
        const monthlyRate = Number(rate.value) / 1200;
        const months = Number(tenure.value) * 12;
        const emi = monthlyRate === 0
          ? principal / months
          : principal * monthlyRate * Math.pow(1 + monthlyRate, months) /
            (Math.pow(1 + monthlyRate, months) - 1);
        output.textContent = money(emi);
        amount.style.setProperty("--fill", `${((principal - amount.min) / (amount.max - amount.min)) * 100}%`);
        rate.style.setProperty("--fill", `${((Number(rate.value) - rate.min) / (rate.max - rate.min)) * 100}%`);
        tenure.style.setProperty("--fill", `${((Number(tenure.value) - tenure.min) / (tenure.max - tenure.min)) * 100}%`);
        if (amountValue) amountValue.textContent = money(principal);
        if (rateValue) rateValue.textContent = `${Number(rate.value).toFixed(2)}% p.a.`;
        if (tenureValue) tenureValue.textContent = `${tenure.value} years`;
      };

      [amount, rate, tenure].forEach((input) => input.addEventListener("input", update));
      update();
    }
  }

  function setupForms() {
    many(".js-lead-form").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }
        form.innerHTML = `
          <div class="success" role="status" aria-live="polite">
            <div class="point-num">✓</div>
            <strong>Thanks — your note is with the VASATIKA desk.</strong>
            <p class="copy">We’ll come back with one clear next step.</p>
            <a class="button button-dark" href="tel:9839324536" style="margin-top:15px">Call the advisory desk →</a>
          </div>`;
      });
    });
  }

  function setupFaqs() {
    many(".faq-button").forEach((button) => {
      button.setAttribute("aria-expanded", "false");
      button.addEventListener("click", () => {
        const item = button.closest(".faq-item");
        const isOpen = item?.classList.toggle("open") || false;
        button.setAttribute("aria-expanded", String(isOpen));
        const indicator = one("span", button);
        if (indicator) indicator.textContent = isOpen ? "−" : "+";
      });
    });
  }

  function setupButtonFeedback() {
    many(".button, .round-arrow, .product-card a, .article-card a").forEach((button) => {
      button.addEventListener("mousedown", () => button.classList.add("pressed"));
      button.addEventListener("mouseup", () => button.classList.remove("pressed"));
      button.addEventListener("mouseleave", () => button.classList.remove("pressed"));
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupNavigation();
    setupSmoothAnchors();
    setupRevealMotion();
    setupCalculators();
    setupForms();
    setupFaqs();
    setupButtonFeedback();
    window.lucide?.createIcons();
  });
})();
