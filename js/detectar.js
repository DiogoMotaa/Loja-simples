// Detecta se o dispositivo é desktop; se não for, adiciona a classe hide-on-mobile
document.addEventListener('DOMContentLoaded', function () {
    function isDesktopDevice() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const mobileRegex = /Mobi|Android|iPhone|iPad|iPod|IEMobile|Windows Phone/i;
    const hasTouch = navigator.maxTouchPoints && navigator.maxTouchPoints > 0;
    const smallScreen = window.innerWidth <= 768;
    return !mobileRegex.test(ua) && !(hasTouch && smallScreen);
    }

    const isDesktop = isDesktopDevice();
    if (!isDesktop) {
    const selectors = '.seta, .arrow, .btn-arrow, .carousel .prev, .carousel .next';
    document.querySelectorAll(selectors).forEach(el => el.classList.add('hide-on-mobile'));
    document.body.classList.add('is-mobile');
    } else {
    document.body.classList.add('is-desktop');
    }
});
