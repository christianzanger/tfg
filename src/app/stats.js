import Cookie from './Cookie.js';

window.addEventListener('statsUpdate', () => {
    const statsCookie = new Cookie("stats");
    document.getElementById("avgLoadTime").innerHTML = statsCookie.obj.averageLoadTime;
    document.getElementById("pageLoads").innerHTML = statsCookie.obj.numberOfLoads.toString();
});

async function syncStatsWithServer() {
    return await (await fetch('/sync')).json();
}

syncStatsWithServer().then((data) => {
    const statsCookie = new Cookie("stats");
    statsCookie.obj.images.downloadedBytes = data.images.downloadedBytes;
    statsCookie.obj.images.numberOfImages = data.images.numberOfImages;
    statsCookie.updateCookie();
    // console.log("Stats updated sync: ", statsCookie.obj);

    document.getElementById("nImages").innerHTML = statsCookie.obj.images.numberOfImages.toString();
    document.getElementById("downloadedBytes").innerHTML = statsCookie.obj.images.downloadedBytes.toString() + " Bytes";
});

// TODO: add reset button
// document.getElementById('reset').addEventListener('click', () => {
//     console.log("reset");
// });