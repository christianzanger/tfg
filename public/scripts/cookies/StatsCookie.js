import Cookie from '../Cookie.js';

export default class StatsCookie {

    constructor () {
        const cookie = Cookie.getCookie('stats');

        this.uid = cookie.uid;
        this.averageLoadTime = cookie.averageLoadTime;
        this.numberOfLoads = cookie.numberOfLoads;
        this.images = cookie.images;
        this.bytes = cookie.bytes;
        this.bytesSavedByCompression = cookie.bytesSavedByCompression;
        this.bytesSavedByCache = cookie.bytesSavedByCache;
        this.filesSavedByCache = cookie.filesSavedByCache;

        // TODO: check for undefined?
    }

    updateStats () {
        const lastSumOfTimes = this.averageLoadTime * this.numberOfLoads || 0;
        const currentTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;

        this.numberOfLoads++;
        const newAverage = (lastSumOfTimes + currentTime) / this.numberOfLoads;
        this.averageLoadTime = Math.round(newAverage * 100) / 100;
        this.update();
    }

    update () {
        Cookie.updateCookie('stats', this);
    }

    reset () {
        Cookie.reset('stats');
    }
}