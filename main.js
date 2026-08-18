(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const formatMoney = value => `₹${Math.round(value).toLocaleString('en-IN')}`;

  function mountNavigation() {
    const toggle = $('.menu-toggle'); const drawer = $('.mobile-drawer'); const close = $('.drawer-close');
    if (toggle && drawer) { toggle.addEventListener('click', () => drawer.classList.add('open')); }
    if (close && drawer) { close.addEventListener('click', () => drawer.classList.remove('open')); }
    $$('.mobile-drawer a').forEach(link => link.addEventListener('click', () => drawer?.classList.remove('open')));
    const current = location.pathname.split('/').pop() || 'index.html';
    $$('.nav-links a').forEach(link => { if (link.getAttribute('href') === current) link.classList.add('active'); });
  }

  function mountReveal() {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .12 });
    $$('.reveal').forEach((el, index) => { el.style.transitionDelay = `${Math.min(index * 35, 240)}ms`; observer.observe(el); });
  }

  function mountCalculator() {
    const amount = $('#calcAmount'), rate = $('#calcRate'), tenure = $('#calcTenure'), output = $('#calcOutput');
    if (!amount || !rate || !tenure || !output) return;
    const update = () => { const p = Number(amount.value), r = Number(rate.value) / 1200, n = Number(tenure.value) * 12; const emi = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1); output.textContent = formatMoney(emi); [['calcAmount', amount], ['calcRate', rate], ['calcTenure', tenure]].forEach(([id, el]) => { const min = Number(el.min), max = Number(el.max); el.style.setProperty('--fill', `${((Number(el.value) - min) / (max - min)) * 100}%`); }); };
    [amount, rate, tenure].forEach(el => el.addEventListener('input', update)); update();
  }

  function mountForms() {
    $$('form[data-success]').forEach(form => form.addEventListener('submit', event => { event.preventDefault(); const success = form.dataset.success || 'Thank you. We will be in touch with a clear next step.'; form.innerHTML = `<div class="success"><div class="dot">✓</div><strong>${success}</strong></div>`; }));
  }

  function mountAccordions() { $$('.accordion-trigger').forEach(trigger => trigger.addEventListener('click', () => { const item = trigger.closest('.accordion-item'); item?.classList.toggle('open'); })); }
  function mountParallax() { const hero = $('.hero-media'); if (!hero || matchMedia('(prefers-reduced-motion: reduce)').matches) return; window.addEventListener('scroll', () => { hero.style.transform = `translateY(${Math.min(window.scrollY * .045, 26)}px) scale(1.03)`; }, { passive: true }); }
  document.addEventListener('DOMContentLoaded', () => { mountNavigation(); mountReveal(); mountCalculator(); mountForms(); mountAccordions(); mountParallax(); if (window.lucide) window.lucide.createIcons(); });
})();
