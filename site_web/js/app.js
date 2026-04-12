// ═══════════════════════════════════════
//  app.js — Renders the learning roadmap
//  No need to touch this when adding modules.
//  Just create a new js/modules/moduleN.js file.
// ═══════════════════════════════════════

(function () {
  const modules = window.MODULES || [];
  const roadmap = document.getElementById('roadmap');
  const strip = document.getElementById('progressStrip');
  let qNum = 0;

  modules.forEach(function (mod) {
    // Progress segment
    var seg = document.createElement('div');
    seg.className = 'seg' + (mod.status === 'completed' ? ' done' : mod.status === 'active' ? ' active' : '');
    strip.appendChild(seg);

    // Module section
    var section = document.createElement('div');
    section.className = 'module ' + mod.status;
    section.id = mod.id;

    section.innerHTML =
      '<div class="module-dot"></div>' +
      '<div class="module-number">' + mod.number + '</div>' +
      '<h2 class="module-title">' + mod.title + '</h2>';

    mod.questions.forEach(function (item) {
      qNum++;

      if (item.a) {
        // Answered Q&A card
        var card = document.createElement('div');
        card.className = 'qa';
        card.innerHTML =
          '<div class="qa-q">' +
            '<div class="q-num">' + qNum + '</div>' +
            '<div class="q-label">' + item.q + '</div>' +
            '<svg class="q-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>' +
          '</div>' +
          '<div class="qa-a"><div class="qa-a-inner"><div class="qa-a-content">' + item.a + '</div></div></div>';

        card.querySelector('.qa-q').addEventListener('click', function () {
          card.classList.toggle('open');
        });

        section.appendChild(card);
      } else {
        // Locked / upcoming card
        var lk = document.createElement('div');
        lk.className = 'locked-card';
        var icon = mod.status === 'active' ? '✏️' : '🔒';
        var badge = mod.status === 'active' ? 'En cours' : 'À venir';
        lk.innerHTML =
          '<div class="locked-icon">' + icon + '</div>' +
          '<div class="locked-text">' + item.q + '<span class="badge">' + badge + '</span></div>';
        section.appendChild(lk);
      }
    });

    roadmap.appendChild(section);
  });

  // Scroll reveal animation
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.module').forEach(function (m) {
    observer.observe(m);
  });
})();
