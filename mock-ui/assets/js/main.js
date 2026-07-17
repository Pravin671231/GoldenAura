/* Golden Aura — Mock UI behavior: mobile nav toggle, scroll-reveal, lightweight parallax.
   Vanilla JS, no dependencies — mirrors what a real build would do in a layout component. */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Mobile nav toggle ----------
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove('mobile-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('nav-open');
  }

  if (toggle && nav) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'main-nav');
    toggle.setAttribute('aria-label', 'Open menu');
    nav.id = 'main-nav';

    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('mobile-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('nav-open', isOpen);
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    // Collapse the mobile panel if the viewport grows back into desktop nav
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1280) closeNav();
    });
  }

  // ---------- Reading progress (only present on article-style pages) ----------
  var progressBar = document.querySelector('.reading-progress span');
  if (progressBar) {
    var updateProgress = function () {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      progressBar.style.width = pct + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();
  }

  // ---------- Scroll-reveal ----------
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
      );
      revealEls.forEach(function (el) { observer.observe(el); });
    }
  }

  // ---------- Lightweight parallax ----------
  var parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length && !prefersReducedMotion) {
    var ticking = false;

    function updateParallax() {
      var vh = window.innerHeight;
      parallaxEls.forEach(function (el) {
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.15;
        var rect = el.getBoundingClientRect();
        var centerOffset = rect.top + rect.height / 2 - vh / 2;
        el.style.transform = 'translateY(' + (-(centerOffset * speed)).toFixed(1) + 'px)';
      });
      ticking = false;
    }

    window.addEventListener(
      'scroll',
      function () {
        if (!ticking) {
          window.requestAnimationFrame(updateParallax);
          ticking = true;
        }
      },
      { passive: true }
    );
    window.addEventListener('resize', updateParallax);
    updateParallax();
  }
})();
