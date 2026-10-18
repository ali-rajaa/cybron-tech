/* Cybron Technologies: the page's behaviour. Header state, the phone
   menu sheet, the current-section highlight in the header, and
   reveal-on-scroll. Each block checks for its own elements, and the page
   works fully without this file (links are plain anchors). Loaded with
   defer from _layouts/default.html. */
(function () {
  'use strict';

  /* iOS Safari only applies :active while a touch listener exists, so
     without this the press feedback never shows on touch. */
  document.addEventListener('touchstart', function () {}, { passive: true });

  var root = document.documentElement;
  var header = document.getElementById('site-header');

  /* ---- Header: hairline once content is under it ---- */
  var sentinel = document.getElementById('scroll-sentinel');
  if (header && sentinel && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      header.classList.toggle('is-scrolled', !entries[0].isIntersecting);
    }).observe(sentinel);
  }

  /* ---- Phone menu sheet ----
     The menu button opens the sheet; a link, Escape, a tap on the dimmed
     page or growing past the breakpoint closes it. Focus returns to the
     button when closed from the keyboard. */
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');
  if (header && toggle && nav) {
    var wide = window.matchMedia('(min-width: 860px)');
    var isOpen = function () { return header.classList.contains('nav-open'); };
    var setOpen = function (open, returnFocus) {
      header.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (!open && returnFocus) toggle.focus();
    };
    toggle.addEventListener('click', function () { setOpen(!isOpen()); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('click', function (e) {
      if (isOpen() && !header.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) setOpen(false, true);
    });
    header.addEventListener('focusout', function (e) {
      if (isOpen() && e.relatedTarget && !header.contains(e.relatedTarget)) setOpen(false);
    });
    var onWide = function () { if (wide.matches) setOpen(false); };
    if (wide.addEventListener) wide.addEventListener('change', onWide);
    else if (wide.addListener) wide.addListener(onWide);
  }

  /* ---- Current section in the header ----
     The link for the section crossing the upper third of the screen gets
     aria-current="true" (and the sky-blue bar). None in the hero. */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-link[href*="#"]'));
  if (links.length && 'IntersectionObserver' in window) {
    var targets = links.map(function (a) {
      return { link: a, el: document.getElementById(a.hash.slice(1)) };
    }).filter(function (t) { return t.el; });
    var mark = function () {
      var line = window.innerHeight * 0.35;
      var current = null;
      targets.forEach(function (t) { if (t.el.getBoundingClientRect().top <= line) current = t; });
      if (current && current.el.getBoundingClientRect().bottom < line * 0.5) current = null;
      targets.forEach(function (t) {
        if (t === current) t.link.setAttribute('aria-current', 'true');
        else t.link.removeAttribute('aria-current');
      });
    };
    var spy = new IntersectionObserver(mark, { rootMargin: '-35% 0px -60% 0px' });
    targets.forEach(function (t) { spy.observe(t.el); });
    window.addEventListener('scroll', function () { window.requestAnimationFrame(mark); }, { passive: true });
    mark();
  }

  /* ---- Copy the email address (Contact) ----
     Hidden in the markup and shown only where the clipboard can be used,
     so it never appears as a button that does nothing. The status line
     announces the result to screen readers. */
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    if (!navigator.clipboard || !window.isSecureContext) return;
    var label = btn.querySelector('.copy-text');
    var status = document.getElementById(btn.getAttribute('aria-describedby'));
    var timer;
    btn.hidden = false;
    btn.addEventListener('click', function () {
      navigator.clipboard.writeText(btn.getAttribute('data-copy')).then(function () {
        if (label) label.textContent = 'Copied';
        if (status) status.textContent = 'Email address copied.';
        clearTimeout(timer);
        timer = setTimeout(function () {
          if (label) label.textContent = 'Copy address';
          if (status) status.textContent = '';
        }, 2500);
      }, function () {
        if (status) status.textContent = 'Couldn\'t copy. Select the address above instead.';
      });
    });
  });

  /* ---- Reveal on scroll ----
     Content is hidden only after this line runs (.reveal-ready), and only
     when IntersectionObserver exists, so it can never stay hidden. */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    root.classList.add('reveal-ready');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }
})();
