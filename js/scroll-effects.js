/**
 * Aline Barbosa Imóveis - Sistema de Animações & Scroll Reveal
 * Foco estrito em performance (IntersectionObserver, 60fps, RAF)
 * Padrão fiel ao sistema dinâmico da Casa Master
 */

(function () {
  'use strict';

  // Verifica preferência de acessibilidade
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', () => {
    initScrollProgressBar();
    initScrollReveal();
    initParallaxEffects();
    initCounters();
    initNavbarScroll();
    initSmoothScroll();
  });

  /* ==========================================================================
     1. Barra de Progresso de Leitura Superior
     ========================================================================== */
  function initScrollProgressBar() {
    let progressBar = document.querySelector('.scroll-progress-bar');

    if (!progressBar) {
      const container = document.createElement('div');
      container.className = 'scroll-progress-container';
      progressBar = document.createElement('div');
      progressBar.className = 'scroll-progress-bar';
      container.appendChild(progressBar);
      document.body.appendChild(container);
    }

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const progress = (window.scrollY / totalHeight) * 100;
            progressBar.style.width = Math.min(100, Math.max(0, progress)) + '%';
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ==========================================================================
     2. Motor de Reveal on Scroll com IntersectionObserver
     ========================================================================== */
  let revealObserver = null;

  function initScrollReveal() {
    if (prefersReducedMotion) {
      document.querySelectorAll('[data-reveal], [data-stagger="true"]').forEach(el => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12
    };

    revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;

          // Se for um grupo com stagger
          if (target.getAttribute('data-stagger') === 'true') {
            const children = target.children;
            Array.from(children).forEach((child, index) => {
              const delay = (index * 80) + 'ms';
              child.style.transitionDelay = delay;
            });
          }

          target.classList.add('is-revealed');
          observer.unobserve(target);
        }
      });
    }, observerOptions);

    observeElements();
  }

  function observeElements() {
    if (!revealObserver) return;

    const elements = document.querySelectorAll('[data-reveal]:not(.is-revealed), [data-stagger="true"]:not(.is-revealed)');
    elements.forEach(el => {
      revealObserver.observe(el);
    });
  }

  // Permite reativar o observer após filtros de imóveis ou injeção dinâmica
  window.refreshScrollObserver = function () {
    if (prefersReducedMotion) {
      document.querySelectorAll('[data-reveal], [data-stagger="true"]').forEach(el => {
        el.classList.add('is-revealed');
      });
      return;
    }

    setTimeout(() => {
      observeElements();
    }, 40);
  };

  /* ==========================================================================
     3. Parallax Sutil em Imagens & Cards de Fundo
     ========================================================================== */
  function initParallaxEffects() {
    if (prefersReducedMotion) return;

    const parallaxElements = document.querySelectorAll('.parallax-layer');
    if (!parallaxElements.length) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;

          parallaxElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            // Apenas se estiver próximo da viewport
            if (rect.top < windowHeight && rect.bottom > 0) {
              const centerOffset = (rect.top + rect.height / 2) - (windowHeight / 2);
              const speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0.05;
              const translateY = Math.max(-20, Math.min(20, centerOffset * speed));
              el.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0)`;
            }
          });

          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ==========================================================================
     4. Contadores Numéricos Animados
     ========================================================================== */
  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const targetNumber = parseFloat(target.getAttribute('data-counter')) || 0;
          const prefix = target.getAttribute('data-counter-prefix') || '';
          const suffix = target.getAttribute('data-counter-suffix') || '';
          const duration = 1600; // ms
          const startTime = performance.now();

          function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Easing suave (easeOutQuart)
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            const currentVal = Math.floor(easeProgress * targetNumber);

            target.textContent = prefix + currentVal + suffix;

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              target.textContent = prefix + targetNumber + suffix;
            }
          }

          window.requestAnimationFrame(step);
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.25 });

    counters.forEach(c => counterObserver.observe(c));
  }

  /* ==========================================================================
     5. Navbar Scrolled State ao Rolar a Página
     ========================================================================== */
  function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const onScroll = () => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ==========================================================================
     6. Rolagem Suave para Âncoras
     ========================================================================== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || !targetId) return;

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const navHeight = document.querySelector('.navbar')?.offsetHeight || 75;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navHeight - 10;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

})();
