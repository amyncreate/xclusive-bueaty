/* ==========================================================================
   XCLUSIVE BEAUTY SALOON & SPA — Main Script
   ========================================================================== */

(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  /* -------------------- Config -------------------- */
  var WHATSAPP_NUMBER = '2349039092831'; // TODO: replace with real WhatsApp number (international format, no + or 0 leading)

  function waLink(message) {
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
  }

  /* -------------------- Header scroll state -------------------- */
  var header = document.querySelector('.site-header');

  function handleHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 30) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  handleHeaderScroll();
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });

  /* -------------------- Mobile menu -------------------- */
  var navToggle = document.querySelector('.nav-toggle');
  var mobileMenu = document.querySelector('.mobile-menu');
  var menuBackdrop = document.querySelector('.menu-backdrop');

  function openMenu() {
    navToggle.classList.add('is-active');
    mobileMenu.classList.add('is-open');
    menuBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    navToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    navToggle.classList.remove('is-active');
    mobileMenu.classList.remove('is-open');
    menuBackdrop.classList.remove('is-open');
    document.body.style.overflow = '';
    navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && mobileMenu && menuBackdrop) {
    navToggle.addEventListener('click', function () {
      if (mobileMenu.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    menuBackdrop.addEventListener('click', closeMenu);

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* -------------------- Scroll reveal -------------------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* -------------------- WhatsApp dynamic links -------------------- */
  // Generic booking buttons
  document.querySelectorAll('[data-wa-book]').forEach(function (btn) {
    var service = btn.getAttribute('data-wa-book') || '';
    var message = service
      ? 'Hello Xclusive Beauty Saloon & Spa, I would like to book an appointment for: ' + service
      : 'Hello Xclusive Beauty Saloon & Spa, I would like to book an appointment.';
    btn.setAttribute('href', waLink(message));
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
  });

  // Product inquiry buttons
  document.querySelectorAll('[data-wa-product]').forEach(function (btn) {
    var product = btn.getAttribute('data-wa-product') || '';
    var price = btn.getAttribute('data-wa-price') || '';
    var message = 'Hello Xclusive Beauty Saloon & Spa, I am interested in: ' + product + (price ? ' (' + price + ')' : '') + '. Is it available?';
    btn.setAttribute('href', waLink(message));
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
  });

  // General floating + contact-page WhatsApp buttons
  document.querySelectorAll('[data-wa-general]').forEach(function (btn) {
    btn.setAttribute('href', waLink('Hello Xclusive Beauty Saloon & Spa, I have an inquiry.'));
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
  });

  /* -------------------- Testimonial carousel dots -------------------- */
  var track = document.querySelector('.testimonial-track');
  var dotsWrap = document.querySelector('.track-dots');

  if (track && dotsWrap) {
    var cards = track.querySelectorAll('.testimonial-card');
    dotsWrap.innerHTML = '';

    cards.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', function () {
        var card = cards[i];
        track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
      });
      dotsWrap.appendChild(dot);
    });

    var dotButtons = dotsWrap.querySelectorAll('button');

    function updateActiveDot() {
      var scrollLeft = track.scrollLeft;
      var closestIndex = 0;
      var closestDist = Infinity;
      cards.forEach(function (card, i) {
        var dist = Math.abs((card.offsetLeft - track.offsetLeft) - scrollLeft);
        if (dist < closestDist) { closestDist = dist; closestIndex = i; }
      });
      dotButtons.forEach(function (d, i) {
        d.classList.toggle('is-active', i === closestIndex);
      });
    }

    var scrollTimeout;
    track.addEventListener('scroll', function () {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateActiveDot, 100);
    }, { passive: true });
  }

  /* -------------------- Gallery filter tabs -------------------- */
  var filterTabs = document.querySelectorAll('.filter-tab');
  var galleryItems = document.querySelectorAll('.gallery-item');

  if (filterTabs.length && galleryItems.length) {
    filterTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        filterTabs.forEach(function (t) { t.classList.remove('is-active'); });
        tab.classList.add('is-active');
        var filter = tab.getAttribute('data-filter');

        galleryItems.forEach(function (item) {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.classList.remove('is-hidden');
          } else {
            item.classList.add('is-hidden');
          }
        });
      });
    });
  }

  /* -------------------- Lightbox -------------------- */
  var lightbox = document.querySelector('.lightbox');

  if (lightbox) {
    var lbImg = lightbox.querySelector('img');
    var lbPlaceholder = lightbox.querySelector('.lightbox-placeholder');
    var lbCaption = lightbox.querySelector('.lightbox-caption');
    var lbClose = lightbox.querySelector('.lightbox-close');
    var lbPrev = lightbox.querySelector('.lightbox-nav.prev');
    var lbNext = lightbox.querySelector('.lightbox-nav.next');
    var visibleItems = [];
    var currentIndex = 0;

    function getVisibleGalleryItems() {
      return Array.prototype.filter.call(galleryItems, function (item) {
        return !item.classList.contains('is-hidden');
      });
    }

    function showLightbox(index) {
      visibleItems = getVisibleGalleryItems();
      if (!visibleItems.length) return;
      currentIndex = (index + visibleItems.length) % visibleItems.length;
      var item = visibleItems[currentIndex];
      var img = item.querySelector('img');
      var caption = item.getAttribute('data-caption') || (img ? img.alt : '');

      if (img) {
        // Real photo: show it in the lightbox image element
        lbImg.style.display = '';
        lbImg.setAttribute('src', img.getAttribute('src'));
        lbImg.setAttribute('alt', img.alt || '');
        if (lbPlaceholder) lbPlaceholder.style.display = 'none';
      } else {
        // Placeholder swatch: mirror its background into the lightbox placeholder box
        var swatch = item.querySelector('div:not(.gallery-overlay)');
        lbImg.style.display = 'none';
        if (lbPlaceholder && swatch) {
          lbPlaceholder.style.display = '';
          lbPlaceholder.style.background = swatch.style.background || swatch.style.backgroundColor || '';
        }
      }

      lbCaption.textContent = caption;
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function hideLightbox() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    galleryItems.forEach(function (item, i) {
      item.addEventListener('click', function () {
        var allVisible = getVisibleGalleryItems();
        var visIndex = allVisible.indexOf(item);
        showLightbox(visIndex >= 0 ? visIndex : 0);
      });
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          item.click();
        }
      });
    });

    if (lbClose) lbClose.addEventListener('click', hideLightbox);
    if (lbPrev) lbPrev.addEventListener('click', function () { showLightbox(currentIndex - 1); });
    if (lbNext) lbNext.addEventListener('click', function () { showLightbox(currentIndex + 1); });

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) hideLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') hideLightbox();
      if (e.key === 'ArrowLeft') showLightbox(currentIndex - 1);
      if (e.key === 'ArrowRight') showLightbox(currentIndex + 1);
    });
  }

  /* -------------------- Shop product filter -------------------- */
  var productFilterTabs = document.querySelectorAll('.product-filter-bar .filter-tab');
  var productCards = document.querySelectorAll('.product-card');

  if (productFilterTabs.length && productCards.length) {
    productFilterTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        productFilterTabs.forEach(function (t) { t.classList.remove('is-active'); });
        tab.classList.add('is-active');
        var filter = tab.getAttribute('data-filter');

        productCards.forEach(function (card) {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* -------------------- Contact form (frontend only, simulated) -------------------- */
  var contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = contactForm.querySelector('#name').value.trim();
      var phone = contactForm.querySelector('#phone').value.trim();
      var message = contactForm.querySelector('#message').value.trim();

      if (!name || !phone || !message) return;

      var successBox = document.querySelector('.form-success');
      if (successBox) {
        successBox.classList.add('is-shown');
        successBox.setAttribute('role', 'status');
      }

      // Also offer a WhatsApp continuation of the enquiry
      var waMsg = 'Hello Xclusive Beauty Saloon & Spa,\nName: ' + name + '\nPhone: ' + phone + '\nMessage: ' + message;
      var waBtn = document.querySelector('.form-wa-continue');
      if (waBtn) {
        waBtn.setAttribute('href', waLink(waMsg));
        waBtn.style.display = 'inline-flex';
      }

      contactForm.reset();
    });
  }

  /* -------------------- Active nav link highlight -------------------- */
  (function highlightActiveNav() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a, .mobile-menu a').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  })();

  /* -------------------- Current year in footer -------------------- */
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
