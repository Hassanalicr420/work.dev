const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const navSections = document.querySelectorAll('main section[id]');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    document.querySelectorAll('.site-nav a').forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-35% 0px -55% 0px' });

navSections.forEach((section) => navObserver.observe(section));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const counter = entry.target;
    const target = Number(counter.dataset.count);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 24));
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      counter.textContent = `${current}+`;
      if (current === target) clearInterval(timer);
    }, 45);
    countObserver.unobserve(counter);
  });
}, { threshold: 0.8 });

document.querySelectorAll('[data-count]').forEach((counter) => countObserver.observe(counter));

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const status = contactForm.querySelector('.form-status');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.style.opacity = '0.7';
    status.textContent = 'Sending your enquiry...';
    const payload = new FormData(contactForm);
    payload.append('_subject', 'New WorkDev website enquiry');
    payload.append('_captcha', 'false');
    payload.append('_template', 'table');
    try {
      const response = await fetch('https://formsubmit.co/ajax/hassanali.software@gmail.com', { method: 'POST', headers: { Accept: 'application/json' }, body: payload });
      if (!response.ok) throw new Error('Email service unavailable');
      status.textContent = 'Thanks. Hassan Ali will get back to you soon.';
      contactForm.reset();
    } catch (error) {
      status.textContent = 'Please WhatsApp us or email hassanali.software@gmail.com directly.';
    } finally {
      submitButton.disabled = false;
      submitButton.style.opacity = '1';
    }
  });
}

const courseDetails = {
  fullstack: { title: 'Full Stack Web Development', intro: 'A complete beginner-to-job-ready path for building modern web products from the first line of HTML to a deployed application.', duration: '16 weeks', level: 'Beginner+', projects: '05', topics: ['HTML5, semantic markup and accessibility', 'CSS, responsive design and animation', 'JavaScript, Git and GitHub workflow', 'React components, state and routing', 'Node.js, Express and REST APIs', 'MongoDB, SQL basics and deployment'] },
  app: { title: 'App Development', intro: 'Learn how to plan, design and build useful mobile applications with a modern cross-platform workflow.', duration: '12 weeks', level: 'Intermediate', projects: '04', topics: ['App planning and user flows', 'React Native foundations', 'Reusable components and navigation', 'Forms, APIs and authentication', 'Responsive mobile UI patterns', 'Testing and publishing basics'] },
  uiux: { title: 'UI/UX Design', intro: 'Turn rough ideas into clear, beautiful and useful interfaces that people enjoy using.', duration: '10 weeks', level: 'Creative', projects: '04', topics: ['User research and problem framing', 'Personas, journeys and information architecture', 'Wireframes and interactive prototypes', 'Figma components and design systems', 'Typography, color and visual hierarchy', 'Usability testing and handoff'] },
  python: { title: 'Python & Data Foundations', intro: 'Build strong programming logic and learn how Python can automate work and make sense of data.', duration: '10 weeks', level: 'Beginner+', projects: '03', topics: ['Python syntax and programming logic', 'Functions, lists and data structures', 'Files, APIs and automation scripts', 'Data cleaning and basic analysis', 'Charts and useful reports', 'Practical mini-projects'] },
  cyber: { title: 'Cyber Security Basics', intro: 'Understand the digital risks around modern products and develop secure habits from the start.', duration: '08 weeks', level: 'Beginner', projects: '03', topics: ['Security mindset and threat awareness', 'Networks, browsers and common attacks', 'Passwords, identity and access control', 'Web security essentials', 'Safe development and privacy', 'Incident response fundamentals'] },
  freelance: { title: 'Freelancing & Portfolio', intro: 'Create a professional identity, package your skills and confidently find your first meaningful clients.', duration: '06 weeks', level: 'Practical', projects: '02', topics: ['Choosing your niche and positioning', 'Portfolio case study structure', 'Pricing, proposals and contracts', 'Client communication and discovery', 'Personal branding and outreach', 'Delivery, feedback and repeat work'] },
  graphic: { title: 'Graphic Design', intro: 'Build a strong visual foundation and learn how to create brand assets that look intentional, clear and professional.', duration: '10 weeks', level: 'Creative', projects: '05', topics: ['Design principles and visual hierarchy', 'Adobe Photoshop and Illustrator workflow', 'Logo design and brand identity', 'Social media and marketing creatives', 'Typography, color and composition', 'Client briefs, revisions and delivery'] },
  youtube: { title: 'YouTube Automation', intro: 'Learn the complete creator workflow behind a consistent YouTube channel, from niche research to publishing and growth.', duration: '08 weeks', level: 'Creator', projects: '04', topics: ['Niche research and channel strategy', 'Video ideas, research and scripting', 'Voiceover, editing and stock footage', 'Thumbnail and title psychology', 'YouTube SEO and publishing workflow', 'Analytics, consistency and monetization basics'] },
  php: { title: 'PHP Development', intro: 'Learn to build dynamic, database-powered websites and backend systems with PHP and MySQL.', duration: '10 weeks', level: 'Backend', projects: '04', topics: ['PHP syntax and programming logic', 'Forms, sessions and authentication', 'MySQL databases and queries', 'CRUD applications and APIs', 'Secure backend development', 'Deploying a PHP project'] },
  marketing: { title: 'Digital Marketing', intro: 'Learn how brands attract, convert and retain customers through measurable digital campaigns.', duration: '08 weeks', level: 'Business', projects: '03', topics: ['SEO and keyword research', 'SEM and Google Ads basics', 'Social media marketing strategy', 'Content planning and copywriting', 'Analytics and campaign reporting', 'Practical marketing projects'] },
  office: { title: 'MS Office Mastery', intro: 'Build the everyday digital confidence required in modern offices, education and business teams.', duration: '06 weeks', level: 'Beginner', projects: '03', topics: ['Microsoft Word documents and reports', 'Excel formulas, sheets and charts', 'PowerPoint presentations', 'Professional templates and formatting', 'Data organization and productivity', 'Office workflow projects'] }
};

