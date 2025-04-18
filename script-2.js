// isMobile by kaimallea https://github.com/kaimallea/isMobile
// Minified version of isMobile included in the HTML since it's small
(function () { var a = {}; var f = /iPhone/i, h = /iPod/i, i = /iPad/i, r = /\biOS-universal(?:.+)Mac\b/i, g = /\bAndroid(?:.+)Mobile\b/i, j = /Android/i, c = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i, d = /Silk/i, b = /Windows Phone/i, k = /\bWindows(?:.+)ARM\b/i, m = /BlackBerry/i, n = /BB10/i, o = /Opera Mini/i, p = /\b(CriOS|Chrome)(?:.+)Mobile/i, q = /Mobile(?:.+)Firefox\b/i; function s(l) { return function ($) { return $.test(l) } } function e(l) { var $ = (l = l || ("undefined" != typeof navigator ? navigator.userAgent : "")).split("[FBAN"); void 0 !== $[1] && (l = $[0]), void 0 !== ($ = l.split("Twitter"))[1] && (l = $[0]); var a = s(l), e = { apple: { phone: a(f) && !a(b), ipod: a(h), tablet: !a(f) && a(i) && !a(b), universal: a(r), device: (a(f) || a(h) || a(i)) && !a(b) }, amazon: { phone: a(c), tablet: !a(c) && a(d), device: a(c) || a(d) }, android: { phone: !a(b) && a(c) || !a(b) && a(g), tablet: !a(b) && !a(c) && !a(g) && (a(d) || a(j)), device: !a(b) && (a(c) || a(d) || a(g) || a(j)) || a(/\bokhttp\b/i) }, windows: { phone: a(b), tablet: a(k), device: a(b) || a(k) }, other: { blackberry: a(m), blackberry10: a(n), opera: a(o), firefox: a(q), chrome: a(p), device: a(m) || a(n) || a(o) || a(q) || a(p) }, any: !1, phone: !1, tablet: !1 }; return e.any = e.apple.universal || e.apple.device || e.android.device || e.windows.device || e.other.device, e.phone = e.apple.phone || e.android.phone || e.windows.phone, e.tablet = e.apple.tablet || e.android.tablet || e.windows.tablet, e } a = e(); if (typeof exports === "object" && typeof module !== "undefined") { module.exports = a } else if (typeof define === "function" && define.amd) { define(function () { return a }) } else { this["isMobile"] = a } })();

// Everything we need for the animated columns

// Get the different html elements into JS
const spacer = document.querySelector(".spacer");
const obj1 = document.querySelector("#obj1");
const obj2 = document.querySelector("#obj2");
const obj3 = document.querySelector("#obj3");
const obj4 = document.querySelector("#obj4");
const objArray = [obj1, obj2, obj3, obj4]

// Relationship between scales for the columns
const tabs = 4;  // number of tabs (not automatic -> check with html & css)
const scaleUp = 95; // maximal size in vw of the fully expanded column
const scaleDown = (100 - scaleUp) / (tabs - 1); // automatic caltucation for the minimum size of a column
const scaleDelta = scaleUp - scaleDown; // calulate amount one column has to move

//compute the driver



// Function scroll for Desktop
function resizeDesktop() {
    // calculate the amount scrolled
    let driver = window.scrollY / (spacer.clientHeight - window.innerHeight);
    driver *= (scaleDelta * (tabs - 1) * 100); // <- multiply so it scales to 1 and the to scaleDelta
    driver = Math.round(driver) / 100; //<- now it aligns better to vw

    // Resize the columns
    // fills the following if elese statements with rules
    // checks for the current object in the objArray, index of the array
    function computeColumns(whereAreWe) {
        objArray.forEach(function callback(value, index) {
            scaleCur = scaleDown; // set scaleCur(current) to scaleDown as the deafult
            //if index and whereAreWe line up, change scaleCur to the following statement, also change the next object in the array the (+1) to the other statement
            if (whereAreWe == index) {
                scaleCur = scaleUp - (driver - scaleDelta * whereAreWe);
            }
            if (whereAreWe + 1 == index) {
                scaleCur = scaleDown + (driver - scaleDelta * whereAreWe);
            }
            value.style.width = scaleCur + "vw";
        });

    }

    //checks what column is active/opened and executes the code form computeColumns 

    if (driver < scaleDelta) {
        computeColumns(0);
    } else if (driver <= (scaleDelta * 2)) {
        computeColumns(1);
    } else if (driver <= (scaleDelta * 3)) {
        computeColumns(2);
    } else {
        computeColumns(3);
    }

    window.requestAnimationFrame(resizeDesktop);
}

// Function scroll for Mobile
function resizeMobile() {
    // calculate the amount scrolled
    let driver = window.scrollX / (spacer.clientWidth - window.innerWidth);
    driver *= (scaleDelta * (tabs - 1) * 100); // <- multiply so it scales to 1 and the to scaleDelta
    driver = Math.round(driver) / 100; //<- now it aligns better to vw

    // Resize the columns
    // fills the following if elese statements with rules
    // checks for the current object in the objArray, index of the array
    function computeColumns(whereAreWe) {
        objArray.forEach(function callback(value, index) {
            scaleCur = scaleDown; // set scaleCur(current) to scaleDown as the deafult
            //if index and whereAreWe line up, change scaleCur to the following statement, also change the next object in the array the (+1) to the other statement
            if (whereAreWe == index) {
                scaleCur = scaleUp - (driver - scaleDelta * whereAreWe);
            }
            if (whereAreWe + 1 == index) {
                scaleCur = scaleDown + (driver - scaleDelta * whereAreWe);
            }
            value.style.width = scaleCur + "vw";
        });
    }

    if (driver < scaleDelta) {
        computeColumns(0);
    } else if (driver <= (scaleDelta * 2)) {
        computeColumns(1);
    } else if (driver <= (scaleDelta * 3)) {
        computeColumns(2);
    } else {
        computeColumns(3);
    }

    window.requestAnimationFrame(resizeMobile);
}

if (isMobile.any) {
    // mobile
    spacer.style.height = "100vh";
    spacer.style.width = "400vw";
    obj1.style.overflowY = "scroll";
    obj2.style.overflowY = "scroll";
    obj3.style.overflowY = "scroll";
    obj4.style.overflowY = "scroll";

    //console.log("i am Mobile")

    resizeMobile();
} else {
    // desktop
    spacer.style.height = "1000vh";
    spacer.style.width = "100vw";

    //console.log("i am Desktop")
    resizeDesktop();

}
