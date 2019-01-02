import SettingsCookie from './cookies/SettingsCookie.js';
import StatsCookie from './cookies/StatsCookie.js';

const imgs = document.querySelectorAll("img");
const settingsCookie = new SettingsCookie();

let imagesLoaded = 0;
let synced = false;

const pageLoadedHandler = () => {
    const statsCookie = new StatsCookie();
    // The last 2 conditions are to filter out the HEAD requests in the search page
    const localEntries = window.performance.getEntries()
                         .filter(entry => entry.initiatorType !== "fetch" || !entry.name.includes("images"));
    const cachedEntries = localEntries.filter(entry => entry.transferSize === 0);
    const reactDevBytes = 1355907;
    const msWastedByRenderBlocking = 1500;

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

    if (settingsCookie.cache && cachedEntries.length > 0) {
        statsCookie.bytesSavedByCache = cachedEntries.reduce((accumulator, entry) => accumulator + entry.decodedBodySize, 0);
        if (settingsCookie.minification) {
            statsCookie.bytesSavedByCache += reactDevBytes;
        }
    } else {
        statsCookie.bytesSavedByCache = 0;
    }

    if (settingsCookie.minification && cachedEntries.filter(entry => entry.name.includes('bundle')).length === 0) {
        statsCookie.bytesSavedByProd = reactDevBytes;
    } else {
        statsCookie.bytesSavedByProd = 0;
    }

    if (settingsCookie.renderBlocking) {
        statsCookie.msWastedByRenderBlocking = msWastedByRenderBlocking;
    } else {
        statsCookie.msWastedByRenderBlocking = 0;
    }

    statsCookie.bytes = localEntries.filter(entry => entry.transferSize).reduce((accumulator, entry) => accumulator + entry.transferSize, 0);

    statsCookie.images = localEntries.filter(entry => entry.name.includes("images") && entry.transferSize !== 0).length;
    statsCookie.cssFiles = localEntries.filter(entry => entry.name.includes("css") && entry.transferSize !== 0).length;
    statsCookie.jsFiles = localEntries.filter(entry => entry.name.includes("js") && entry.transferSize !== 0).length;
    statsCookie.filesSavedByCache = cachedEntries.length;
    
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
if (!settingsCookie.renderBlocking) {
    window.addEventListener('load', () => {
        // Used for pages where images load faster than the eventListener assignment
        const imagesLoaded = window.performance.getEntries().filter(entry => entry.initiatorType === "img");
        if (imagesLoaded.length === imgs.length && !synced) {
            synced = true;
            setTimeout(pageLoadedHandler, 0);
        }
    });
} else {
    const imagesLoaded = window.performance.getEntries().filter(entry => entry.initiatorType === "img");
    if (imagesLoaded.length === imgs.length && !synced) {
        synced = true;
        setTimeout(pageLoadedHandler, 0);
    }
}