const courseModal = document.querySelector('#courseModal');
const courseForm = document.querySelector('#courseForm');
if (courseModal) {
  const openCourseModal = (courseKey) => {
    const course = courseDetails[courseKey];
    if (!course) return;
    document.querySelector('#modalTitle').textContent = course.title;
    document.querySelector('#modalIntro').textContent = course.intro;
    document.querySelector('#modalDuration').textContent = course.duration;
    document.querySelector('#modalLevel').textContent = course.level;
    document.querySelector('#modalProjects').textContent = course.projects;
    document.querySelector('#modalTopics').innerHTML = course.topics.map((topic) => `<li>${topic}</li>`).join('');
    courseModal.classList.add('open');
    courseModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    document.querySelector('.modal-close').focus();
  };
  const closeCourseModal = () => {
    courseModal.classList.remove('open');
    courseModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };
  document.querySelectorAll('.course-detail-button').forEach((button) => button.addEventListener('click', () => openCourseModal(button.dataset.course)));
  courseModal.querySelectorAll('[data-modal-close]').forEach((element) => element.addEventListener('click', closeCourseModal));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && courseModal.classList.contains('open')) closeCourseModal(); });
}
if (courseForm) {
  courseForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const status = courseForm.querySelector('.form-status');
    const submitButton = courseForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    status.textContent = 'Sending your course request...';
    const payload = new FormData(courseForm);
    payload.append('_subject', `Course detail request: ${document.querySelector('#modalTitle').textContent}`);
    payload.append('_captcha', 'false');
    payload.append('_template', 'table');
    try {
      const response = await fetch('https://formsubmit.co/ajax/hassanali.software@gmail.com', {method:'POST',headers:{Accept:'application/json'},body:payload});
      if (!response.ok) throw new Error('Email service unavailable');
      status.textContent = 'Thanks. Hassan Ali will contact you about this course soon.';
      courseForm.reset();
    } catch (error) {
      status.textContent = 'Please WhatsApp us or email hassanali.software@gmail.com directly.';
    } finally {
      submitButton.disabled = false;
    }
  });
}

document.querySelectorAll('.footer-grid').forEach((footer) => {
  if (footer.querySelector('.footer-links')) return;
  const links = document.createElement('div');
  links.className = 'footer-links';
  links.innerHTML = '<b>Quick links</b><a href="index.html">Home</a><a href="services.html">Services</a><a href="courses.html">Courses</a><a href="portfolio.html">Portfolio</a>';
  const contact = document.createElement('div');
  contact.className = 'footer-contact';
  contact.innerHTML = '<b>Get in touch</b><a href="tel:+923166725762">0316 6725762</a><a href="mailto:hassanali.software@gmail.com">hassanali.software@gmail.com</a><span>Gharamore, Multan Road</span>';
  footer.insertBefore(links, footer.querySelector('.socials'));
  footer.insertBefore(contact, footer.querySelector('.socials'));
});

