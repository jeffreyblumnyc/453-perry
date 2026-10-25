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
  function itemHtml(it) {
    return '<figure style="margin: 0;' + (it.tall ? ' grid-row: span 2;' : '') + ' position: relative; border: 1px solid #1D1E1C; overflow: hidden; background: #D8D9D3;">' +
      '<img src="' + esc(src(it.src)) + '" alt="' + esc(it.alt) + '" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block;">' +
      '<figcaption style="position: absolute; left: 0; bottom: 0; padding: 5px 8px; background: #EDEEE9; border-top: 1px solid #1D1E1C; border-right: 1px solid #1D1E1C; font-family: \'IBM Plex Mono\', monospace; font-size: 11px; letter-spacing: 0.06em;">' + esc(it.ref) + '</figcaption></figure>';
  }
  function groupHtml(g) {
    return '<article style="display: flex; flex-direction: column; gap: 20px;">' +
      '<header style="display: flex; flex-wrap: wrap; gap: 8px 32px; align-items: baseline; justify-content: space-between; border-bottom: 1px solid #1D1E1C; padding-bottom: 14px;">' +
      '<div style="display: flex; gap: 16px; align-items: baseline; flex-wrap: wrap;">' +
      '<span style="font-family: \'IBM Plex Mono\', monospace; font-size: 12px; letter-spacing: 0.08em; color: ' + ACCENT + ';">' + esc(g.code) + '</span>' +
      '<h3 style="margin: 0; font-size: 30px; font-weight: 800; letter-spacing: -0.02em;">' + esc(g.label) + '</h3>' +
      '<span style="font-family: \'IBM Plex Mono\', monospace; font-size: 12px; color: #5A5C57;">' + esc(g.countLabel) + '</span></div>' +
      '<p style="margin: 0; max-width: 560px; font-size: 15px; line-height: 1.5; color: #3B3D39;">' + esc(g.desc) + '</p></header>' +
      '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); grid-auto-rows: 220px; grid-auto-flow: dense; gap: 12px;">' +
      g.items.map(itemHtml).join('') + '</div></article>';
  }
  var lastTabs = [];
  function renderMoodboard() {
    var v = comp.renderVals();
    lastTabs = v.tabs;
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
