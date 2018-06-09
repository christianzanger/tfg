import Cookie from './Cookie.js';
const imgs = document.querySelectorAll("img");

const recalcAvgLoadTime = (stats) => {
    const lastSumOfTimes = stats.averageLoadTime * stats.numberOfLoads;
    const currentTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;

    stats.numberOfLoads += 1;
    const newAverage = (lastSumOfTimes + currentTime) / stats.numberOfLoads;
    stats.averageLoadTime = Math.round(newAverage * 100) / 100;
};

const updateStats = () => {
    recalcAvgLoadTime(statsCookie.obj);
    statsCookie.updateCookie();
    console.log("Stats updated: ", statsCookie.obj);
    window.dispatchEvent(statsUpdatedEvent);
};

imgs.forEach((img) => {
    img.onload = (e) => {
        // console.log("image loaded");
        // fetch(img.src, {method: 'HEAD'}).then((res) => {
        //     console.log(res);
        // });
    }
});

const statsUpdatedEvent = new Event('statsUpdate');
const statsCookie = new Cookie("stats");

// This function has to be deferred so loadEventEnd can have a value
// If it's not deferred, loadEventEnd will equal 0 since it's not really finished yet (and averageLoadTime will be negative).
window.addEventListener('load', () => {setTimeout(updateStats, 0)});