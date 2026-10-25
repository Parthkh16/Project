(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Type the hero command once on load
  var typed = document.getElementById("typed");
  if (typed) {
    var text = typed.getAttribute("data-text") || "";
    if (reduce) {
      typed.textContent = text;
    } else {
      var i = 0;
      (function tick() {
        typed.textContent = text.slice(0, ++i);
        if (i < text.length) setTimeout(tick, 90);
      })();
    }
  }

  // Highlight the nav link for the section in view
  var links = document.querySelectorAll(".top nav a");
  var map = {};
  links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && map[e.target.id]) {
          links.forEach(function (a) { a.classList.remove("on"); });
          map[e.target.id].classList.add("on");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  // Copy email
  var btn = document.getElementById("copy");
  var email = document.getElementById("email");
  if (btn && email) {
    btn.addEventListener("click", function () {
      var done = function () {
        btn.textContent = "copied";
        setTimeout(function () { btn.textContent = "copy"; }, 1500);
      };
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email.textContent).then(done, function () {
          btn.textContent = "select it";
        });
      } else {
        btn.textContent = "select it";
      }
    });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