const portfolioShowcase = document.querySelector('.portfolio-showcase');
if (portfolioShowcase) {
  portfolioShowcase.insertAdjacentHTML('afterend', '<section class="poc-section reveal"><div class="poc-heading"><div><p class="kicker">Project POCs</p><h2>Ideas, tested early.</h2></div><p>Small working prototypes that turn a conversation into something people can see, try and improve.</p></div><div class="poc-grid"><article class="poc-card poc-solar"><div class="poc-art"><span>☼</span><b>Solar quote<br>calculator</b></div><div><span class="poc-label">Renewable energy · POC 01</span><h3>SunPeak Quote Flow</h3><p>A quick lead tool that estimates solar needs and sends a clear enquiry to the team.</p><div class="project-tags"><span>JavaScript</span><span>Calculator UX</span></div><a href="contact.html" class="text-link">Build this POC <span>↗</span></a></div></article><article class="poc-card poc-academy"><div class="poc-art"><span>&lt;/&gt;</span><b>Course<br>dashboard</b></div><div><span class="poc-label">Education · POC 02</span><h3>WorkDev Learning Hub</h3><p>A student dashboard concept for browsing courses, tracking modules and booking a batch.</p><div class="project-tags"><span>UI system</span><span>Dashboard</span></div><a href="contact.html" class="text-link">Build this POC <span>↗</span></a></div></article><article class="poc-card poc-content"><div class="poc-art"><span>AI</span><b>Content<br>planner</b></div><div><span class="poc-label">Creator tools · POC 03</span><h3>ChannelPilot</h3><p>A focused workspace for planning video ideas, scripts, thumbnails and publishing dates.</p><div class="project-tags"><span>Product design</span><span>Automation</span></div><a href="contact.html" class="text-link">Build this POC <span>↗</span></a></div></article></div></section>');
  const pocSection = portfolioShowcase.nextElementSibling;
  pocSection?.classList.add('visible', 'poc-followup');
  pocSection?.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
}

const serviceGrid = document.querySelector('.service-premium');
if (serviceGrid) {
  serviceGrid.insertAdjacentHTML('beforeend', '<article class="service-card reveal visible"><span class="service-index">05</span><span class="card-icon blue">◆</span><h3>Custom software</h3><p>Purpose-built business systems that match your exact workflow instead of forcing you into a generic tool.</p><div class="service-list"><span>Business automation</span><span>Admin dashboards</span><span>Custom platforms</span></div><a href="contact.html">Build your system <span>→</span></a></article><article class="service-card reveal visible"><span class="service-index">06</span><span class="card-icon violet">$</span><h3>E-commerce solutions</h3><p>Online stores that make products easy to discover, trust and purchase across every device.</p><div class="service-list"><span>Storefront design</span><span>Payments &amp; checkout</span><span>Product management</span></div><a href="contact.html">Launch a store <span>→</span></a></article><article class="service-card reveal visible"><span class="service-index">07</span><span class="card-icon aqua">▤</span><h3>CMS &amp; business websites</h3><p>Flexible websites your team can update confidently, with clear content structures and modern performance.</p><div class="service-list"><span>WordPress &amp; CMS</span><span>Landing pages</span><span>Content systems</span></div><a href="contact.html">Plan your website <span>→</span></a></article><article class="service-card reveal visible"><span class="service-index">08</span><span class="card-icon amber">↗</span><h3>API &amp; database systems</h3><p>Reliable data foundations and integrations that help your products communicate and work smarter.</p><div class="service-list"><span>REST APIs</span><span>MySQL &amp; MongoDB</span><span>Third-party integrations</span></div><a href="contact.html">Connect your tools <span>→</span></a></article><article class="service-card reveal visible"><span class="service-index">09</span><span class="card-icon blue">✓</span><h3>QA &amp; testing</h3><p>Thorough testing across devices and flows so your product feels dependable from the first interaction.</p><div class="service-list"><span>Functional testing</span><span>Responsive checks</span><span>Bug fixing</span></div><a href="contact.html">Improve quality <span>→</span></a></article><article class="service-card reveal visible"><span class="service-index">10</span><span class="card-icon violet">☁</span><h3>Cloud &amp; DevOps</h3><p>Deployment, hosting and performance foundations that keep your application ready for real users.</p><div class="service-list"><span>Hosting setup</span><span>Deployment workflows</span><span>Performance tuning</span></div><a href="contact.html">Scale your product <span>→</span></a></article><article class="service-card reveal visible"><span class="service-index">11</span><span class="card-icon aqua">◇</span><h3>Cybersecurity</h3><p>Practical security habits and protections for websites, accounts, data and everyday digital operations.</p><div class="service-list"><span>Security review</span><span>Access protection</span><span>Privacy basics</span></div><a href="contact.html">Secure your work <span>→</span></a></article><article class="service-card reveal visible"><span class="service-index">12</span><span class="card-icon amber">↗</span><h3>SEO &amp; digital marketing</h3><p>Help the right people find your business through search, content, social media and measurable campaigns.</p><div class="service-list"><span>SEO foundations</span><span>Social media strategy</span><span>Google Ads basics</span></div><a href="contact.html">Grow your reach <span>→</span></a></article>');
}

