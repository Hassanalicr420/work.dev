document.addEventListener('DOMContentLoaded', () => {
  const assetStyles = document.createElement('link');
  assetStyles.rel = 'stylesheet';
  assetStyles.href = 'assets.css';
  document.head.appendChild(assetStyles);

  const refinementStyles = document.createElement('link');
  refinementStyles.rel = 'stylesheet';
  refinementStyles.href = 'refinement.css';
  document.head.appendChild(refinementStyles);

  const homeStyles = document.createElement('link');
  homeStyles.rel = 'stylesheet';
  homeStyles.href = 'home-sections.css';
  document.head.appendChild(homeStyles);

  const siteIcon = document.createElement('link');
  siteIcon.rel = 'icon';
  siteIcon.type = 'image/svg+xml';
  siteIcon.href = 'assets/icon.svg';
  document.head.appendChild(siteIcon);

  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progressBar);
  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  const page = document.body.dataset.page;
  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.dataset.nav === page) link.classList.add('active');
  });

  const portrait = document.querySelector('.portrait-block');
  if (portrait) {
    portrait.classList.add('has-image');
    portrait.insertAdjacentHTML('afterbegin', '<img class="portrait-image" src="assets/portrait.svg" alt="Abstract portrait illustration for Shahziab Akbar">');
  }

  const projectImages = [
    { selector: '.shop-visual', source: 'assets/shop.svg', className: 'shop-picture', alt: 'Atelier shop project preview' },
    { selector: '.studio-visual', source: 'assets/studio.svg', className: 'studio-picture', alt: 'North studio project preview' }
  ];
  projectImages.forEach(project => {
    const visual = document.querySelector(project.selector);
    if (visual) {
      visual.classList.add('has-picture');
      visual.insertAdjacentHTML('afterbegin', `<img class="project-picture ${project.className}" src="${project.source}" alt="${project.alt}"><span class="project-icon-badge" aria-hidden="true">↗</span>`);
    }
  });

  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.site-nav');
  menuButton?.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      document.querySelectorAll('.work-card').forEach(card => {
        card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter);
      });
    });
  });

  const form = document.querySelector('.contact-form');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    const status = form.querySelector('.form-status');
    status.textContent = 'Thanks for reaching out. Your message is ready to send.';
    form.reset();
  });
});
