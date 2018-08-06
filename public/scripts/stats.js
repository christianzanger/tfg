import Cookie from './Cookie.js';

const statsCookie = new Cookie("stats");
const settingsCookie = new Cookie("settings");
const imageBytes = statsCookie.obj.images.downloadedBytes;
const loadChartDOM = document.getElementById('avgLoadTimeChart__canvas').getContext('2d');
const bytesChartDOM = document.getElementById('downloadedBytesChart__canvas').getContext('2d');
const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
const avgLoadTimechart = new Chart(loadChartDOM, {
    type: 'line',

    data: {
        datasets: [{
            label: "Average load time",
            borderColor: 'rgb(255, 99, 132)',
            fill: false,
        }]
    },

    options: {}
});

const downloadedBytesChart = new Chart(bytesChartDOM, {
   type: 'line',

   data: {
       datasets: [{
           label: "Downloaded bytes",
           borderColor: 'rgb(51, 204, 51)',
           fill: false,
           yAxisID: 0
       }, {
           label: "Estimated downloaded bytes without compression",
           borderColor: 'rgb(51, 204, 204)',
           fill: false,
           yAxisID: 0
       }]
   },

    options: {
       scales: {
           yAxes: [{
               ticks: {
                   // beginAtZero: true,
               }
           }]
       }
    }
});

async function resetStats() {
    return await fetch('/stats/reset', {credentials: "same-origin"});
}

async function getStats() {
    return await fetch('/history', {credentials: "same-origin"}).then( response => {
        return response.json();
    }).then(data => {
        avgLoadTimechart.data.labels = [...Array(data.length).keys()];
        avgLoadTimechart.data.datasets[0].data = data.map(row => row.avg_load_time);
        avgLoadTimechart.update();

        downloadedBytesChart.data.labels = [...Array(data.length).keys()];
        downloadedBytesChart.data.datasets[0].data = data.map(row => row.bytes);
        downloadedBytesChart.data.datasets[1].data = data.map(row => row.bytesSavedByCompression + row.bytes);
        downloadedBytesChart.update();
    });
}

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

getStats();


