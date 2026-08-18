// Custom Indian Comma Grouping Algorithm (Lac and Crore)
function addCommasPradip(num) {
  var x = Math.round(num).toString();
  var lastThree = x.substring(x.length - 3);
  var otherBits = x.substring(0, x.length - 3);
  if (otherBits != '') {
    lastThree = ',' + lastThree;
  }
  var res = otherBits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  return res;
}

// Mobile navigation drawer toggle (Specification Animation morph)
function toggleMNavSpec() {
  const burger = document.querySelector('.hamburger-spec');
  const mobileNav = document.getElementById('mobileNav');
  if (burger && mobileNav) {
    burger.classList.toggle('active');
    mobileNav.classList.toggle('open');
  }
}

function openMNav() {
  document.getElementById('mobileNav').classList.add('open');
}

function closeMNav() {
  document.getElementById('mobileNav').classList.remove('open');
  const burger = document.querySelector('.hamburger-spec');
  if (burger) burger.classList.remove('active');
}

// ── WHATSAPP FORM SUBMISSIONS ─────────────────────────────
const WA_NUMBER = '919839324536';

function sendToWhatsApp(message) {
  const encoded = encodeURIComponent(message);
  window.open('https://wa.me/' + WA_NUMBER + '?text=' + encoded, '_blank');
  const toast = document.getElementById('toast');
  if (toast) {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }
}

// 1. Get Free Consultation (index.html)
function submitLead() {
  const name    = document.getElementById('lead-name')    ? document.getElementById('lead-name').value    : '';
  const phone   = document.getElementById('lead-phone')   ? document.getElementById('lead-phone').value   : '';
  const city    = document.getElementById('lead-city')    ? document.getElementById('lead-city').value    : '';
  const amount  = document.getElementById('lead-amount')  ? document.getElementById('lead-amount').value  : '';
  const emptype = document.getElementById('lead-emptype') ? document.getElementById('lead-emptype').value : '';
  if (!name || !phone) { alert('Please fill Name and Mobile Number.'); return; }
  const msg =
    '🏠 *New Consultation Request — VASATIKA*\n' +
    '👤 Name: ' + name + '\n' +
    '📞 Phone: ' + phone + '\n' +
    '🏙️ City: ' + (city || 'Not specified') + '\n' +
    '💰 Loan Amount: ₹' + (amount || 'Not specified') + '\n' +
    '💼 Employment: ' + (emptype || 'Not specified') + '\n' +
    '📅 Source: Free Consultation Form';
  sendToWhatsApp(msg);
}

// 2. Loan Application Form (apply.html)
function submitApplication() {
  const name    = document.getElementById('app-name')    ? document.getElementById('app-name').value    : '';
  const phone   = document.getElementById('app-phone')   ? document.getElementById('app-phone').value   : '';
  const email   = document.getElementById('app-email')   ? document.getElementById('app-email').value   : '';
  const city    = document.getElementById('app-city')    ? document.getElementById('app-city').value    : '';
  const ltype   = document.getElementById('app-ltype')   ? document.getElementById('app-ltype').value   : '';
  const amount  = document.getElementById('app-amount')  ? document.getElementById('app-amount').value  : '';
  const emptype = document.getElementById('app-emptype') ? document.getElementById('app-emptype').value : '';
  const income  = document.getElementById('app-income')  ? document.getElementById('app-income').value  : '';
  const emis    = document.getElementById('app-emis')    ? document.getElementById('app-emis').value    : '';
  const bank    = document.getElementById('app-bank')    ? document.getElementById('app-bank').value    : '';
  const message = document.getElementById('app-message') ? document.getElementById('app-message').value : '';
  if (!name || !phone) { alert('Please fill Name and Mobile Number.'); return; }
  const msg =
    '📋 *New Loan Application — VASATIKA*\n' +
    '👤 Name: ' + name + '\n' +
    '📞 Phone: ' + phone + '\n' +
    '📧 Email: ' + (email || 'Not provided') + '\n' +
    '🏙️ City: ' + (city || 'Not specified') + '\n' +
    '🏠 Loan Type: ' + ltype + '\n' +
    '💰 Loan Amount: ' + amount + '\n' +
    '💼 Employment: ' + emptype + '\n' +
    '💵 Monthly Income: ₹' + (income || 'Not specified') + '\n' +
    '📊 Existing EMIs: ' + emis + '\n' +
    '🏦 Preferred Bank: ' + bank + '\n' +
    '💬 Message: ' + (message || 'None') + '\n' +
    '📅 Source: Loan Application Form';
  sendToWhatsApp(msg);
}

