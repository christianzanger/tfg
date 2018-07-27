import Cookie from './Cookie.js';

const statsCookie = new Cookie("stats");
const imageBytes = statsCookie.obj.images.downloadedBytes;
let stats = [];

async function resetStats() {
    return await fetch('/stats/reset', {credentials: "same-origin"});
}

async function getStats() {
    return await fetch('/history', {credentials: "same-origin"}).then( response => {
        return response.json();
    }).then(data => {
        chart.data.labels = [...Array(data.length).keys()];
        chart.data.datasets[0].data = data.map(row => row.avg_load_time);
         chart.update();
    });
}

const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
const formatBytes = (size, scale = 0) => {
    return size <= 1024 ? `${Math.round(size)} ${sizes[scale]}` : formatBytes(size/1024, ++scale);
};

document.getElementById('reset').addEventListener('click', () => {
    resetStats().then(() => {
        location.href = "/";
    });
});

window.addEventListener('statsUpdate', () => {
    const statsCookie = new Cookie("stats");
    document.getElementById("avgLoadTime").innerHTML = statsCookie.obj.averageLoadTime;
    document.getElementById("pageLoads").innerHTML = statsCookie.obj.numberOfLoads.toString();
});

document.getElementById("nImages").innerHTML = statsCookie.obj.images.numberOfImages.toString();
document.getElementById("downloadedBytes").innerHTML = formatBytes(imageBytes);

const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        datasets: [{
            label: "Average load time",
            borderColor: 'rgb(255, 99, 132)',
            fill: false,
        }]
    },

    // Configuration options go here
    options: {}
});

getStats();


