<script>
// isMobile by kaimallea – minified version inlined
(function () {
  var a = {};
  var f = /iPhone/i, h = /iPod/i, i = /iPad/i, r = /\biOS-universal(?:.+)Mac\b/i,
      g = /\bAndroid(?:.+)Mobile\b/i, j = /Android/i, c = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i,
      d = /Silk/i, b = /Windows Phone/i, k = /\bWindows(?:.+)ARM\b/i, m = /BlackBerry/i,
      n = /BB10/i, o = /Opera Mini/i, p = /\b(CriOS|Chrome)(?:.+)Mobile/i, q = /Mobile(?:.+)Firefox\b/i;
  function s(l) { return function ($) { return $.test(l) } }
  function e(l) {
    var $ = (l = l || (typeof navigator !== "undefined" ? navigator.userAgent : "")).split("[FBAN");
    if ($[1]) l = $[0];
    $ = l.split("Twitter");
    if ($[1]) l = $[0];
    var a = s(l);
    var e = {
      apple: {
        phone: a(f) && !a(b), ipod: a(h), tablet: !a(f) && a(i) && !a(b), universal: a(r),
        device: (a(f) || a(h) || a(i)) && !a(b)
      },
      amazon: { phone: a(c), tablet: !a(c) && a(d), device: a(c) || a(d) },
      android: {
        phone: (!a(b) && a(c)) || (!a(b) && a(g)),
        tablet: !a(b) && !a(c) && !a(g) && (a(d) || a(j)),
        device: (!a(b) && (a(c) || a(d) || a(g) || a(j))) || a(/\bokhttp\b/i)
      },
      windows: { phone: a(b), tablet: a(k), device: a(b) || a(k) },
      other: {
        blackberry: a(m), blackberry10: a(n), opera: a(o), firefox: a(q), chrome: a(p),
        device: a(m) || a(n) || a(o) || a(q) || a(p)
      },
      any: false, phone: false, tablet: false
    };
    e.any = e.apple.universal || e.apple.device || e.android.device || e.windows.device || e.other.device;
    e.phone = e.apple.phone || e.android.phone || e.windows.phone;
    e.tablet = e.apple.tablet || e.android.tablet || e.windows.tablet;
    return e;
  }
  a = e();
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = a;
  } else if (typeof define === "function" && define.amd) {
    define(function () { return a });
  } else {
    this["isMobile"] = a;
  }
})();

// === Animated Column Scroll Effect ===
document.addEventListener("DOMContentLoaded", () => {
  const spacer = document.querySelector(".spacer");
  const objArray = [
    document.querySelector("#obj1"),
    document.querySelector("#obj2"),
    document.querySelector("#obj3"),
    document.querySelector("#obj4")
  ];

  if (!spacer || objArray.includes(null)) {
    console.error("Missing required DOM elements: spacer or one of the columns.");
    return;
  }

  const tabs = 4;
  const scaleUp = 95;
  const scaleDown = (100 - scaleUp) / (tabs - 1);
  const scaleDelta = scaleUp - scaleDown;

  function resizeDesktop() {
    let driver = window.scrollY / (spacer.clientHeight - window.innerHeight);
    driver *= (scaleDelta * (tabs - 1) * 100);
    driver = Math.round(driver) / 100;

    function computeColumns(whereAreWe) {
      objArray.forEach((value, index) => {
        let scaleCur = scaleDown;
        if (whereAreWe === index) {
          scaleCur = scaleUp - (driver - scaleDelta * whereAreWe);
        }
        if (whereAreWe + 1 === index) {
          scaleCur = scaleDown + (driver - scaleDelta * whereAreWe);
        }
        value.style.width = `${scaleCur}vw`;
      });
    }

    if (driver < scaleDelta) {
      computeColumns(0);
    } else if (driver <= scaleDelta * 2) {
      computeColumns(1);
    } else if (driver <= scaleDelta * 3) {
      computeColumns(2);
    } else {
      computeColumns(3);
    }

    window.requestAnimationFrame(resizeDesktop);
  }

  function resizeMobile() {
    let driver = window.scrollX / (spacer.clientWidth - window.innerWidth);
    driver *= (scaleDelta * (tabs - 1) * 100);
    driver = Math.round(driver) / 100;

    function computeColumns(whereAreWe) {
      objArray.forEach((value, index) => {
        let scaleCur = scaleDown;
        if (whereAreWe === index) {
          scaleCur = scaleUp - (driver - scaleDelta * whereAreWe);
        }
        if (whereAreWe + 1 === index) {
          scaleCur = scaleDown + (driver - scaleDelta * whereAreWe);
        }
        value.style.width = `${scaleCur}vw`;
      });
    }

    if (driver < scaleDelta) {
      computeColumns(0);
    } else if (driver <= scaleDelta * 2) {
      computeColumns(1);
    } else if (driver <= scaleDelta * 3) {
      computeColumns(2);
    } else {
      computeColumns(3);
    }

    window.requestAnimationFrame(resizeMobile);
  }

  // Apply layout settings and trigger animation
  if (isMobile?.any) {
    // Mobile view
    spacer.style.height = "100vh";
    spacer.style.width = "400vw";
    objArray.forEach(obj => obj.style.overflowY = "scroll");
    resizeMobile();
  } else {
    // Desktop view
    spacer.style.height = "1000vh";
    spacer.style.width = "100vw";
    resizeDesktop();
  }

});
</script>
