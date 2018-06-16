import Cookie from './Cookie.js';

async function syncStatsWithServer() {
    return await (await fetch('/sync')).json();
}

async function resetStats() {
    return await fetch('/stats/reset');
}

syncStatsWithServer().then((data) => {
    const statsCookie = new Cookie("stats");
    statsCookie.obj.images.downloadedBytes = data.images.downloadedBytes;
    statsCookie.obj.images.numberOfImages = data.images.numberOfImages;
    statsCookie.updateCookie();

    document.getElementById("nImages").innerHTML = statsCookie.obj.images.numberOfImages.toString();
    document.getElementById("downloadedBytes").innerHTML = statsCookie.obj.images.downloadedBytes.toString() + " Bytes";
});


document.getElementById('reset').addEventListener('click', () => {
    const statsCookie = new Cookie("stats");
    resetStats().then(() => location.reload());
});

window.addEventListener('statsUpdate', () => {
    const statsCookie = new Cookie("stats");
    document.getElementById("avgLoadTime").innerHTML = statsCookie.obj.averageLoadTime;
    document.getElementById("pageLoads").innerHTML = statsCookie.obj.numberOfLoads.toString();
});