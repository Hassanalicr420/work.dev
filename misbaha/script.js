document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  menuToggle?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.main-nav a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  const revealItems = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));

  const form = document.querySelector('.contact-form');
  const status = document.querySelector('.form-status');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = 'Thank you. Your message is ready to be sent.';
    form.reset();
  });
});
