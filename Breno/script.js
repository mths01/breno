/* ========================================
   MÉTODO BRENO LOCADOR - LANDING PAGE
   JavaScript - Animations & Interactivity
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================
  // 1. ENTRADA CINEMATOGRÁFICA (HERO)
  // ========================================
  setTimeout(() => {
    document.querySelectorAll('#hero .animate-on-scroll').forEach(el => {
      el.classList.add('visible');
    });
  }, 100);

  // ========================================
  // 2. NAVBAR SCROLL EFFECT (GLASSMORPHISM)
  // ========================================
  const navbar = document.querySelector('.navbar');
  const floatingCta = document.querySelector('.floating-cta');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (floatingCta) {
      if (currentScroll > 600) {
        floatingCta.classList.add('visible');
      } else {
        floatingCta.classList.remove('visible');
      }
    }
    lastScroll = currentScroll;
  });

  // ========================================
  // 3. INTERSECTION OBSERVER (REVELAÇÃO AO ROLAR)
  // ========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px' 
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); 
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    if (!el.closest('#hero')) {
      observer.observe(el);
    }
  });

  // ========================================
  // 4. ANIMAÇÃO DOS NÚMEROS (CONTADORES)
  // ========================================
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 2500; 
        const startTime = performance.now();
        const startValue = 0;

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(startValue + (target - startValue) * easeOut);
          counter.textContent = current + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          }
        }

        requestAnimationFrame(updateCounter);
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    counterObserver.observe(el);
  });

  // ========================================
  // 5. MENU MOBILE
  // ========================================
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    if (mobileMenuClose) {
      mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ========================================
  // 6. SMOOTH SCROLL (Navegação Suave)
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========================================
  // 7. FAQ ACCORDION (Sanfona)
  // ========================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(faq => faq.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ========================================
  // 8. VIDEO PLAYER (VSL)
  // ========================================
  const video = document.getElementById('vsl-video');
  const videoOverlay = document.querySelector('.video-overlay');
  const playPauseBtn = document.getElementById('play-pause-btn');
  const muteBtn = document.getElementById('mute-btn');
  const videoControls = document.querySelector('.video-controls');
  const progressBar = document.querySelector('.video-progress');
  const progressFill = document.querySelector('.video-progress-bar');
  const timeDisplay = document.querySelector('.video-time');

  if (video && videoOverlay) {
    videoOverlay.addEventListener('click', () => {
      video.play();
      videoOverlay.classList.add('hidden');
      if (videoControls) videoControls.classList.add('visible');
    });

    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => {
        if (video.paused) {
          video.play();
          playPauseBtn.innerHTML = '<svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" fill="white"/><rect x="14" y="4" width="4" height="16" fill="white"/></svg>';
        } else {
          video.pause();
          playPauseBtn.innerHTML = '<svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" fill="white"/></svg>';
        }
      });
    }

    video.addEventListener('play', () => {
      if (playPauseBtn) {
        playPauseBtn.innerHTML = '<svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" fill="white"/><rect x="14" y="4" width="4" height="16" fill="white"/></svg>';
      }
    });

    video.addEventListener('pause', () => {
      if (playPauseBtn) {
        playPauseBtn.innerHTML = '<svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" fill="white"/></svg>';
      }
    });

    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        if (video.muted) {
          muteBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5z" fill="white"/><line x1="23" y1="9" x2="17" y2="15" stroke="white" stroke-width="2"/><line x1="17" y1="9" x2="23" y2="15" stroke="white" stroke-width="2"/></svg>';
        } else {
          muteBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5z" fill="white"/><path d="M15.54 8.46a5 5 0 010 7.07" stroke="white" stroke-width="2" fill="none"/><path d="M19.07 4.93a10 10 0 010 14.14" stroke="white" stroke-width="2" fill="none"/></svg>';
        }
      });
    }

    video.addEventListener('timeupdate', () => {
      if (progressFill && video.duration) {
        const progress = (video.currentTime / video.duration) * 100;
        progressFill.style.width = progress + '%';
      }
      if (timeDisplay && video.duration) {
        timeDisplay.textContent = formatTime(video.currentTime) + ' / ' + formatTime(video.duration);
      }
    });

    if (progressBar) {
      progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        video.currentTime = pos * video.duration;
      });
    }

    video.addEventListener('ended', () => {
      videoOverlay.classList.remove('hidden');
      if (videoControls) videoControls.classList.remove('visible');
    });
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins.toString().padStart(2, '0') + ':' + secs.toString().padStart(2, '0');
  }

  // ========================================
  // 9. PARALLAX EFFECTS (Luzes de Fundo da Hero)
  // ========================================
  const heroGlow = document.querySelector('.hero-glow');
  if (heroGlow) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      heroGlow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
  }

});