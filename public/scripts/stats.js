import Cookie from './Cookie.js';

const statsCookie = new Cookie("stats");

async function resetStats() {
    return await fetch('/stats/reset', {credentials: "same-origin"});
}

document.getElementById('reset').addEventListener('click', () => {
    resetStats().then(() => {
        location.reload()
    });
});

window.addEventListener('statsUpdate', () => {
    const statsCookie = new Cookie("stats");
    document.getElementById("avgLoadTime").innerHTML = statsCookie.obj.averageLoadTime;
    document.getElementById("pageLoads").innerHTML = statsCookie.obj.numberOfLoads.toString();
});

document.getElementById("nImages").innerHTML = statsCookie.obj.images.numberOfImages.toString();
document.getElementById("downloadedBytes").innerHTML = statsCookie.obj.images.downloadedBytes.toString() + " Bytes";


