import Cookie from './Cookie.js';
import SettingsCookie from "./SettingsCookie.js";

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
        this.bytesSavedByProd = cookie.bytesSavedByProd || 0;
        this.bytesSavedByClientSide = cookie.bytesSavedByClientSide || 0;
    }

    updateStats () {
        const settingsCookie = new SettingsCookie();
        const lastSumOfTimes = this.averageLoadTime * this.numberOfLoads || 0;
        let currentTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;

        if (settingsCookie.renderBlocking) {
            currentTime += 1500;
        }

        this.numberOfLoads++;

        const newAverage = (lastSumOfTimes + currentTime) / this.numberOfLoads;
        this.averageLoadTime = Math.round(newAverage * 100) / 100;
        this.update();
    }

    update () {
        Cookie.updateCookie('stats', this);
    }

    static reset () {
        Cookie.reset('stats');
    }
}