import Cookie from './Cookie.js';

const imgs = document.querySelectorAll("img");
const statsUpdatedEvent = new Event('statsUpdate');
let imagesLoaded = 0;
let synced = false;

async function syncStatsWithServer() {
    return await (await fetch('/sync', {credentials: "same-origin"})).json();
}

const updateStatsCookie = data => {
    const statsCookie = new Cookie("stats");
    statsCookie.obj.images.downloadedBytes = data.images.downloadedBytes;
    statsCookie.obj.images.numberOfImages = data.images.numberOfImages;
    statsCookie.updateCookie();
    fetch('/savehistory', {credentials: "same-origin", method: "POST"});
};

const recalcAvgLoadTime = stats => {
    const lastSumOfTimes = stats.averageLoadTime * stats.numberOfLoads;
    const currentTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;

    stats.numberOfLoads++;
    const newAverage = (lastSumOfTimes + currentTime) / stats.numberOfLoads;
    stats.averageLoadTime = Math.round(newAverage * 100) / 100;
};

const updateStats = () => {
    const statsCookie = new Cookie('stats');
    recalcAvgLoadTime(statsCookie.obj);
    statsCookie.updateCookie();
    window.dispatchEvent(statsUpdatedEvent);
};

imgs.forEach((img) => img.onload = () => {
    if (++imagesLoaded === imgs.length && !synced) {
        synced = true;
        syncStatsWithServer().then((data) => updateStatsCookie(data));
    }
});

// This function has to be deferred so loadEventEnd can have a value
// If it's not deferred, loadEventEnd will equal 0 since it's not really finished yet (and averageLoadTime will be negative).
window.addEventListener('load', () => {
    setTimeout(updateStats, 0);
    if (window.performance.getEntries().filter(entry => entry.initiatorType === "img").length === imgs.length && !synced) {
        synced = true;
        syncStatsWithServer().then((data) => updateStatsCookie(data));
    }
});