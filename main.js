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


  function setupPlanner() {
    const planner = one("[data-planner]");
    if (!planner) return;
    const steps = many("[data-planner-step]", planner);
    const progress = one("[data-planner-progress]", planner);
    const result = one("[data-planner-result]", planner);
    let current = 0;
    let intention = "home";
    let pace = "ready";
    const messages = {
      home: { ready: "You are ready for a focused home-loan shortlist. Bring your preferred budget and we’ll compare the route.", research: "Start with the EMI calculator and lender comparison, then bring the shortlist to the advisory desk.", documents: "Gather identity and income proof first; property details can follow once the route is clearer." },
      build: { ready: "A construction-loan conversation should begin with plot ownership, plan approval, and stage-wise funding.", research: "Start with the construction-loan guide and a realistic stage budget before comparing lenders.", documents: "Plot papers, approved plan, and construction estimate are the most useful first documents." },
      switch: { ready: "Bring your current loan statement and repayment history so we can test whether a transfer improves the full picture.", research: "Compare current rate, remaining tenure, and transfer costs before making a switch.", documents: "Start with the existing sanction letter, latest statement, and repayment track." }
    };
    const show = (index) => { current = index; steps.forEach((step, i) => step.classList.toggle("active", i === index)); if (progress) progress.style.width = `${((index + 1) / steps.length) * 100}%`; };
    many("[data-planner-choice]", planner).forEach((choice) => choice.addEventListener("click", () => { const value = choice.dataset.plannerChoice; if (["home","build","switch"].includes(value)) intention = value; else pace = value; many("[data-planner-choice]", planner).forEach((item) => item.classList.remove("selected")); choice.classList.add("selected"); if (current === 0 || current === 1) { show(current + 1); if (current === 2 && result) result.textContent = messages[intention][pace]; } }));
    one("[data-planner-back]", planner)?.addEventListener("click", () => show(Math.max(0, current - 1)));
    one("[data-planner-reset]", planner)?.addEventListener("click", () => { intention = "home"; pace = "ready"; many("[data-planner-choice]", planner).forEach((item) => item.classList.remove("selected")); if (result) result.textContent = ""; show(0); });
    show(0);
    const originalChoiceHandler = many("[data-planner-choice]", planner);
    originalChoiceHandler.forEach((choice) => choice.addEventListener("click", () => { if (current === 2 && result) result.textContent = messages[intention][pace]; }));
  }

  function setupChecklist() {
    const checks = many("[data-check]");
    if (!checks.length) return;
    const progress = one("[data-check-progress]");
    const label = one("[data-check-label]");
    const update = () => { const complete = checks.filter((check) => check.checked).length; if (progress) progress.style.width = `${(complete / checks.length) * 100}%`; if (label) label.textContent = `${complete} of ${checks.length} ready`; };
    checks.forEach((check) => check.addEventListener("change", update));
    one("[data-check-reset]")?.addEventListener("click", () => { checks.forEach((check) => { check.checked = false; }); update(); });
    update();
  }

  function setupCompareFilters() {
    const search = one("[data-lender-filter]");
    const rate = one("[data-rate-filter]");
    const rows = many("[data-compare-table] tr[data-lender]");
    if (!rows.length) return;
    const filter = () => { const query = (search?.value || "").toLowerCase().trim(); const max = rate?.value === "all" ? Infinity : Number(rate.value); rows.forEach((row) => { row.hidden = !(row.dataset.lender.includes(query) && Number(row.dataset.rate) <= max); }); };
    search?.addEventListener("input", filter); rate?.addEventListener("change", filter); filter();
  }

  function setupResourceSearch() {
    const search = one("[data-resource-search]");
    const cards = many(".article-card");
    const count = one("[data-resource-count]");
    if (!search || !cards.length) return;
    const filter = () => { const query = search.value.toLowerCase().trim(); let visible = 0; cards.forEach((card) => { const match = card.textContent.toLowerCase().includes(query); card.classList.toggle("is-hidden", !match); if (match) visible += 1; }); if (count) count.textContent = `${visible} guide${visible === 1 ? "" : "s"} available`; };
    search.addEventListener("input", filter); filter();
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupNavigation();
    setupSmoothAnchors();
    setupRevealMotion();
    setupCalculators();
    setupForms();
    setupFaqs();
    setupButtonFeedback();
    setupPlanner();
    setupChecklist();
    setupCompareFilters();
    setupResourceSearch();
    window.lucide?.createIcons();
  });
})();
