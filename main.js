(() => {
 const q=(s,r=document)=>r.querySelector(s), qa=(s,r=document)=>[...r.querySelectorAll(s)];
 const money=n=>`₹${Math.round(n).toLocaleString('en-IN')}`;
 function navigation(){const b=q('.menu-button'),d=q('.drawer'),c=q('.drawer-close');b?.addEventListener('click',()=>d?.classList.add('open'));c?.addEventListener('click',()=>d?.classList.remove('open'));qa('.drawer a').forEach(a=>a.addEventListener('click',()=>d?.classList.remove('open')));const current=location.pathname.split('/').pop()||'index.html';qa('.main-links a').forEach(a=>a.classList.toggle('current',a.getAttribute('href')===current));}
 function reveal(){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});qa('.reveal').forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i*35,220)}ms`;io.observe(el)});}
 function calculators(){const a=q('#amount'),r=q('#rate'),t=q('#tenure'),o=q('#emi');if(!a||!r||!t||!o)return;const run=()=>{const P=+a.value,R=+r.value/1200,N=+t.value*12;const e=P*R*Math.pow(1+R,N)/(Math.pow(1+R,N)-1);o.textContent=money(e);[[a],[r],[t]].forEach(([el])=>{const p=(+el.value-+el.min)/(+el.max-+el.min)*100;el.style.setProperty('--progress',`${p}%`)})};[a,r,t].forEach(x=>x.addEventListener('input',run));run();}
 function forms(){qa('form[data-success]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();f.innerHTML=`<div class="success-message"><div class="number-dot">✓</div><strong>${f.dataset.success}</strong></div>`}))}
 function faqs(){qa('.faq-toggle').forEach(b=>b.addEventListener('click',()=>b.closest('.faq-item')?.classList.toggle('open')))}
 function parallax(){const img=q('.hero-home>img');if(!img||matchMedia('(prefers-reduced-motion: reduce)').matches)return;addEventListener('scroll',()=>img.style.transform=`translateY(${Math.min(scrollY*.04,28)}px) scale(1.04)`,{passive:true})}
 addEventListener('DOMContentLoaded',()=>{navigation();reveal();calculators();forms();faqs();parallax();window.lucide?.createIcons()});
})();