// 3. Eligibility Checker (eligibility.html)
function submitEligibility() {
  const emptype  = document.getElementById('emp-type')         ? document.getElementById('emp-type').value         : '';
  const income   = document.getElementById('monthly-income')   ? document.getElementById('monthly-income').value   : '';
  const emis     = document.getElementById('other-emis')       ? document.getElementById('other-emis').value       : '';
  const cibil    = document.getElementById('cibil')            ? document.getElementById('cibil').value            : '';
  const eligible = document.getElementById('elig-amount-val')  ? document.getElementById('elig-amount-val').textContent : '';
  const emi      = document.getElementById('elig-emi')         ? document.getElementById('elig-emi').textContent        : '';
  const msg =
    '📊 *Eligibility Check Result — VASATIKA*\n' +
    '💼 Employment: ' + emptype + '\n' +
    '💵 Monthly Income: ₹' + income + '\n' +
    '📊 Other EMIs: ₹' + (emis || '0') + '\n' +
    '⭐ CIBIL Score: ' + cibil + '\n' +
    '✅ Eligible Loan: ₹' + eligible + '\n' +
    '💳 Max EMI: ' + emi + '\n' +
    '📅 Source: Eligibility Calculator\n' +
    '\n_Please call me to proceed with application._';
  sendToWhatsApp(msg);
}


// Calculator Tab Switcher
function switchHomeTab(tab) {
  const emiTab = document.getElementById('home-calc-emi');
  const eligTab = document.getElementById('home-calc-elig');
  const emiBtn = document.getElementById('tab-emi-btn');
  const eligBtn = document.getElementById('tab-elig-btn');

  if (tab === 'emi') {
    if (emiTab) emiTab.style.display = 'block';
    if (eligTab) eligTab.style.display = 'none';
    if (emiBtn) emiBtn.classList.add('active');
    if (eligBtn) eligBtn.classList.remove('active');
    // Re-render chart on tab expose
    setTimeout(calcHomeEmi, 50);
  } else {
    if (emiTab) emiTab.style.display = 'none';
    if (eligTab) eligTab.style.display = 'block';
    if (emiBtn) emiBtn.classList.remove('active');
    if (eligBtn) eligBtn.classList.add('active');
    setTimeout(calcHomeElig, 50);
  }
}

// Global Chart Instance Holder
let emiChart = null;

// Home Loan EMI Calculator Math & ApexCharts
function calcHomeEmi() {
  // Sync sliders and inputs
  const loanVal = document.getElementById('h-loan-val');
  const loanRange = document.getElementById('h-loan-range');
  const rateVal = document.getElementById('h-rate-val');
  const rateRange = document.getElementById('h-rate-range');
  const tenureVal = document.getElementById('h-tenure-val');
  const tenureRange = document.getElementById('h-tenure-range');

  // Parse values
  const P = parseFloat(loanVal.value) || 0;
  const annualRate = parseFloat(rateVal.value) || 0;
  const years = parseFloat(tenureVal.value) || 0;

  // Sync ranges
  if (document.activeElement === loanVal) loanRange.value = P;
  else if (document.activeElement === loanRange) loanVal.value = loanRange.value;

  if (document.activeElement === rateVal) rateRange.value = annualRate;
  else if (document.activeElement === rateRange) rateVal.value = rateRange.value;

  if (document.activeElement === tenureVal) tenureRange.value = years;
  else if (document.activeElement === tenureRange) tenureVal.value = tenureRange.value;

  const P_final = parseFloat(loanVal.value) || 3000000;
  const r_final = (parseFloat(rateVal.value) || 9.55) / 12 / 100;
  const n_final = (parseFloat(tenureVal.value) || 20) * 12;

  let emi = 0;
  if (r_final > 0 && n_final > 0) {
    emi = P_final * r_final * Math.pow(1 + r_final, n_final) / (Math.pow(1 + r_final, n_final) - 1);
  }

  const totalPayment = emi * n_final;
  const totalInterest = Math.max(0, totalPayment - P_final);

  // Update Result text using Custom formatting
  document.getElementById('h-emi-result').textContent = '₹' + addCommasPradip(emi);

  // Render Apex Donut Chart
  const options = {
    series: [P_final, Math.round(totalInterest)],
    chart: { type: 'donut', height: 240 },
    labels: ['Principal Loan Amount', 'Total Interest Payable'],
    colors: ['#00A6A6', '#D4A017'],
    dataLabels: { enabled: false },
    legend: { show: false },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Paid',
              formatter: () => '₹' + addCommasPradip(totalPayment)
            }
          }
        }
      }
    }
  };

  if (emiChart) {
    emiChart.updateOptions(options);
  } else {
    const chartEl = document.getElementById('emi-chart');
    if (chartEl) {
      emiChart = new ApexCharts(chartEl, options);
      emiChart.render();
    }
  }

  // Populate year-grouped Amortization Table
  generateAmortizationTable(P_final, parseFloat(rateVal.value) || 9.55, parseFloat(tenureVal.value) || 20, emi);
}

