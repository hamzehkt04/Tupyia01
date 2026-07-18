document.addEventListener('DOMContentLoaded', () => {

  /*active nav link*/
  const currentPage = document.body.dataset.page;
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    if (link.dataset.page === currentPage) link.classList.add('active');
  });

  /* header shadow  */
  const header = document.querySelector('.site-header');
  const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 8);
  };
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  /* mobile menu */
  const navPanel = document.querySelector('.nav-panel');
  const menuToggle = document.querySelector('.menu-toggle');
  if (navPanel && menuToggle) {
    const closeMenu = () => {
      navPanel.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    };
    menuToggle.addEventListener('click', () => {
      const isOpen = navPanel.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navPanel.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* scroll reveal */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /*  stagger reveal - groups items */
  document.querySelectorAll('[data-reveal-group]').forEach(group => {
    Array.from(group.children).forEach((child, i) => {
      child.style.transitionDelay = `${Math.min(i * 90, 360)}ms`;
    });
  });

  /* footer year */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* contact form  */
  const form = document.getElementById('contact-form');
  if (form) {
    const status = document.getElementById('form-status');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const message = form.querySelector('#message').value.trim();

      if (!name || !email || !message) {
        status.textContent = 'الرجاء تعبئة جميع الحقول المطلوبة.';
        status.className = 'form-status err';
        return;
      }
      if (!emailPattern.test(email)) {
        status.textContent = 'الرجاء إدخال بريد إلكتروني صحيح.';
        status.className = 'form-status err';
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      status.textContent = 'جارٍ الإرسال...';
      status.className = 'form-status';
      
      setTimeout(() => {
        status.textContent = 'تم إرسال رسالتك بنجاح، سنتواصل معك في أقرب وقت ممكن.';
        status.className = 'form-status ok';
        form.reset();
        submitBtn.disabled = false;
      }, 700);
    });
  }
});
