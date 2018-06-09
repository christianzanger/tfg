import Cookie from './Cookie.js';

window.addEventListener('statsUpdate', () => {
    const statsCookie = new Cookie("stats");
    document.getElementById("avgLoadTime").innerHTML = statsCookie.obj.averageLoadTime;
    document.getElementById("pageLoads").innerHTML = statsCookie.obj.numberOfLoads.toString();
    document.getElementById("nImages").innerHTML = statsCookie.obj.images.numberOfImages.toString();
    document.getElementById("downloadedBytes").innerHTML = statsCookie.obj.images.downloadedBytes.toString();
});

// TODO: add reset button
// document.getElementById('reset').addEventListener('click', () => {
//     console.log("reset");
// });