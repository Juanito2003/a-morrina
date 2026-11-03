/* A Morriña — idioma, menú móvil y "abierto ahora" */
(function () {
  var root = document.documentElement;

  /* ---------- Idioma (ES / GL) ---------- */
  var titles = {
    es: 'A Morriña — Café bar en Verín · Jazz, rock y música en directo',
    gl: 'A Morriña — Café bar en Verín · Jazz, rock e música en directo'
  };

  function setLang(lang) {
    root.dataset.lang = lang;
    root.lang = lang;
    document.title = titles[lang];

    document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.setLang === lang));
    });
    document.querySelectorAll('[data-label-' + lang + ']').forEach(function (el) {
      el.setAttribute('aria-label', el.getAttribute('data-label-' + lang));
    });
    document.querySelectorAll('[data-title-' + lang + ']').forEach(function (el) {
      el.setAttribute('title', el.getAttribute('data-title-' + lang));
    });

    try { localStorage.setItem('lang', lang); } catch (e) {}
  }

  document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
    btn.addEventListener('click', function () { setLang(btn.dataset.setLang); });
  });
  setLang(root.dataset.lang === 'gl' ? 'gl' : 'es');

  /* ---------- Menú móvil ---------- */
  var menuBtn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');

  function setMenu(open) {
    menuBtn.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  }

  menuBtn.addEventListener('click', function () {
    setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      menuBtn.focus();
    }
  });

  /* ---------- Abierto ahora (hora de Verín) ---------- */
  // Lunes a sábado 8:30–15:00 y 18:30–23:00; domingo cerrado.
  var status = document.querySelector('[data-open-status]');

  function updateStatus() {
    if (!status || !window.Intl) return;

    var parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Madrid', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date());
    var get = function (type) { return parts.find(function (p) { return p.type === type; }).value; };

    var day = get('weekday');
    var mins = Number(get('hour')) * 60 + Number(get('minute'));
    var sunday = day === 'Sun';
    var open = !sunday && ((mins >= 510 && mins < 900) || (mins >= 1110 && mins < 1380));

    var es, gl;
    if (open) {
      var closes = mins < 900 ? '15:00' : '23:00';
      es = 'Abierto ahora · cierra a las ' + closes;
      gl = 'Aberto agora · pecha ás ' + closes;
    } else if (sunday) {
      es = 'Cerrado ahora · abre mañana a las 8:30';
      gl = 'Pechado agora · abre mañá ás 8:30';
    } else if (mins < 510) {
      es = 'Cerrado ahora · abre hoy a las 8:30';
      gl = 'Pechado agora · abre hoxe ás 8:30';
    } else if (mins < 1110) {
      es = 'Cerrado ahora · abre a las 18:30';
      gl = 'Pechado agora · abre ás 18:30';
    } else if (day === 'Sat') {
      es = 'Cerrado ahora · abre el lunes a las 8:30';
      gl = 'Pechado agora · abre o luns ás 8:30';
    } else {
      es = 'Cerrado ahora · abre mañana a las 8:30';
      gl = 'Pechado agora · abre mañá ás 8:30';
    }

    status.classList.toggle('is-open', open);
    status.innerHTML = '<span class="dot" aria-hidden="true"></span>' +
      '<span lang="es">' + es + '</span><span lang="gl">' + gl + '</span>';
  }

  updateStatus();
  setInterval(updateStatus, 60000);

  /* ---------- Agenda: próximos y ya pasados según la fecha ---------- */
  // data-until="AAAA-MM-DD": se oculta después de ese día.
  // data-from="AAAA-MM-DD": se muestra a partir de ese día.
  if (window.Intl) {
    var today = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit'
    }).format(new Date());
    document.querySelectorAll('[data-until]').forEach(function (el) {
      if (el.dataset.until < today) el.hidden = true;
    });
    document.querySelectorAll('[data-from]').forEach(function (el) {
      if (el.dataset.from <= today) el.hidden = false;
    });
  }
})();
