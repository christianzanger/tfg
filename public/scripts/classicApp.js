import Cookie from './Cookie.js';

const imgs = document.querySelectorAll("img");
const statsUpdatedEvent = new Event('statsUpdate');
const settingsCookie = new Cookie("settings");

let imagesLoaded = 0;
let synced = false;

async function syncStatsWithServer() {
    return await (await fetch('/sync', {credentials: "same-origin"})).json();
}

const updateStatsCookie = (imagesData, historyData) => {
    const statsCookie = new Cookie("stats");
    statsCookie.obj.images.downloadedBytes = imagesData.images.downloadedBytes;
    statsCookie.obj.images.numberOfImages = imagesData.images.numberOfImages;
    statsCookie.updateCookie();

    fetch('/savehistory', {
        body: JSON.stringify(historyData),
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST"
    });
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

const pageLoadedHandler = () => {
    const historyData = {};
    // The last 2 conditions are to filter out the HEAD requests in the search page
    const localEntries = window.performance.getEntries()
                         .filter(entry => entry.name.startsWith("http://localhost") && (entry.initiatorType !== "" || !entry.name.includes("images")));


    synced = true;
    if (settingsCookie && settingsCookie.obj.settings.compression) {
        historyData.bytesSavedByCompression  = localEntries
            .reduce((accumulator, entry) => accumulator + (entry.decodedBodySize - entry.encodedBodySize), 0);
    }

    historyData.bytes = localEntries
        .reduce((accumulator, entry) => accumulator + entry.transferSize, 0);

    syncStatsWithServer().then((imagesData) => updateStatsCookie(imagesData, historyData));
};

// Used for search page
imgs.forEach(img => img.onload = () => {
    if (++imagesLoaded === imgs.length && !synced) {
        pageLoadedHandler();
    }
});

// This function has to be deferred so loadEventEnd can have a value
// If it's not deferred, loadEventEnd will equal 0 since it's not really finished yet (and averageLoadTime will be negative).
window.addEventListener('load', () => {
    setTimeout(updateStats, 0);
    const imagesLoaded = window.performance.getEntries().filter(entry => entry.initiatorType === "img");

    // Used for pages where images load faster than the eventListener assignment
    if (imagesLoaded.length === imgs.length && !synced) {
        pageLoadedHandler();
    }
});