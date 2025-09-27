/* Mobile menu */
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('menu');

toggle?.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open');
  
});

menu?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    if (window.innerWidth <= 880) {
      nav.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

/* Active link on scroll */
const sections = ['skills','experience','projects','education','contact']
  .map(id => document.getElementById(id))
  .filter(Boolean);

const links = [...document.querySelectorAll('.menu .nav-link')];
const mapLink = new Map(links.map(l => [l.getAttribute('href').replace('#',''), l]));

const spy = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      const id = en.target.id;
      links.forEach(l => l.classList.remove('active'));
      mapLink.get(id)?.classList.add('active');
    }
  });
}, { threshold: 0.55 });

sections.forEach(s => spy.observe(s));

/* Typing effect */
const roles = ['UI Developer','Frontend Engineer','React.js Specialist','Performance Optimizer'];
const typeTarget = document.getElementById('type-target');
let i = 0, j = 0, del = false;

function typeTick(){
  const word = roles[i];
  if (!del) {
    j++;
    if (j === word.length + 1) { del = true; setTimeout(typeTick, 900); return; }
  } else {
    j--;
    if (j === 0) { del = false; i = (i + 1) % roles.length; }
  }
  if (typeTarget) typeTarget.textContent = word.slice(0, j);
  setTimeout(typeTick, del ? 45 : 70);
}
if (typeTarget) typeTick();

/* Scroll reveal */
const revealTargets = [
  ...document.querySelectorAll('.panel'),
  ...document.querySelectorAll('.xp-card'),
  ...document.querySelectorAll('.card'),
  ...document.querySelectorAll('.edu-card'),
  document.querySelector('.contact-grid')
].filter(Boolean);

revealTargets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.classList.add('in-view');
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.18 });

revealTargets.forEach(el => io.observe(el));

/* Ripple on icon buttons */
document.querySelectorAll('.icon-btn').forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    const ripple = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const d = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = d + 'px';
    ripple.style.position = 'absolute';
    ripple.style.left = (e.clientX - rect.left - d/2) + 'px';
    ripple.style.top  = (e.clientY - rect.top  - d/2) + 'px';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(92,200,255,.35)';
    ripple.style.pointerEvents = 'none';
    ripple.style.transform = 'scale(0)';
    ripple.style.opacity = '0.7';
    ripple.style.transition = 'transform .6s cubic-bezier(.2,.8,.2,1), opacity .8s cubic-bezier(.2,.8,.2,1)';
    btn.appendChild(ripple);
    requestAnimationFrame(()=>{ ripple.style.transform = 'scale(1.8)'; ripple.style.opacity = '0'; });
    setTimeout(()=>ripple.remove(), 800);
  });
});

/* Footer year */
document.getElementById('year').textContent = new Date().getFullYear();

/* Contact form (demo) */
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  if (!data.name || !data.email || !data.subject || !data.message) {
    statusEl.textContent = 'Please fill in all required fields.';
    statusEl.style.color = '#ff8c8c';
    return;
  }
  statusEl.textContent = 'Thanks! Your message has been sent (demo).';
  statusEl.style.color = '';
  form.reset();
});

// Auto-insert current year + “All rights reserved to Karthik”
(function () {
  const year = new Date().getFullYear();
  const el = document.getElementById('copyright');
  if (el) {
    el.textContent = `© ${year} Karthik. All rights reserved.`;
  }
})();
