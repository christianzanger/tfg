import Cookie from './Cookie.js';

export default class StatsCookie {

    constructor () {
        const cookie = Cookie.getCookie('stats');

        this.uid = cookie.uid;
        this.averageLoadTime = cookie.averageLoadTime;
        this.numberOfLoads = cookie.numberOfLoads || 0;
        this.images = cookie.images || 0;
        this.bytes = cookie.bytes || 0;
        this.bytesSavedByCompression = cookie.bytesSavedByCompression || 0;
        this.bytesSavedByCache = cookie.bytesSavedByCache || 0;
        this.filesSavedByCache = cookie.filesSavedByCache || 0;
    }

    updateStats () {
        const lastSumOfTimes = this.averageLoadTime * this.numberOfLoads || 0;
        const currentTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;

        this.numberOfLoads++;

        const newAverage = (lastSumOfTimes + currentTime) / this.numberOfLoads;
        this.averageLoadTime = Math.round(newAverage * 100) / 100;
        this.update();
        console.table(this);
    }

    update () {
        Cookie.updateCookie('stats', this);
    }

    reset () {
        Cookie.reset('stats');
    }
}