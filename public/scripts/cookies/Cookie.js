export default class Cookie {

    constructor (key) {
        this.obj = JSON.parse(decodeURIComponent(Cookie.searchForCookie(key))) || {};
    }

    static getCookie (key) {
        return JSON.parse(decodeURIComponent(Cookie.searchForCookie(key))) || {};
    }

    static searchForCookie (key) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let c = cookies[i].replace(' ', '');
            if (c.indexOf(`${key}=`) == 0) return c.substring(`${key}=`.length, c.length);
        }
        return null;
    };

    static updateCookie (key, obj) {
        document.cookie = `${key}=${encodeURIComponent(JSON.stringify(obj))}; path=/`;
    };

    static reset (key) {
        document.cookie = `${key}=; Max-Age=0; path=/`;
    }
}