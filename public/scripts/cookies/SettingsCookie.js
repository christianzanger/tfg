import Cookie from './Cookie.js';

export default class SettingsCookie {

    constructor () {
        const cookie = Cookie.getCookie('settings');

        this.compression = cookie.compression;
        this.cache = cookie.cache;
        this.tutorialStep = cookie.tutorialStep;
        this.minification = cookie.minification;
        this.clientSide = cookie.clientSide;
    }

    update () {
        Cookie.updateCookie('settings', this);
    }

    static reset () {
        Cookie.reset('settings');
    }
}