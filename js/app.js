/*
  Renders the page from window.SITE_CONFIG (config.js) and runs the bag.
  Content edits belong in config.js — this file should rarely need changes.
*/
(function () {
  'use strict';

  var C = window.SITE_CONFIG;
  if (!C) {
    showConfigError();
    return;
  }

  var STORAGE_KEY = 'theveera-bag-v1';
  var products = C.products || [];
  var productById = {};
  products.forEach(function (p) { productById[p.id] = p; });

  var money = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: (C.business && C.business.currency) || 'INR',
    maximumFractionDigits: 0,
  });

  var state = {
    category: readCategoryFromUrl(),
    showAll: new URLSearchParams(location.search).get('view') === 'all',
    bag: loadBag(),
  };

  // ---------- helpers ----------

  function get(path) {
    return path.split('.').reduce(function (obj, key) {
      return obj == null ? undefined : obj[key];
    }, C);
  }

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function fromTemplate(id) {
    return document.getElementById(id).content.firstElementChild.cloneNode(true);
  }

  function priceText(p, qty) {
    var amount = money.format(p.price * (qty || 1));
    return p.priceFrom ? 'From ' + amount : amount;
  }

  function phoneDigits() {
    return String(get('business.phone') || '').replace(/\D/g, '');
  }

  function whatsappUrl(message) {
    var url = 'https://wa.me/' + phoneDigits();
    return message ? url + '?text=' + encodeURIComponent(message) : url;
  }

  // Google Drive share links ("…/file/d/<id>/view?usp=sharing") open a viewer page,
  // not the image, so turn them into Google's direct image address, asking for
  // WebP ("-rw") at the width the page needs ("=w800"). Other links pass through.
  function imageUrl(link, width) {
    link = String(link || '').trim();
    if (!/^https?:\/\/(drive|docs)\.google\.com\//.test(link)) return link;
    var m = link.match(/\/d\/([\w-]{10,})/) || link.match(/[?&]id=([\w-]{10,})/);
    if (!m) return link;
    return 'https://lh3.googleusercontent.com/d/' + m[1] + '=' + (width ? 'w' + width : 's0') + '-rw';
  }

  function setImageSrc(img, link, width) {
    var url = imageUrl(link, width);
    // Google's image servers can refuse requests that carry another site's address.
    if (/googleusercontent\.com\//.test(url)) img.referrerPolicy = 'no-referrer';
    img.src = url;
  }

  // Shows the photo, or a labelled placeholder box when there is no photo
  // (or the link is broken).
  function renderMedia(container, src, alt, opts) {
    opts = opts || {};
    var existing = container.querySelector('img, .placeholder');
    if (existing) existing.remove();

    var node;
    if (src) {
      node = document.createElement('img');
      node.alt = alt || '';
      node.width = opts.width || 800;
      node.height = opts.height || 1000;
      node.decoding = 'async';
      if (opts.eager) node.setAttribute('fetchpriority', 'high');
      else node.loading = 'lazy';
      node.addEventListener('error', function () {
        renderMedia(container, '', alt, opts);
      }, { once: true });
      setImageSrc(node, src, opts.fetchWidth || node.width);
    } else {
      node = document.createElement('div');
      node.className = 'placeholder';
      node.setAttribute('role', 'img');
      node.setAttribute('aria-label', alt || '');
      node.textContent = (alt || '').toLowerCase();
    }
    container.insertBefore(node, container.firstChild);
  }

  // ---------- static text, links, images ----------

  function renderStatic() {
    document.title = get('seo.title') || document.title;
    var desc = $('meta[name="description"]');
    if (desc && get('seo.description')) desc.setAttribute('content', get('seo.description'));

    $all('[data-show]').forEach(function (el) {
      var v = get(el.getAttribute('data-show'));
      if (!v) el.remove();
    });

    $all('[data-text]').forEach(function (el) {
      var v = get(el.getAttribute('data-text'));
      if (v == null || v === '') el.hidden = true;
      else el.textContent = v;
    });

    $all('img[data-src]').forEach(function (img) {
      var link = get(img.getAttribute('data-src'));
      if (!link) { img.remove(); return; }
      img.alt = get(img.getAttribute('data-alt')) || '';
      setImageSrc(img, link);
    });

    // Browser-tab and home-screen icon.
    var icon = get('business.favicon') || get('business.logo');
    if (icon) {
      ['icon', 'apple-touch-icon'].forEach(function (rel) {
        var link = document.createElement('link');
        link.rel = rel;
        link.href = imageUrl(icon).replace(/-rw$/, ''); // keep the original PNG: safest for tab icons
        link.referrerPolicy = 'no-referrer';
        document.head.appendChild(link);
      });
    }

    $all('[data-whatsapp]').forEach(function (a) {
      var key = a.getAttribute('data-whatsapp');
      a.href = whatsappUrl(key ? get(key) : '');
      a.target = '_blank';
      a.rel = 'noopener';
    });

    var email = get('business.email');
    $all('a[data-email]').forEach(function (a) {
      if (!email) { a.closest('li') ? a.closest('li').remove() : a.remove(); return; }
      a.href = 'mailto:' + email;
      a.textContent = email;
    });

    var phone = get('business.phone');
    $all('a[data-phone]').forEach(function (a) {
      if (!phone) { a.closest('li').remove(); return; }
      a.href = 'tel:+' + phoneDigits();
      a.textContent = phone;
    });

    $all('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

    var newsletter = $('.newsletter');
    if (newsletter) {
      newsletter.action = get('newsletter.formAction');
      $('#newsletter-email').placeholder = get('newsletter.placeholder') || '';
    }

    var t = C.testimonial;
    if (t && $('.testimonial')) {
      var stars = Math.max(0, Math.min(5, t.stars || 0));
      var starsEl = $('.testimonial .stars');
      starsEl.textContent = '★★★★★'.slice(0, stars);
      starsEl.setAttribute('aria-label', stars + ' out of 5 stars');
      if (!stars) starsEl.remove();
      $('.testimonial .quote').textContent = '“' + t.quote + '”';
    }

    if (C.custom) renderMedia($('[data-media="custom"]'), C.custom.image, C.custom.imageAlt, { width: 1200, height: 1000, fetchWidth: 1600 });
    if (C.about && $('[data-media="about"]')) renderMedia($('[data-media="about"]'), C.about.image, C.about.imageAlt, { width: 1000, height: 1000, fetchWidth: 1200 });
  }

  // ---------- lists ----------

  function linkItem(item, className) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = item.href;
    a.textContent = item.label;
    if (className) a.className = className;
    if (/^https?:/.test(item.href)) { a.target = '_blank'; a.rel = 'noopener'; }
    li.appendChild(a);
    return li;
  }

  function renderLists() {
    var menu = C.menu || [];
    var menuList = $('[data-list="menu"]');
    var sheetList = $('[data-list="menuSheet"]');
    menu.forEach(function (item) {
      menuList.appendChild(linkItem(item));
      var li = linkItem(item);
      li.firstChild.setAttribute('data-close', '');
      sheetList.appendChild(li);
    });
    // The mobile menu also links to the questions and contact sections.
    [{ label: get('faq.title'), href: '#faq' }, { label: get('footer.contactTitle'), href: '#contact' }]
      .forEach(function (item) {
        if (!item.label) return;
        var li = linkItem(item);
        li.firstChild.setAttribute('data-close', '');
        sheetList.appendChild(li);
      });

    var footerList = $('[data-list="footerLinks"]');
    ((C.footer && C.footer.shopLinks) || []).forEach(function (item) {
      footerList.appendChild(linkItem(item));
    });

    var socialList = $('[data-list="social"]');
    ((C.footer && C.footer.social) || []).forEach(function (item) {
      if (item.href) socialList.appendChild(linkItem(item));
    });
    if (!socialList.children.length) socialList.remove();

    var hero = $('[data-list="heroProducts"]');
    ((C.hero && C.hero.photos) || []).forEach(function (photo) {
      var li = fromTemplate('tpl-hero-product');
      var a = $('.hero-product-link', li);
      a.href = photo.link || '#shop';
      renderMedia($('.media', li), photo.image, photo.imageAlt, { eager: true });
      $('.name', li).textContent = photo.caption || '';
      $('.note', li).textContent = photo.note || '';
      hero.appendChild(li);
    });
    if (!hero.children.length) hero.remove();

    var steps = $('[data-list="steps"]');
    ((C.custom && C.custom.steps) || []).forEach(function (text) {
      var li = document.createElement('li');
      li.textContent = text;
      steps.appendChild(li);
    });

    var faqList = $('[data-list="faq"]');
    var faqItems = (C.faq && C.faq.items) || [];
    if (!faqItems.length) $('#faq').remove();
    faqItems.forEach(function (item, i) {
      var d = fromTemplate('tpl-faq');
      if (i === 0) d.open = true;
      $('.faq-q', d).textContent = item.question;
      $('.faq-a', d).textContent = item.answer;
      faqList.appendChild(d);
    });

    renderChips();
    renderProducts();
  }

  // ---------- shop: category filter + product grid ----------

  function readCategoryFromUrl() {
    var params = new URLSearchParams(location.search);
    var id = params.get('category');
    var known = (C.categories || []).some(function (c) { return c.id === id; });
    return known ? id : 'all';
  }

  // Filters and "View all" live in the URL so a shared or refreshed link keeps them.
  function writeShopStateToUrl() {
    var url = new URL(location.href);
    if (state.category === 'all') url.searchParams.delete('category');
    else url.searchParams.set('category', state.category);
    if (state.showAll) url.searchParams.set('view', 'all');
    else url.searchParams.delete('view');
    history.replaceState(null, '', url);
  }

  function renderChips() {
    var wrap = $('[data-list="categories"]');
    wrap.textContent = '';
    var all = [{ id: 'all', label: get('shop.allLabel') || 'All' }].concat(C.categories || []);
    all.forEach(function (c) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip';
      b.textContent = c.label;
      b.setAttribute('aria-pressed', String(state.category === c.id));
      b.addEventListener('click', function () {
        state.category = c.id;
        state.showAll = false;
        writeShopStateToUrl();
        renderChips();
        renderProducts();
      });
      wrap.appendChild(b);
    });
  }

  function renderProducts() {
    var grid = $('[data-list="products"]');
    grid.textContent = '';
    var label = get('shop.addToBagLabel') || 'Add to cart';
    var limit = get('shop.initialCount') || 8;

    var list = products.filter(function (p) {
      return state.category === 'all' || (p.categories || []).indexOf(state.category) !== -1;
    });
    var visible = state.showAll ? list : list.slice(0, limit);

    visible.forEach(function (p) {
      var li = fromTemplate('tpl-product');
      li.id = 'product-' + p.id;
      renderMedia($('.media', li), p.image, p.imageAlt);
      var add = $('.add-btn', li);
      add.textContent = label;
      add.setAttribute('aria-label', label + ': ' + p.name);
      add.addEventListener('click', function () { addToBag(p, add); });
      $('.product-name', li).textContent = p.name;
      $('.product-meta', li).textContent = priceText(p) + (p.note ? ' · ' + p.note : '');
      grid.appendChild(li);
    });

    $('.empty-state').hidden = list.length > 0;
    var viewAll = $('.view-all');
    viewAll.hidden = state.showAll || list.length <= limit;
  }

  // ---------- bag ----------

  function loadBag() {
    try {
      var raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      var clean = {};
      Object.keys(raw).forEach(function (id) {
        var qty = parseInt(raw[id], 10);
        if (productById[id] && qty > 0) clean[id] = Math.min(qty, 99);
      });
      return clean;
    } catch (e) {
      return {};
    }
  }

  function saveBag() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.bag)); } catch (e) { /* private mode */ }
  }

  function bagCount() {
    return Object.keys(state.bag).reduce(function (n, id) { return n + state.bag[id]; }, 0);
  }

  function setQty(id, qty) {
    if (qty > 0) state.bag[id] = Math.min(qty, 99);
    else delete state.bag[id];
    saveBag();
    renderBag();
  }

  function addToBag(p, button) {
    setQty(p.id, (state.bag[p.id] || 0) + 1);
    toast(p.name + ' ' + (get('bag.addedMessage') || 'added to your bag'));
    if (button) {
      button.classList.add('is-added');
      clearTimeout(button._t);
      button._t = setTimeout(function () { button.classList.remove('is-added'); }, 1200);
    }
  }

  function renderBag() {
    var count = bagCount();
    $all('[data-bag-count]').forEach(function (el) { el.textContent = count; });
    $all('.bag-badge').forEach(function (el) { el.hidden = count === 0; });
    $all('.bag-btn').forEach(function (b) {
      b.setAttribute('aria-label', 'Bag, ' + count + (count === 1 ? ' item' : ' items'));
    });

    var list = $('[data-list="bag"]');
    list.textContent = '';
    var ids = Object.keys(state.bag);
    var total = 0;
    var anyFrom = false;
    var lines = [get('bag.whatsappIntro') || 'Hi! I’d like to order:'];

    ids.forEach(function (id) {
      var p = productById[id];
      var qty = state.bag[id];
      total += p.price * qty;
      anyFrom = anyFrom || p.priceFrom;
      lines.push('• ' + qty + ' × ' + p.name + ' (' + priceText(p).toLowerCase() + ' each)');

      var li = fromTemplate('tpl-bag-item');
      renderMedia($('.media', li), p.image, p.imageAlt, { width: 160, height: 200 });
      $('.bag-item-name', li).textContent = p.name;
      $('.bag-item-price', li).textContent = priceText(p, qty) + (p.note ? ' · ' + p.note : '');
      $('.step-qty', li).textContent = qty;
      $('.step-qty', li).setAttribute('aria-label', 'Quantity ' + qty);
      var minus = $('.step-minus', li);
      minus.textContent = qty === 1 ? 'Remove' : '−';
      minus.classList.toggle('is-remove', qty === 1);
      minus.setAttribute('aria-label', qty === 1 ? 'Remove ' + p.name : 'One less ' + p.name);
      $('.step-plus', li).setAttribute('aria-label', 'One more ' + p.name);
      minus.addEventListener('click', function () {
        if (qty === 1) {
          setQty(id, 0);
          toast(p.name + ' removed', 'Undo', function () {
            setQty(id, 1);
            refocus(id, '.step-minus');
          });
          var next = $('.bag-items .step-minus') || $('#bag-dialog [data-close]');
          next.focus();
        } else {
          setQty(id, qty - 1);
          refocus(id, '.step-minus');
        }
      });
      $('.step-plus', li).addEventListener('click', function () {
        setQty(id, qty + 1);
        refocus(id, '.step-plus');
      });
      li.setAttribute('data-id', id);
      list.appendChild(li);
    });

    lines.push('');
    lines.push('Estimated total: ' + (anyFrom ? 'from ' : '') + money.format(total));
    if (get('bag.whatsappOutro')) lines.push(get('bag.whatsappOutro'));

    var empty = ids.length === 0;
    $('.bag-empty').hidden = !empty;
    $('.bag-foot').hidden = empty;
    $('.bag-total-value').textContent = (anyFrom ? 'From ' : '') + money.format(total);
    $('.bag-checkout').href = whatsappUrl(lines.join('\n'));
  }

  // Re-rendering replaces the buttons, so move focus to the new copy.
  function refocus(id, sel) {
    var el = $('.bag-item[data-id="' + id + '"] ' + sel);
    if (el) el.focus();
  }

  // ---------- toast ----------

  // A modal bag covers the page, so messages show inside it while it is open.
  var toastTimer;
  function activeToast() {
    var bag = $('#bag-dialog');
    return bag.open ? $('.toast', bag) : $('body > .toast');
  }

  function toast(message, actionLabel, action) {
    hideToast();
    var el = activeToast();
    el.textContent = '';
    var span = document.createElement('span');
    span.textContent = message;
    el.appendChild(span);
    if (actionLabel) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = actionLabel;
      b.addEventListener('click', function () { action(); hideToast(); });
      el.appendChild(b);
    }
    el.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, actionLabel ? 6000 : 2600);
  }

  function hideToast() {
    $all('.toast').forEach(function (el) { el.classList.remove('is-visible'); });
  }

  // ---------- dialogs (menu + bag) ----------

  function setupDialogs() {
    $all('[data-open]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var d = document.getElementById(btn.getAttribute('data-open'));
        if (d && !d.open) d.showModal();
      });
    });

    $all('dialog').forEach(function (d) {
      // Close when tapping the dimmed area outside the panel.
      d.addEventListener('click', function (e) {
        if (e.target === d) d.close();
      });
      d.addEventListener('click', function (e) {
        var closer = e.target.closest('[data-close]');
        if (!closer) return;
        var href = closer.getAttribute('href');
        d.close();
        if (href && href.charAt(0) === '#') {
          e.preventDefault();
          goTo(href);
        }
      });
    });
  }

  function goTo(hash) {
    var target = document.querySelector(hash);
    if (!target) return;
    history.pushState(null, '', hash);
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }

  function setupShop() {
    $('.view-all').addEventListener('click', function () {
      state.showAll = true;
      writeShopStateToUrl();
      renderProducts();
    });
  }

  // ---------- config error message (for whoever edits config.js) ----------

  function showConfigError() {
    var err = window.__configError;
    var box = document.createElement('div');
    box.className = 'config-error';
    box.setAttribute('role', 'alert');
    var h = document.createElement('strong');
    h.textContent = 'The website settings file (config.js) has a typing mistake.';
    var p = document.createElement('p');
    p.textContent = err
      ? 'Look at line ' + err.line + ' of config.js and the few lines above it. A comma, quote mark or bracket is probably missing. (' + err.message + ')'
      : 'Check that your last change did not remove a comma, quote mark or bracket, and that config.js is in the same folder as index.html.';
    box.appendChild(h);
    box.appendChild(p);
    document.body.prepend(box);
  }

  // ---------- start ----------

  renderStatic();
  renderLists();
  renderBag();
  setupDialogs();
  setupShop();

  // Desktop: the mobile menu is hidden, so close it if the window grows.
  var wide = window.matchMedia('(min-width: 900px)');
  wide.addEventListener('change', function (e) {
    if (e.matches && $('#menu-dialog').open) $('#menu-dialog').close();
  });

  // Keep the bag in sync across open tabs.
  window.addEventListener('storage', function (e) {
    if (e.key === STORAGE_KEY) { state.bag = loadBag(); renderBag(); }
  });

  document.documentElement.classList.add('is-ready');
})();
