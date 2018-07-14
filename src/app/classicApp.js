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
    const statsCookie = new Cookie('stats');
    recalcAvgLoadTime(statsCookie.obj);
    statsCookie.updateCookie();
    // console.log("Stats updated load:", statsCookie.obj);
    window.dispatchEvent(statsUpdatedEvent);
};

// TODO: maybe delete this if not needed. Image stats updated in server and fetched later
imgs.forEach((img) => img.onload = () => console.log("Image loaded"));

const statsUpdatedEvent = new Event('statsUpdate');

// This function has to be deferred so loadEventEnd can have a value
// If it's not deferred, loadEventEnd will equal 0 since it's not really finished yet (and averageLoadTime will be negative).
window.addEventListener('load', () => {
    setTimeout(updateStats, 0);
    console.log(window.performance.getEntries());
});