import Cookie from './Cookie.js';

export default class SettingsCookie {

    constructor () {
        const cookie = Cookie.getCookie('settings');

        this.compression = cookie.compression;
        this.cache = cookie.cache;
    }

    update () {
        Cookie.updateCookie('settings', this);
    }

    reset () {
        Cookie.reset('settings');
    }
}