// Populate Amortization Table
function generateAmortizationTable(principal, annualRate, years, emi) {
  const tbody = document.getElementById('amort-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  let balance = principal;
  const r = annualRate / 12 / 100;
  let totalInterestYear = 0;
  let totalPrincipalYear = 0;

  for (let month = 1; month <= years * 12; month++) {
    const interest = balance * r;
    const principalPaid = emi - interest;
    balance = Math.max(0, balance - principalPaid);

    totalInterestYear += interest;
    totalPrincipalYear += principalPaid;

    if (month % 12 === 0 || month === years * 12) {
      const yearNum = Math.ceil(month / 12);
      const row = `<tr>
        <td>Year ${yearNum}</td>
        <td>₹${addCommasPradip(totalPrincipalYear)}</td>
        <td>₹${addCommasPradip(totalInterestYear)}</td>
        <td>₹${addCommasPradip(balance)}</td>
      </tr>`;
      tbody.innerHTML += row;
      totalInterestYear = 0;
      totalPrincipalYear = 0;
    }
  }
}

// PDF Export utilizing jsPDF and autoTable
function exportAmortizationPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(10, 37, 64);
  doc.text("VASATIKA", 14, 20);

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(12);
  doc.text("Home Loan Amortization Schedule Report", 14, 28);

  const loanAmt = document.getElementById('h-loan-val').value;
  const rateVal = document.getElementById('h-rate-val').value;
  const tenureVal = document.getElementById('h-tenure-val').value;
  const emiVal = document.getElementById('h-emi-result').textContent;

  doc.text(`Loan Amount: Rs. ${addCommasPradip(loanAmt)}`, 14, 38);
  doc.text(`Interest Rate: ${rateVal}% p.a.`, 14, 44);
  doc.text(`Tenure: ${tenureVal} Years`, 14, 50);
  doc.text(`Calculated Monthly EMI: ${emiVal}`, 14, 56);

  // Generate rows array from table body elements
  const rows = [];
  const tbody = document.getElementById('amort-tbody');
  if (tbody) {
    const trs = tbody.querySelectorAll('tr');
    trs.forEach(tr => {
      const tds = tr.querySelectorAll('td');
      if (tds.length === 4) {
        rows.push([tds[0].textContent, tds[1].textContent, tds[2].textContent, tds[3].textContent]);
      }
    });
  }

  doc.autoTable({
    startY: 64,
    head: [['Year', 'Principal Paid', 'Interest Paid', 'Remaining Balance']],
    body: rows,
    theme: 'grid',
    headStyles: { fillColor: [10, 37, 64] }
  });

  doc.save("VASATIKA-Home-Loan-Schedule.pdf");
}

// Eligibility Calculator Math
function calcHomeElig() {
  const income = parseFloat(document.getElementById('he-income').value) || 0;
  const obligations = parseFloat(document.getElementById('he-obligations').value) || 0;
  const tenureYears = parseFloat(document.getElementById('he-tenure').value) || 20;

  const maxEmi = Math.max(0, (income * 0.45) - obligations);
  const r = 9.55 / 12 / 100;
  const n = tenureYears * 12;

  let eligibleLoan = 0;
  if (r > 0 && n > 0) {
    eligibleLoan = maxEmi * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
  }

  document.getElementById('he-capacity').textContent = '₹' + addCommasPradip(eligibleLoan);
}

// Newsletter Popups
function showSubPopup() {
  const overlay = document.getElementById('subOverlay');
  const popup = document.getElementById('subPopup');
  if (overlay && popup) {
    overlay.classList.add('active');
    popup.classList.add('active');
  }
}

function hideSubPopup() {
  const overlay = document.getElementById('subOverlay');
  const popup = document.getElementById('subPopup');
  if (overlay && popup) {
    overlay.classList.remove('active');
    popup.classList.remove('active');
  }
}

