document.addEventListener('DOMContentLoaded', function () {
  var root = document.getElementById('gallery-carousel');
  if (!root) return;

  var track = root.querySelector('.carousel-track');
  var dotsWrap = root.querySelector('.carousel-dots');
  var prevBtn = root.querySelector('.carousel-prev');
  var nextBtn = root.querySelector('.carousel-next');
  var manifestUrl = root.getAttribute('data-manifest') || '/assets/gallery/manifest.json';
  var interval = parseInt(root.getAttribute('data-interval'), 10) || 5000;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var current = 0;
  var timer = null;
  var items = [];

  fetch(manifestUrl)
    .then(function (r) { return r.json(); })
    .then(function (data) {
      items = Array.isArray(data) ? data : [];
      if (!items.length) {
        root.innerHTML = '<p style="padding:24px; text-align:center; color:var(--text-muted);">No gallery items yet — add images or videos to assets/gallery and list them in manifest.json.</p>';
        return;
      }
      build();
    })
    .catch(function () {
      root.innerHTML = '<p style="padding:24px; text-align:center; color:var(--text-muted);">Gallery could not be loaded.</p>';
    });

  function build() {
    items.forEach(function (item, i) {
      var slide = document.createElement('div');
      slide.className = 'carousel-slide' + (i === 0 ? ' active' : '');

      var media;
      if (item.type === 'video') {
        media = document.createElement('video');
        media.muted = true;
        media.loop = true;
        media.playsInline = true;
        media.setAttribute('aria-label', item.caption || '');
        // Supports either a single "src", or a "sources" array for format
        // fallback, e.g. [{src:"...mp4", type:"video/mp4"}, {src:"...webm", type:"video/webm"}]
        var sourceList = Array.isArray(item.sources) ? item.sources : [{ src: item.src }];
        sourceList.forEach(function (s) {
          var sourceEl = document.createElement('source');
          sourceEl.src = s.src;
          if (s.type) sourceEl.type = s.type;
          media.appendChild(sourceEl);
        });
      } else {
        media = document.createElement('img');
        media.src = item.src;
        media.alt = item.caption || '';
        media.loading = i === 0 ? 'eager' : 'lazy';
      }
      slide.appendChild(media);

      if (item.caption) {
        var cap = document.createElement('div');
        cap.className = 'carousel-caption';
        cap.textContent = item.caption;
        slide.appendChild(cap);
      }
      track.appendChild(slide);

      var dot = document.createElement('button');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      if (i === 0) dot.className = 'active';
      dot.addEventListener('click', function () { goTo(i); restart(); });
      dotsWrap.appendChild(dot);
    });

    playActiveVideo();
    if (!reduceMotion) start();

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', function () { if (!reduceMotion) start(); });

    prevBtn.addEventListener('click', function () { goTo(current - 1); restart(); });
    nextBtn.addEventListener('click', function () { goTo(current + 1); restart(); });
  }

  function slides() { return track.querySelectorAll('.carousel-slide'); }
  function dots() { return dotsWrap.querySelectorAll('button'); }

  function goTo(index) {
    var s = slides();
    var d = dots();
    current = (index + s.length) % s.length;
    s.forEach(function (el, i) { el.classList.toggle('active', i === current); });
    d.forEach(function (el, i) { el.classList.toggle('active', i === current); });
    playActiveVideo();
  }

  function playActiveVideo() {
    slides().forEach(function (el, i) {
      var v = el.querySelector('video');
      if (!v) return;
      if (i === current) { v.currentTime = 0; v.play().catch(function () {}); }
      else { v.pause(); }
    });
  }

  function start() {
    stop();
    timer = setInterval(function () { goTo(current + 1); }, interval);
  }
  function stop() {
    if (timer) { clearInterval(timer); timer = null; }
  }
  function restart() { if (!reduceMotion) start(); }
});
