export default class Cookie {

    constructor (key) {
        this.key = key;
        this.obj = JSON.parse(decodeURIComponent(Cookie.searchForCookie(key)));
    }

    static searchForCookie (key) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let c = cookies[i].replace(' ', '');
            if (c.indexOf(`${key}=`) == 0) return c.substring(`${key}=`.length, c.length);
        }
        return null;
    };

    updateCookie () {
        document.cookie = `${this.key}=${encodeURIComponent(JSON.stringify(this.obj))}; path=/`;
    };

    reset () {
        document.cookie = `${this.key}=; Max-Age=-99999999;`;
    }
}