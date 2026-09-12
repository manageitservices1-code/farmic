document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var cfg = window.FARMIC_CONFIG || {};
  var fallbackEmail = cfg.email || 'info@farmicagro.com';

  var status = document.getElementById('form-status');

  function showStatus(kind, message) {
    status.textContent = message;
    status.className = 'form-status show ' + kind;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = form.querySelector('#name').value.trim();
    var email = form.querySelector('#email').value.trim();
    var message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      showStatus('error', 'Please fill in your name, email and message before sending.');
      return;
    }

    var action = form.getAttribute('action');
    var isConfigured = action && action.indexOf('YOUR_FORM_ID') === -1;

    if (!isConfigured) {
      // Form endpoint not yet connected — fall back to opening the visitor's mail app.
      var mailto = 'mailto:' + fallbackEmail
        + '?subject=' + encodeURIComponent('Website enquiry from ' + name)
        + '&body=' + encodeURIComponent(message + '\n\n' + email + (form.querySelector('#phone').value ? ' | ' + form.querySelector('#phone').value : ''));
      window.location.href = mailto;
      showStatus('success', 'Opening your email app to send this message — if nothing happens, email us directly at ' + fallbackEmail + '.');
      return;
    }

    var data = new FormData(form);
    fetch(action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    }).then(function (response) {
      if (response.ok) {
        showStatus('success', 'Thanks — your message has been sent. We will get back to you soon.');
        form.reset();
      } else {
        showStatus('error', 'Something went wrong sending your message. Please email us directly at ' + fallbackEmail + '.');
      }
    }).catch(function () {
      showStatus('error', 'Something went wrong sending your message. Please email us directly at ' + fallbackEmail + '.');
    });
  });
});
