import SettingsCookie from './cookies/SettingsCookie.js';
import StatsCookie from './cookies/StatsCookie.js';

const imgs = document.querySelectorAll("img");
const settingsCookie = new SettingsCookie();

let imagesLoaded = 0;
let synced = false;

const pageLoadedHandler = () => {
    // console.log(window.performance.timing.loadEventEnd);

    const statsCookie = new StatsCookie();
    // The last 2 conditions are to filter out the HEAD requests in the search page
    const localEntries = window.performance.getEntries()
                         .filter(entry => entry.initiatorType !== "fetch" || !entry.name.includes("images"));
    const cachedEntries = localEntries.filter(entry => entry.transferSize === 0);

    if (settingsCookie.compression) {
        let compressedEntries;
        const compressionAdder = (accumulator, entry) => accumulator + (entry.decodedBodySize - entry.encodedBodySize);
        if (settingsCookie.cache && cachedEntries.length > 0) {
            compressedEntries = localEntries.filter(entry => entry.decodedBodySize && entry.transferSize !== 0);
        } else {
            compressedEntries = localEntries.filter(entry => entry.decodedBodySize);
        }

        statsCookie.bytesSavedByCompression  = compressedEntries.reduce(compressionAdder, 0);
    }

    if (settingsCookie.cache) {
        statsCookie.bytesSavedByCache = cachedEntries.reduce((accumulator, entry) => accumulator + entry.decodedBodySize, 0);
    }

    statsCookie.bytes = localEntries.filter(entry => entry.transferSize).reduce((accumulator, entry) => accumulator + entry.transferSize, 0);

    statsCookie.images = localEntries.filter(entry => entry.name.includes("images")).length;

    statsCookie.updateStats();

    fetch('/savehistory', {
        credentials: "same-origin",
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({page: window.location.href}),
    }).then(() => window.dispatchEvent(new Event('statsUpdate')));
};

// Used for search page
imgs.forEach(img => img.onload = (event) => {
    event.stopPropagation();
    if (++imagesLoaded === imgs.length && !synced) {
        synced = true;
        setTimeout(pageLoadedHandler, 0);
    }
});

// This function has to be deferred so loadEventEnd can have a value
// If it's not deferred, loadEventEnd will equal 0 since it's not really finished yet (and averageLoadTime will be negative).
window.addEventListener('load', () => {
    // Used for pages where images load faster than the eventListener assignment
    const imagesLoaded = window.performance.getEntries().filter(entry => entry.initiatorType === "img");
    if (imagesLoaded.length === imgs.length && !synced) {
        synced = true;
        setTimeout(pageLoadedHandler, 0);
    }
});