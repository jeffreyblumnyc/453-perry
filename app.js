/* 453 Perry Road — static runtime.
   component.js holds the page data (exported from the design canvas);
   this file renders the moodboard filter and the before/after sliders. */
(function () {
  var MAP = window.__IMAGES__ || {};
  function src(u) {
    var id = String(u).split('/_blob/')[1];
    return MAP[id] || u;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var comp = new window.Component({});
  var ACCENT = '#8A4E1F';

  /* ---------- moodboard ---------- */
  function tabHtml(t, i) {
    var on = t.on;
    return '<button class="tab" type="button" data-tab="' + i + '" aria-pressed="' + (on ? 'true' : 'false') + '" style="min-height: 44px; padding: 0 16px; border: 1.5px solid #1D1E1C; background: ' + (on ? '#1D1E1C' : 'transparent') + '; color: ' + (on ? '#EDEEE9' : '#1D1E1C') + '; font-family: \'IBM Plex Mono\', monospace; font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase;">' +
      esc(t.label) + ' <span style="' + (on ? 'opacity: 0.7;' : 'color: #5A5C57;') + '">' + t.count + '</span></button>';
  }
  function itemHtml(it, ii, gi) {
    return '<figure style="margin: 0;' + (it.tall ? ' grid-row: span 2;' : '') + ' position: relative; border: 1px solid #1D1E1C; overflow: hidden; background: #D8D9D3;">' +
      '<button class="mb-open" type="button" data-g="' + gi + '" data-i="' + ii + '" aria-label="Enlarge ' + esc(it.ref) + '">' +
      '<img src="' + esc(src(it.src)) + '" alt="' + esc(it.alt) + '" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block;"></button>' +
      '<figcaption style="position: absolute; left: 0; bottom: 0; padding: 5px 8px; background: #EDEEE9; border-top: 1px solid #1D1E1C; border-right: 1px solid #1D1E1C; font-family: \'IBM Plex Mono\', monospace; font-size: 11px; letter-spacing: 0.06em; pointer-events: none;">' + esc(it.ref) + '</figcaption></figure>';
  }
  function groupHtml(g, gi) {
    return '<article style="display: flex; flex-direction: column; gap: 20px;">' +
      '<header style="display: flex; flex-wrap: wrap; gap: 8px 32px; align-items: baseline; justify-content: space-between; border-bottom: 1px solid #1D1E1C; padding-bottom: 14px;">' +
      '<div style="display: flex; gap: 16px; align-items: baseline; flex-wrap: wrap;">' +
      '<span style="font-family: \'IBM Plex Mono\', monospace; font-size: 12px; letter-spacing: 0.08em; color: ' + ACCENT + ';">' + esc(g.code) + '</span>' +
      '<h3 style="margin: 0; font-size: 30px; font-weight: 800; letter-spacing: -0.02em;">' + esc(g.label) + '</h3>' +
      '<span style="font-family: \'IBM Plex Mono\', monospace; font-size: 12px; color: #5A5C57;">' + esc(g.countLabel) + '</span></div>' +
      '<p style="margin: 0; max-width: 560px; font-size: 15px; line-height: 1.5; color: #3B3D39;">' + esc(g.desc) + '</p></header>' +
      '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); grid-auto-rows: 220px; grid-auto-flow: dense; gap: 12px;">' +
      g.items.map(function (it, ii) { return itemHtml(it, ii, gi); }).join('') + '</div></article>';
  }
  var lastTabs = [];
  var lastGroups = [];
  function renderMoodboard() {
    var v = comp.renderVals();
    lastTabs = v.tabs;
    lastGroups = v.groups;
    document.getElementById('mb-tabs').innerHTML = v.tabs.map(tabHtml).join('');
    document.getElementById('mb-groups').innerHTML = v.groups.map(groupHtml).join('');
  }
  document.getElementById('mb-tabs').addEventListener('click', function (e) {
    var b = e.target.closest('button[data-tab]');
    if (!b) return;
    var t = lastTabs[Number(b.getAttribute('data-tab'))];
    if (t) t.pick();
  });
  window.__rerender = renderMoodboard;

  /* ---------- lightbox ---------- */
  var css = document.createElement('style');
  css.textContent =
    '.mb-open{all:unset;display:block;width:100%;height:100%;cursor:zoom-in}' +
    '.mb-open:focus-visible{outline:3px solid #8A4E1F;outline-offset:-3px}' +
    '.mb-open img{transition:transform .35s ease}.mb-open:hover img{transform:scale(1.03)}' +
    '#lb{position:fixed;inset:0;z-index:100;background:rgba(20,20,19,.96);color:#EDEEE9;display:grid;grid-template-rows:auto 1fr auto;font-family:"IBM Plex Mono",monospace}' +
    '#lb[hidden]{display:none}' +
    '#lb .lb-top{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:12px 16px 12px 24px;font-size:12px;letter-spacing:.08em;text-transform:uppercase}' +
    '#lb .lb-stage{position:relative;min-height:0;display:flex;align-items:center;justify-content:center;padding:0 88px}' +
    '#lb img{max-width:100%;max-height:100%;object-fit:contain;display:block;box-shadow:0 20px 60px rgba(0,0,0,.5)}' +
    '#lb .lb-cap{padding:14px 24px 22px;text-align:center;font-size:12px;letter-spacing:.06em;color:#C9CAC3}' +
    '#lb button{all:unset;box-sizing:border-box;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;width:52px;height:52px;border-radius:50%;color:#EDEEE9}' +
    '#lb button:hover{background:rgba(237,238,233,.12)}#lb button:focus-visible{outline:2px solid #D9965C;outline-offset:2px}' +
    '#lb .lb-prev,#lb .lb-next{position:absolute;top:50%;margin-top:-26px;border:1px solid rgba(237,238,233,.35)}' +
    '#lb .lb-prev{left:20px}#lb .lb-next{right:20px}' +
    '@media (max-width:760px){#lb .lb-stage{padding:0 8px}#lb .lb-prev,#lb .lb-next{top:auto;bottom:-58px;margin:0}#lb .lb-prev{left:16px}#lb .lb-next{right:16px}#lb .lb-cap{padding:18px 80px 28px}}';
  document.head.appendChild(css);

  var ARROW = function (d) { return '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="' + d + '"></path></svg>'; };
  var lb = document.createElement('div');
  lb.id = 'lb'; lb.hidden = true;
  lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Image viewer');
  lb.innerHTML =
    '<div class="lb-top"><span class="lb-title"></span><button class="lb-close" type="button" aria-label="Close">' + ARROW('M6 6 L18 18 M18 6 L6 18') + '</button></div>' +
    '<div class="lb-stage"><button class="lb-prev" type="button" aria-label="Previous image">' + ARROW('M15 5 L8 12 L15 19') + '</button>' +
    '<img alt=""><button class="lb-next" type="button" aria-label="Next image">' + ARROW('M9 5 L16 12 L9 19') + '</button></div>' +
    '<div class="lb-cap" aria-live="polite"></div>';
  document.body.appendChild(lb);
  var lbImg = lb.querySelector('img'), lbTitle = lb.querySelector('.lb-title'), lbCap = lb.querySelector('.lb-cap');
  var cur = { g: 0, i: 0 }, opener = null;

  function show() {
    var g = lastGroups[cur.g]; if (!g) return;
    var n = g.items.length, it = g.items[cur.i];
    lbImg.src = src(it.src); lbImg.alt = it.alt;
    lbTitle.textContent = g.code + ' · ' + g.label;
    lbCap.textContent = it.ref + '  ·  ' + (cur.i + 1) + ' / ' + n;
    var multi = n > 1;
    lb.querySelector('.lb-prev').style.visibility = multi ? '' : 'hidden';
    lb.querySelector('.lb-next').style.visibility = multi ? '' : 'hidden';
    [1, -1].forEach(function (d) { var nb = g.items[(cur.i + d + n) % n]; if (nb) { var im = new Image(); im.src = src(nb.src); } });
  }
  function step(d) { var n = lastGroups[cur.g].items.length; cur.i = (cur.i + d + n) % n; show(); }
  function open(g, i, el) {
    cur = { g: g, i: i }; opener = el; show();
    lb.hidden = false; document.body.style.overflow = 'hidden';
    lb.querySelector('.lb-close').focus();
  }
  function close() {
    lb.hidden = true; document.body.style.overflow = '';
    if (opener) opener.focus();
  }
  document.getElementById('mb-groups').addEventListener('click', function (e) {
    var b = e.target.closest('.mb-open'); if (!b) return;
    open(Number(b.getAttribute('data-g')), Number(b.getAttribute('data-i')), b);
  });
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', function () { step(-1); });
  lb.querySelector('.lb-next').addEventListener('click', function () { step(1); });
  lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lb-stage')) close(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'Tab') {
      var f = Array.prototype.filter.call(lb.querySelectorAll('button'), function (b) { return b.style.visibility !== 'hidden'; });
      var i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
  });
  var tx = null;
  lb.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (tx === null) return; var dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  });

  /* ---------- before / after ---------- */
  var KNOB_L = '<svg width="22" height="12" viewBox="0 0 22 12" fill="none" stroke="#1D1E1C" stroke-width="1.6" aria-hidden="true"><path d="M6 1 L1 6 L6 11 M16 1 L21 6 L16 11"></path></svg>';
  var KNOB_S = '<svg width="16" height="10" viewBox="0 0 16 10" fill="none" stroke="#1D1E1C" stroke-width="1.6" aria-hidden="true"><path d="M4.5 1 L1 5 L4.5 9 M11.5 1 L15 5 L11.5 9"></path></svg>';
  function sliderInner(p, big) {
    var knob = big ? 44 : 32;
    return '<img src="' + esc(src(p.after)) + '" alt="' + esc(p.afterAlt) + '"' + (big ? '' : ' loading="lazy"') + ' style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; object-fit: cover; display: block;">' +
      '<img class="ba-before" src="' + esc(src(p.before)) + '" alt="' + esc(p.beforeAlt) + '"' + (big ? '' : ' loading="lazy"') + ' style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; object-fit: cover; display: block; clip-path: inset(0 50% 0 0);">' +
      '<div class="ba-line" aria-hidden="true" style="position: absolute; top: 0; bottom: 0; left: 50%; width: 2px; margin-left: -1px; background: #EDEEE9; pointer-events: none;"></div>' +
      '<div class="ba-knob" aria-hidden="true" style="position: absolute; top: 50%; left: 50%; width: ' + knob + 'px; height: ' + knob + 'px; margin: -' + knob / 2 + 'px 0 0 -' + knob / 2 + 'px; border-radius: 50%; background: #EDEEE9; display: flex; align-items: center; justify-content: center; pointer-events: none;">' + (big ? KNOB_L : KNOB_S) + '</div>' +
      '<span style="position: absolute; left: ' + (big ? 14 : 8) + 'px; top: ' + (big ? 14 : 8) + 'px; padding: ' + (big ? '6px 10px' : '4px 7px') + '; background: #1D1E1C; color: #EDEEE9; font-family: \'IBM Plex Mono\', monospace; font-size: ' + (big ? 11 : 10) + 'px; letter-spacing: 0.1em; pointer-events: none;">' + (big ? 'CURRENT · 2026' : 'CURRENT') + '</span>' +
      '<span style="position: absolute; right: ' + (big ? 14 : 8) + 'px; top: ' + (big ? 14 : 8) + 'px; padding: ' + (big ? '6px 10px' : '4px 7px') + '; background: #D9965C; color: #1D1E1C; font-family: \'IBM Plex Mono\', monospace; font-size: ' + (big ? 11 : 10) + 'px; letter-spacing: 0.1em; pointer-events: none;">' + 'PROPOSED' + '</span>' +
      (big ? '' : '<figcaption style="position: absolute; left: 0; bottom: 0; padding: 5px 8px; background: #EDEEE9; color: #1D1E1C; font-family: \'IBM Plex Mono\', monospace; font-size: 11px; letter-spacing: 0.04em; pointer-events: none;">' + esc(p.caption) + '</figcaption>') +
      '<input class="ba-range" type="range" min="0" max="100" value="50" aria-label="' + esc(p.sliderLabel) + '" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; margin: 0; opacity: 0; cursor: ew-resize;">';
  }
  function renderBeforeAfter() {
    var v = comp.renderVals();
    document.getElementById('ba-feat').innerHTML =
      '<figure style="margin: 0 0 48px; display: flex; flex-direction: column; gap: 10px;">' +
      '<div class="ba" style="position: relative; width: 100%; height: clamp(320px, 50vw, 640px); overflow: hidden; border: 1.5px solid #EDEEE9; background: #2A2B29;">' + sliderInner(v.feat, true) + '</div>' +
      '<figcaption style="display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; font-family: \'IBM Plex Mono\', monospace; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: #A9AAA3;"><span>Fig. 04 — Garden gable · IMG_2839 → A-103.11</span><span>Vinyl lap siding → charcoal board &amp; batten, full-height glazing</span></figcaption></figure>';
    document.getElementById('ba-grid').innerHTML = v.pairs.map(function (p) {
      return '<figure class="ba" style="margin: 0; grid-row: ' + p.rows + '; position: relative; overflow: hidden; border: 1px solid #EDEEE9; background: #2A2B29;">' + sliderInner(p, false) + '</figure>';
    }).join('');
  }
  document.addEventListener('input', function (e) {
    if (!e.target.classList || !e.target.classList.contains('ba-range')) return;
    var box = e.target.closest('.ba');
    var pos = Number(e.target.value);
    box.querySelector('.ba-before').style.clipPath = 'inset(0 ' + (100 - pos) + '% 0 0)';
    box.querySelector('.ba-line').style.left = pos + '%';
    box.querySelector('.ba-knob').style.left = pos + '%';
  });

  renderMoodboard();
  renderBeforeAfter();
})();
