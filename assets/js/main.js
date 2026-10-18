(() => {
  document.documentElement.classList.add('js');

  // Cabeçalho com fundo ao rolar; botão flutuante só depois do hero, para não cobrir os botões principais
  const header = document.querySelector('.header');
  const floatBtn = document.querySelector('.wa-float');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
    floatBtn.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Menu mobile
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav');
  const setNav = (open) => {
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };
  toggle.addEventListener('click', () => setNav(!document.body.classList.contains('nav-open')));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setNav(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setNav(false); });
  window.matchMedia('(min-width: 961px)').addEventListener('change', (e) => { if (e.matches) setNav(false); });

  // Escolha de unidade (sem suporte a <dialog>, o link leva à seção de unidades)
  const dialog = document.getElementById('agendar');
  if (dialog && typeof dialog.showModal === 'function') {
    document.querySelectorAll('[data-booking]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        setNav(false);
        dialog.showModal();
      });
    });
    dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
    dialog.querySelectorAll('.booking__option').forEach((a) => a.addEventListener('click', () => dialog.close()));
  }

  // Animação de entrada
  const items = document.querySelectorAll('.reveal');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('is-visible'));
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();