// Scroll Triggered Back-to-Top Button
window.addEventListener('scroll', () => {
  const btn = document.getElementById('backToTopBtn');
  if (btn) {
    if (window.scrollY > 300) {
      btn.style.display = 'flex';
    } else {
      btn.style.display = 'none';
    }
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Floating Chatbot Widget Toggles
function toggleChatbot() {
  const widget = document.getElementById('chatbotWidget');
  if (widget) {
    widget.style.display = widget.style.display === 'flex' ? 'none' : 'flex';
  }
}

function sendChatbotMsg() {
  const input = document.getElementById('chatbotInput');
  const body = document.getElementById('chatbotBody');
  if (!input || !body || !input.value.trim()) return;

  const userMsg = input.value.trim();
  body.innerHTML += `<div class="p-2 mb-2 bg-white rounded border text-end" style="font-size:12px;margin-left:20px;">${userMsg}</div>`;
  input.value = '';
  body.scrollTop = body.scrollHeight;

  // Mock reply after interval
  setTimeout(() => {
    let msgLower = userMsg.toLowerCase();
    let reply = "I am Vasu, your VASATIKA assistant. I can help you with eligibility, document checklists, comparing bank rates, or setting up a callback. How can I help you today?";
    
    if (msgLower.includes('emi') || msgLower.includes('calculator') || msgLower.includes('calculate')) {
      reply = "To calculate your exact EMI, use our interactive <strong>EMI Calculator</strong> tab on the homepage. For example, a loan of ₹30 Lakh at 8.55% for 20 years results in an EMI of ₹26,108/month.";
    } else if (msgLower.includes('eligibility') || msgLower.includes('eligible') || msgLower.includes('capacity') || msgLower.includes('how much')) {
      reply = "Generally, your home loan capacity is based on your monthly net income and existing EMIs. If you earn ₹50,000/month with zero other liabilities, you can get a loan of approx ₹24.10 Lakhs. Would you like me to connect you with an advisor?";
    } else if (msgLower.includes('document') || msgLower.includes('paper') || msgLower.includes('proof') || msgLower.includes('kyc')) {
      reply = "For salaried professionals: PAN, Aadhaar, 3 months salary slips, Form 16, and 6 months bank statements. For self-employed: 2-3 years of ITR, balance sheets, and bank statements. We also have specialized schemes for informal income earners!";
    } else if (msgLower.includes('compare') || msgLower.includes('rate') || msgLower.includes('bank') || msgLower.includes('sbi') || msgLower.includes('hdfc')) {
      reply = "Currently, SBI Home Loans start at 8.35% p.a., HDFC starts at 8.40% p.a., and LIC Housing starts at 8.40% p.a. We help you compare and select the best fit according to your credit profile.";
    } else if (msgLower.includes('apply') || msgLower.includes('consult') || msgLower.includes('call')) {
      reply = "You can quickly apply by filling out the consultation form on our website or by sending 'Hi' to our WhatsApp CTA. One of our specialists will call you back within 30 minutes!";
    }
    
    body.innerHTML += `<div class="p-2 mb-2 bg-light rounded" style="font-size:12px;margin-right:20px;">${reply}</div>`;
    body.scrollTop = body.scrollHeight;
  }, 1000);
}

function handleChatbotKey(event) {
  if (event.key === 'Enter') {
    sendChatbotMsg();
  }
}

// Lightweight Counter Count-up helper
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target')) || 0;
  let current = 0;
  const duration = 2000;
  const stepTime = Math.max(Math.floor(duration / (target || 1)), 15);
  const increment = Math.ceil(target / (duration / stepTime));
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    
    if (target === 500) {
      el.textContent = current + '+';
    } else if (target === 120) {
      el.textContent = '₹' + current + 'Cr+';
    } else if (target === 9) {
      el.textContent = current + '+';
    } else if (target === 98) {
      el.textContent = current + '%';
    } else {
      el.textContent = current;
    }
  }, stepTime);
}

