const menuBtn = document.getElementById('menuBtn');
const mainNav = document.getElementById('mainNav');
const year = document.getElementById('year');
const header = document.querySelector('.cabecalho-site');
const navLinks = [...(mainNav?.querySelectorAll('a[href^="#"]') || [])];

if (year) year.textContent = new Date().getFullYear();

const getHeaderOffset = () => (header?.offsetHeight || 0) + 8;

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('ativo', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
};

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const updateActiveByScroll = () => {
  if (!sections.length) return;

  const nearBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

  if (nearBottom) {
    setActiveLink(sections[sections.length - 1].id);
    return;
  }

  const scrollY = window.scrollY;
  const offset = getHeaderOffset() + 16;
  let currentId = sections[0].id;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - offset;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionBottom) {
      currentId = section.id;
    } else if (scrollY >= sectionTop) {
      currentId = section.id;
    }
  });

  setActiveLink(currentId);
};

menuBtn?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('aberto');
  menuBtn.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href')?.replace('#', '');
    const target = targetId ? document.getElementById(targetId) : null;
    if (!target) return;

    setActiveLink(targetId);

    mainNav?.classList.remove('aberto');
    menuBtn?.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', updateActiveByScroll, { passive: true });
window.addEventListener('load', updateActiveByScroll);
window.addEventListener('resize', updateActiveByScroll);
window.addEventListener('hashchange', updateActiveByScroll);

if (window.ScrollReveal && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const sr = ScrollReveal({
    distance: '28px',
    duration: 700,
    easing: 'cubic-bezier(.22,.61,.36,1)',
    reset: false,
    viewFactor: 0.15
  });

  sr.reveal('.secao h2, .secao .selo-secao', { origin: 'bottom', interval: 90 });
  sr.reveal('.cartao, .etiqueta-link, .botao', { origin: 'bottom', interval: 70 });
  sr.reveal('.visual-destaque', { origin: 'right', delay: 120 });
  sr.reveal('.destaque h1, .destaque p, .acoes-destaque', { origin: 'left', interval: 100 });
}