const courseCatalog = document.querySelector('.course-catalog');
if (courseCatalog) {
  const enrollmentMarkup = '<section class="enrollment-section reveal visible" id="enroll"><div class="enrollment-copy"><p class="kicker">Student admissions</p><h2>Choose a course.<br><em>Start your next chapter.</em></h2><p>Tell us what you want to learn and our team will share the next batch, schedule and admission details.</p><div class="enrollment-note"><span>01</span><p><b>Fees are shown instantly</b><small>Select a course and the fee will be filled automatically.</small></p></div></div><form class="enrollment-form" id="enrollmentForm"><div class="form-heading"><p class="kicker">Course enquiry</p><h3>What do you want to learn?</h3></div><div class="form-row"><label>Student name<input name="student_name" type="text" placeholder="Your full name" required></label><label>Phone number<input name="student_phone" type="tel" placeholder="0316 6725762" required></label></div><label>Select course<select name="selected_course" id="courseSelect" required><option value="">Choose a course</option><option value="Full Stack Web Development">Full Stack Web Development</option><option value="App Development">App Development</option><option value="UI/UX Design">UI/UX Design</option><option value="Python & Data Foundations">Python & Data Foundations</option><option value="Cyber Security Basics">Cyber Security Basics</option><option value="Freelancing & Portfolio">Freelancing & Portfolio</option><option value="Graphic Design">Graphic Design</option><option value="YouTube Automation">YouTube Automation</option><option value="PHP Development">PHP Development</option><option value="Digital Marketing">Digital Marketing</option><option value="MS Office Mastery">MS Office Mastery</option></select></label><label>Course fee<input id="courseFee" name="course_fee" type="text" value="Select a course first" readonly></label><label>Email address<input name="student_email" type="email" placeholder="student@example.com" required></label><label>Your message<textarea name="student_message" rows="3" placeholder="Tell us your learning goal or ask a question..." required></textarea></label><button class="button" type="submit">Send course enquiry <span>→</span></button><p class="form-status" role="status"></p></form></section>';
  const academyNote = document.querySelector('.academy-note');
  academyNote?.insertAdjacentHTML('afterend', enrollmentMarkup);
  const fees = {'Full Stack Web Development':'PKR 45,000','App Development':'PKR 40,000','UI/UX Design':'PKR 30,000','Python & Data Foundations':'PKR 35,000','Cyber Security Basics':'PKR 40,000','Freelancing & Portfolio':'PKR 20,000','Graphic Design':'PKR 30,000','YouTube Automation':'PKR 35,000','PHP Development':'PKR 40,000','Digital Marketing':'PKR 30,000','MS Office Mastery':'PKR 18,000'};
  const courseSelect = document.querySelector('#courseSelect');
  const courseFee = document.querySelector('#courseFee');
  courseSelect?.addEventListener('change', () => { courseFee.value = fees[courseSelect.value] || 'Select a course first'; });
  const enrollmentForm = document.querySelector('#enrollmentForm');
  enrollmentForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const status = enrollmentForm.querySelector('.form-status');
    status.textContent = 'Sending your course enquiry...';
    const payload = new FormData(enrollmentForm);
    payload.append('_subject', `Course enquiry: ${courseSelect.value}`);
    payload.append('_captcha', 'false');
    payload.append('_template', 'table');
    try {
      const response = await fetch('https://formsubmit.co/ajax/hassanali.software@gmail.com', {method:'POST',headers:{Accept:'application/json'},body:payload});
      if (!response.ok) throw new Error('Email service unavailable');
      status.textContent = 'Thanks. WorkDev will contact you about this course soon.';
      enrollmentForm.reset();
      courseFee.value = 'Select a course first';
    } catch (error) { status.textContent = 'Please WhatsApp us or email hassanali.software@gmail.com directly.'; }
  });
}

const whatsappButton = document.createElement('a');
whatsappButton.className = 'whatsapp-float';
whatsappButton.href = 'https://wa.me/923166725762?text=Hello%20WorkDev%2C%20I%20want%20to%20know%20more.';
whatsappButton.target = '_blank';
whatsappButton.rel = 'noopener';
whatsappButton.setAttribute('aria-label', 'Chat with WorkDev on WhatsApp');
whatsappButton.title = 'Chat on WhatsApp';
whatsappButton.innerHTML = '<span>◔</span><b>WhatsApp</b>';
document.body.appendChild(whatsappButton);