// Owl Carousel initialization on page load
$(document).ready(function() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Intersection Observers for Animations & Motion
  if ('IntersectionObserver' in window) {
    // Scroll Reveal Observer
    const scrollRevealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => {
      scrollRevealObserver.observe(el);
    });

    // Stats Section Counter Observer
    let statsAnimated = false;
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          document.querySelectorAll('.stat-num').forEach(el => {
            animateCounter(el);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      statsObserver.observe(statsSection);
    }

    // Journey Timeline Observer
    const timelineObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    const timelineEl = document.getElementById('timelineElement');
    if (timelineEl) {
      timelineObserver.observe(timelineEl);
    }
  } else {
    // Fallback if IntersectionObserver is not supported
    document.querySelectorAll('.scroll-reveal').forEach(el => el.classList.add('revealed'));
    const timelineEl = document.getElementById('timelineElement');
    if (timelineEl) timelineEl.classList.add('revealed');
    document.querySelectorAll('.stat-num').forEach(el => {
      const target = el.getAttribute('data-target');
      if (target === '500') el.textContent = '500+';
      else if (target === '120') el.textContent = '₹120Cr+';
      else if (target === '9') el.textContent = '9+';
      else if (target === '98') el.textContent = '98%';
    });
  }

  // Testimonial owl initialization
  if (typeof $.fn.owlCarousel !== 'undefined') {
    $('.testimonial-carousel').owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      navText: ["<i data-lucide='arrow-left'></i>", "<i data-lucide='arrow-right'></i>"],
      responsive: {
        0: { items: 1 },
        768: { items: 2 },
        1024: { items: 3 }
      },
      onInitialized: function() {
        if (typeof lucide !== 'undefined') { lucide.createIcons(); }
      }
    });

    // Media Carousel initialization
    $('.media-carousel').owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      navText: ["<i data-lucide='arrow-left'></i>", "<i data-lucide='arrow-right'></i>"],
      responsive: {
        0: { items: 1 },
        768: { items: 2 },
        1024: { items: 3 }
      },
      onInitialized: function() {
        if (typeof lucide !== 'undefined') { lucide.createIcons(); }
      }
    });
  }

  // Initial calculation trigger
  if (document.getElementById('h-loan-val')) {
    calcHomeEmi();
  }
  if (document.getElementById('c-amt')) {
    calcEMI2();
  }
});

// Original page-specific script functions from vasatika_complete.html
function calcEMI2(){
  const P=parseFloat(document.getElementById('c-amt').value)||0;
  const r=(parseFloat(document.getElementById('c-rate').value)||0)/12/100;
  const n=(parseFloat(document.getElementById('c-yr').value)||0)*12;
  let emi=0,ti=0;
  if(r>0&&n>0){emi=P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);ti=(emi*n)-P;}
  const f=v=>'₹'+Math.round(v).toLocaleString('en-IN');
  if(document.getElementById('c-emi')) document.getElementById('c-emi').textContent=f(emi);
  if(document.getElementById('c-prin')) document.getElementById('c-prin').textContent=f(P);
  if(document.getElementById('c-int')) document.getElementById('c-int').textContent=f(ti);
}

function goStep(n){
  ['elig-step1','elig-step2','elig-step3'].forEach((id,i)=>{
    const el = document.getElementById(id);
    if (el) el.style.display=i===(n-1)?'block':'none';
  });
  ['step1-tab','step2-tab','step3-tab'].forEach((id,i)=>{
    const el=document.getElementById(id);
    if (el) el.className='elig-step'+(i<n-1?' done':'')+(i===n-1?' active':'');
  });
}

function calcEligibility(){
  const income=parseFloat(document.getElementById('monthly-income').value)||50000;
  const other=parseFloat(document.getElementById('other-emis').value)||0;
  const maxEmi=(income*0.45)-other;
  const r=8.5/12/100,n=240;
  const eligible=maxEmi*(Math.pow(1+r,n)-1)/(r*Math.pow(1+r,n));
  const f=v=>Math.round(v).toLocaleString('en-IN');
  if (document.getElementById('elig-amount-val')) document.getElementById('elig-amount-val').textContent=f(eligible);
  if (document.getElementById('elig-emi')) document.getElementById('elig-emi').textContent='₹'+f(maxEmi);
  goStep(3);
}

function syncRange(inputId,rangeId,val){
  const el = document.getElementById(rangeId);
  if (el) el.value=val;
  if (typeof calcEMI2 === 'function') calcEMI2();
}

function syncInput(rangeId,inputId,val){
  const el = document.getElementById(inputId);
  if (el) el.value=val;
}

function filterTable(cat,btn){
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.querySelectorAll('#fullCompareTable tbody tr').forEach(tr=>{
    if(cat==='all'){tr.style.display='';return;}
    tr.style.display=(tr.dataset.cat||'').split(' ').includes(cat)?'':'none';
  });
}

function toggleFaq(el){
  const item=el.parentElement;
  const wasOpen=item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(f=>f.classList.remove('open'));
  if(!wasOpen)item.classList.add('open');
}

