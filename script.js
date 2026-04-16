/* ============================================
   WEDDING INVITATION — JavaScript
   Camila & Mateo — 28.11.2026
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- ENVELOPE INTERACTION ----
  const envelopeScreen = document.getElementById('envelope-screen');
  const envelope = document.getElementById('envelope');
  const waxSeal = document.getElementById('wax-seal');
  const mainContent = document.getElementById('main-content');

  const musicToggle = document.getElementById('music-toggle');
  const bgMusic = document.getElementById('bg-music');
  const musicBars = document.getElementById('music-bars');
  let musicPlaying = false;
  let envelopeOpened = false;

  function openEnvelope() {
    if (envelopeOpened) return;
    envelopeOpened = true;

    // Open the flap and slide letter
    envelope.classList.add('open');

    // After animation, reveal main content
    setTimeout(() => {
      envelopeScreen.classList.add('opened');
      mainContent.classList.remove('hidden');
      document.body.style.overflow = '';
      // Auto-play music
      bgMusic.play().then(() => {
        musicBars.classList.add('active');
        musicPlaying = true;
      }).catch(() => {});
      // Trigger hero stagger + init everything
      requestAnimationFrame(() => {
        triggerHeroStagger();
        initScrollAnimations();
        initNavScroll();
        initParallax();
        startCountdown();
      });
    }, 1600);
  }

  // Prevent scroll before envelope is opened
  document.body.style.overflow = 'hidden';

  waxSeal.addEventListener('click', (e) => {
    e.stopPropagation();
    openEnvelope();
  });

  envelope.addEventListener('click', openEnvelope);

  // ---- HERO STAGGERED ENTRANCE ----
  function triggerHeroStagger() {
    const heroContent = document.getElementById('hero-content');
    if (heroContent) {
      heroContent.classList.add('stagger-in');
    }
  }

  // ---- PARALLAX HERO ----
  function initParallax() {
    const hero = document.getElementById('hero');
    const heroBg = document.getElementById('hero-bg');
    if (!hero || !heroBg) return;

    hero.classList.add('parallax-ready');

    function updateParallax() {
      const scrollY = window.scrollY;
      const heroHeight = hero.offsetHeight;
      if (scrollY < heroHeight) {
        const translate = scrollY * 0.3;
        heroBg.style.transform = `translateY(${translate}px)`;
      }
    }

    window.addEventListener('scroll', updateParallax, { passive: true });
    updateParallax();
  }

  // ---- FIXED NAV — show/hide on scroll ----
  function initNavScroll() {
    const nav = document.getElementById('fixed-nav');
    const hero = document.getElementById('hero');
    if (!nav || !hero) return;

    let lastScrollY = 0;
    let heroBottom = hero.offsetHeight;

    function onScroll() {
      const scrollY = window.scrollY;
      heroBottom = hero.offsetHeight;

      if (scrollY > heroBottom - 100) {
        // Past hero
        if (scrollY < lastScrollY || scrollY < heroBottom + 50) {
          // Scrolling up or just past hero
          nav.classList.add('visible');
          nav.classList.remove('nav-hidden');
        } else {
          // Scrolling down
          nav.classList.add('nav-hidden');
          nav.classList.remove('visible');
        }
      } else {
        // Still in hero
        nav.classList.remove('visible');
        nav.classList.remove('nav-hidden');
      }

      lastScrollY = scrollY;
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Smooth scroll for nav links
    nav.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          const offset = 60; // nav height
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  // ---- COUNTDOWN ----
  function startCountdown() {
    // Wedding date: November 28, 2026 at 4:00 PM Colombia time (UTC-5)
    const weddingDate = new Date('2026-11-28T16:00:00-05:00');

    function updateCountdown() {
      const now = new Date();
      const diff = weddingDate - now;

      if (diff <= 0) {
        document.getElementById('cd-days').textContent = '0';
        document.getElementById('cd-hours').textContent = '0';
        document.getElementById('cd-minutes').textContent = '0';
        document.getElementById('cd-seconds').textContent = '0';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      document.getElementById('cd-days').textContent = days;
      document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
      document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
      document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // ---- SCROLL FADE-IN ANIMATIONS ----
  function initScrollAnimations() {
    const sections = document.querySelectorAll('.fade-in-section');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    sections.forEach(section => observer.observe(section));
  }

  // ---- REGALO TABS ----
  document.querySelectorAll('.regalo-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const currency = tab.dataset.currency;
      document.querySelectorAll('.regalo-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.regalo-card').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('regalo-' + currency).classList.add('active');
    });
  });

  // ---- MUSIC PLAYER ----
  musicToggle.addEventListener('click', () => {
    if (musicPlaying) {
      bgMusic.pause();
      musicBars.classList.remove('active');
      musicPlaying = false;
    } else {
      bgMusic.play().catch(() => {});
      musicBars.classList.add('active');
      musicPlaying = true;
    }
  });

  // ---- LIGHTBOX ----
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const galleryItems = document.querySelectorAll('.gallery-item[data-index]');
  const gallerySrcs = Array.from(galleryItems).map(item => item.querySelector('img').src);
  let currentIndex = 0;

  function showLightbox(index) {
    currentIndex = index;
    lightboxImg.src = gallerySrcs[currentIndex];
    lightboxImg.alt = galleryItems[currentIndex].querySelector('img').alt;
    lightboxCounter.textContent = (currentIndex + 1) + ' / ' + gallerySrcs.length;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function nextPhoto() {
    currentIndex = (currentIndex + 1) % gallerySrcs.length;
    lightboxImg.src = gallerySrcs[currentIndex];
    lightboxImg.alt = galleryItems[currentIndex].querySelector('img').alt;
    lightboxCounter.textContent = (currentIndex + 1) + ' / ' + gallerySrcs.length;
  }

  function prevPhoto() {
    currentIndex = (currentIndex - 1 + gallerySrcs.length) % gallerySrcs.length;
    lightboxImg.src = gallerySrcs[currentIndex];
    lightboxImg.alt = galleryItems[currentIndex].querySelector('img').alt;
    lightboxCounter.textContent = (currentIndex + 1) + ' / ' + gallerySrcs.length;
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      showLightbox(parseInt(item.dataset.index));
    });
  });

  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox-next').addEventListener('click', nextPhoto);
  document.getElementById('lightbox-prev').addEventListener('click', prevPhoto);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextPhoto();
    if (e.key === 'ArrowLeft') prevPhoto();
  });

  // Swipe support for mobile
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff < 0) nextPhoto();
      else prevPhoto();
    }
  }, { passive: true });

});
