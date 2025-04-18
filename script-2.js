// — isMobile.js (minified) ——————————————————————————————
(function(){
  var a={},f=/iPhone/i,h=/iPod/i,i=/iPad/i,
      r=/\biOS-universal(?:.+)Mac\b/i,g=/\bAndroid(?:.+)Mobile\b/i,
      j=/Android/i,c=/(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i,
      d=/Silk/i,b=/Windows Phone/i,k=/\bWindows(?:.+)ARM\b/i,
      m=/BlackBerry/i,n=/BB10/i,o=/Opera Mini/i,
      p=/\b(CriOS|Chrome)(?:.+)Mobile/i,
      q=/Mobile(?:.+)Firefox\b/i;
  function s(l){return function($){return $.test(l)}}
  function e(l){
    var $=(l=l||(typeof navigator!=="undefined"?navigator.userAgent:"")).split("[FBAN");
    if($[1])l=$[0];
    $=l.split("Twitter");
    if($[1])l=$[0];
    var a=s(l),e={
      apple:{phone:a(f)&&!a(b),ipod:a(h),tablet:!a(f)&&a(i)&&!a(b),universal:a(r),device:(a(f)||a(h)||a(i))&&!a(b)},
      amazon:{phone:a(c),tablet:!a(c)&&a(d),device:a(c)||a(d)},
      android:{phone:(!a(b)&&a(c))||(!a(b)&&a(g)),tablet:!a(b)&&!a(c)&&!a(g)&&(a(d)||a(j)),device:(!a(b)&&(a(c)||a(d)||a(g)||a(j)))||a(/\bokhttp\b/i)},
      windows:{phone:a(b),tablet:a(k),device:a(b)||a(k)},
      other:{blackberry:a(m),blackberry10:a(n),opera:a(o),firefox:a(q),chrome:a(p),device:a(m)||a(n)||a(o)||a(q)||a(p)},
      any:false,phone:false,tablet:false
    };
    e.any=e.apple.universal||e.apple.device||e.android.device||e.windows.device||e.other.device;
    e.phone=e.apple.phone||e.android.phone||e.windows.phone;
    e.tablet=e.apple.tablet||e.android.tablet||e.windows.tablet;
    return e;
  }
  a=e();
  if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=a;}
  else if(typeof define==="function"&&define.amd){define(function(){return a});}
  else{this.isMobile=a;}
})();

// — main scroll-to-columns logic ——————————————————————
window.addEventListener('load', () => {
  const spacer = document.querySelector('.spacer');
  const panels = Array.from(document.querySelectorAll('.main section'));
  const tabs = panels.length;        // here = 5
  const scaleUp = 95;                // focused width (vw)
  const scaleDown = (100 - scaleUp)/(tabs - 1);
  const scaleDelta = scaleUp - scaleDown;

  // set spacer dimensions
  if (isMobile.any) {
    spacer.style.height = 'auto';  // mobile fallback
  } else {
    spacer.style.height = `${tabs * 100}vh`;
    // start the animation loop
    const animate = () => {
      let driver = window.scrollY / (spacer.clientHeight - window.innerHeight);
      driver = Math.max(0, Math.min(1, driver));
      driver = Math.round(driver * (scaleDelta * (tabs - 1) * 100)) / 100;

      // find which panel(s) are active
      const idx = Math.min(tabs - 1, Math.floor(driver / scaleDelta));
      panels.forEach((sec, i) => {
        let w = scaleDown;
        if (i === idx)        w = scaleUp - (driver - scaleDelta * i);
        else if (i === idx+1) w = scaleDown + (driver - scaleDelta * idx);
        sec.style.width = `${w}vw`;
      });

      requestAnimationFrame(animate);
    };
    animate();
  }
});
