(function () {
  var time = document.getElementById('launch');
  var timer = document.getElementById('timer');
  var text = document.getElementById('launch-text');
  var target = Date.parse(time.getAttribute('datetime'));
  if (isNaN(target)) return;

  var cells = {};
  timer.querySelectorAll('[data-unit]').forEach(function (el) {
    cells[el.getAttribute('data-unit')] = el;
  });

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function tick() {
    var s = Math.max(0, Math.floor((target - Date.now()) / 1000));
    if (s === 0) {
      clearInterval(id);
      timer.hidden = true;
      text.hidden = false;
      text.textContent = 'Almost there — check back shortly.';
      return;
    }
    cells.days.textContent = pad(Math.floor(s / 86400));
    cells.hours.textContent = pad(Math.floor((s % 86400) / 3600));
    cells.minutes.textContent = pad(Math.floor((s % 3600) / 60));
    cells.seconds.textContent = pad(s % 60);
  }

  text.hidden = true;
  timer.hidden = false;
  var id = setInterval(tick, 1000);
  tick();
})();
