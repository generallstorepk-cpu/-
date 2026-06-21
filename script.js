// ============================================
// MOIZ KHAN — PORTFOLIO SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('loaded'), 600);
  });
  // Fallback in case 'load' already fired
  setTimeout(() => preloader.classList.add('loaded'), 2500);

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Cursor glow (mouse-follow) ---------- */
  const cursorGlow = document.getElementById('cursorGlow');
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  if (cursorGlow && !isTouch) {
    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let glowX = mouseX, glowY = mouseY;
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    function animateGlow() {
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;
      cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  } else if (cursorGlow) {
    cursorGlow.style.display = 'none';
  }

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 40;
    navbar.classList.toggle('scrolled', scrolled);
    backToTop.classList.toggle('show', window.scrollY > 500);
  });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  /* ---------- Back to top ---------- */
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Floating particles ---------- */
  const particlesContainer = document.getElementById('particles');
  const particleCount = 36;
  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    const size = Math.random() * 3 + 2;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.bottom = `-10px`;
    p.style.animationDuration = `${Math.random() * 10 + 8}s`;
    p.style.animationDelay = `${Math.random() * 10}s`;
    particlesContainer.appendChild(p);
  }

  /* ---------- Typewriter hero effect ---------- */
  const typedEl = document.getElementById('typed-name');
  const fullText = 'Moiz Khan';
  if (typedEl) {
    typedEl.textContent = '';
    let i = 0;
    function typeChar() {
      if (i <= fullText.length) {
        typedEl.textContent = fullText.slice(0, i);
        i++;
        setTimeout(typeChar, 90);
      }
    }
    typeChar();
  }

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll('.reveal-up');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1400;
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  /* ---------- Skill bars ---------- */
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width + '%';
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  skillBars.forEach(bar => skillObserver.observe(bar));

  /* ---------- Portfolio filter ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      portfolioCards.forEach(card => {
        const match = filter === 'all' || card.dataset.cat === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });

  /* ---------- Project modal ---------- */
  const modal = document.getElementById('projectModal');
  const modalImg = document.getElementById('modalImg');
  const modalCat = document.getElementById('modalCat');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTags = document.getElementById('modalTags');
  const modalClose = document.getElementById('modalClose');

  portfolioCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modalCat.textContent = card.querySelector('.portfolio-cat').textContent;
      modalTitle.textContent = card.dataset.title;
      modalDesc.textContent = card.dataset.desc;
      modalTags.innerHTML = card.dataset.tags
        .split(',')
        .map(tag => `<span>${tag.trim()}</span>`)
        .join('');
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  /* ---------- Testimonial slider ---------- */
  const track = document.getElementById('testimonialTrack');
  const dotsContainer = document.getElementById('testimonialDots');
  const slides = track ? track.children : [];
  let currentSlide = 0;
  let autoplayTimer;

  if (track && slides.length) {
    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('span');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }

    function goToSlide(index) {
      currentSlide = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      dotsContainer.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active', i === currentSlide);
      });
    }

    function nextSlide() { goToSlide(currentSlide + 1); }

    function startAutoplay() {
      autoplayTimer = setInterval(nextSlide, 5000);
    }
    function stopAutoplay() {
      clearInterval(autoplayTimer);
    }

    startAutoplay();
    track.closest('.testimonial-slider').addEventListener('mouseenter', stopAutoplay);
    track.closest('.testimonial-slider').addEventListener('mouseleave', startAutoplay);
  }

  /* ---------- Contact form validation ---------- */
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  function setError(id, message) {
    const group = document.getElementById(id).closest('.form-group');
    const errorEl = document.getElementById(id + 'Error');
    if (message) {
      group.classList.add('error');
      errorEl.textContent = message;
    } else {
      group.classList.remove('error');
      errorEl.textContent = '';
    }
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formSuccess.classList.remove('show');

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const subject = form.subject.value.trim();
      const message = form.message.value.trim();
      let valid = true;

      if (name.length < 2) { setError('name', 'Please enter your full name.'); valid = false; }
      else setError('name', '');

      if (!isValidEmail(email)) { setError('email', 'Please enter a valid email address.'); valid = false; }
      else setError('email', '');

      if (subject.length < 3) { setError('subject', 'Please add a short subject.'); valid = false; }
      else setError('subject', '');

      if (message.length < 10) { setError('message', 'Message should be at least 10 characters.'); valid = false; }
      else setError('message', '');

      if (valid) {
        formSuccess.classList.add('show');
        form.reset();
      }
    });
  }

});
