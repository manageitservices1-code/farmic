document.addEventListener('DOMContentLoaded', function () {
  var cfg = window.FARMIC_CONFIG;
  if (!cfg) return;

  // ---- Phone ----
  document.querySelectorAll('[data-config="phone"]').forEach(function (el) {
    el.textContent = cfg.phone;
    if (el.tagName === 'A') el.href = 'tel:' + cfg.phone.replace(/[^+\d]/g, '');
  });

  // ---- Email ----
  document.querySelectorAll('[data-config="email"]').forEach(function (el) {
    el.textContent = cfg.email;
    if (el.tagName === 'A') el.href = 'mailto:' + cfg.email;
  });

  // ---- Address (three lines) ----
  ['line1', 'line2', 'line3'].forEach(function (key) {
    document.querySelectorAll('[data-config="address-' + key + '"]').forEach(function (el) {
      el.textContent = cfg.address[key];
    });
  });

  // ---- Google Map (built from the address automatically) ----
  var mapFrame = document.querySelector('[data-config="map-iframe"]');
  if (mapFrame) {
    var fullAddress = [cfg.address.line1, cfg.address.line2, cfg.address.line3].join(' ');
    mapFrame.src = 'https://www.google.com/maps?q=' + encodeURIComponent(fullAddress) + '&output=embed';
  }

  // ---- Contact form destination (Formspree) ----
  var form = document.getElementById('contact-form');
  if (form && cfg.formspreeId) {
    form.setAttribute('action', 'https://formspree.io/f/' + cfg.formspreeId);
  }

  // ---- Social icons ----
  // Each icon link has data-social="youtube" / "x" / "facebook" / "instagram".
  // If a config value is empty, that icon is hidden rather than linking nowhere.
  document.querySelectorAll('[data-social]').forEach(function (link) {
    var key = link.getAttribute('data-social');
    var url = cfg.social ? cfg.social[key] : '';
    if (url) {
      link.href = url;
      link.style.display = '';
    } else {
      link.style.display = 'none';
    }
  });
});
