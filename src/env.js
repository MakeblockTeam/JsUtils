const check = {
    android() {
        return navigator.userAgent.match(/Android/i);
    },
    blackBerry() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    winphone() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    mobile() {
        return navigator.userAgent.match(/Mobile/i);
    },
    ipad() {
        return navigator.userAgent.match(/iPad/i);
    },
    androidPad() {
        var isAndroid = check.android();
        var isMobile = navigator.userAgent.match(/Mobile/i);
        return isAndroid && !isMobile;
    },
    phone() {
        return (
            check.mobile() &&
            !check.ipad() &&
            !check.androidPad()
        );
    },
    pc() {
        return (
            !check.mobile() &&
            !check.ipad() &&
            !check.androidPad()
        );
    },
    devMode() {
        return (
            location.hostname.indexOf('127.0.0') > -1 ||
            location.hostname.indexOf('192.168') > -1
        );
    }
};

const android = check.android();
const blackBerry = check.blackBerry();
const iOS = check.iOS();
const winphone = check.winphone();
const ipad = check.ipad();
const androidPad = check.androidPad();
const mobile = check.mobile();
const phone = check.phone();
const pc = check.pc();
const devMode = check.devMode();

export default {
    iOS,
    android,
    blackBerry,
    winphone,
    ipad,
    androidPad,
    mobile,
    phone,
    pc,
    devMode
}