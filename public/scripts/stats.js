import StatsCookie from "./cookies/StatsCookie.js";

const statsCookie = new StatsCookie();
const loadChartDOM = document.getElementById('avgLoadTimeChart__canvas').getContext('2d');
const bytesChartDOM = document.getElementById('downloadedBytesChart__canvas').getContext('2d');
const bytesChartDOM2 = document.getElementById('downloadedBytesChart2__canvas').getContext('2d');
const stacked = document.getElementById('stacked__canvas').getContext('2d');
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

const downloadedBytesChart2 = new Chart(bytesChartDOM2, {
    type: 'line',

    data: {
        datasets: [{
            label: "Downloaded bytes",
            borderColor: 'rgb(51, 204, 51)',
            fill: false,
            yAxisID: 0
        }, {
            label: "Estimated downloaded bytes without cache",
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

const stackedBar = new Chart(stacked, {
    type: 'bar',
    data: {
        datasets: [{
            label: "Downloaded bytes",
            backgroundColor: 'rgb(51, 204, 51)',
            fill: false,
            yAxisID: 0
        }, {
            label: "Bytes saved by cache",
            backgroundColor: 'rgb(51, 204, 204)',
            fill: false,
            yAxisID: 0
        }, {
            label: "Bytes saved by compression",
            backgroundColor: 'rgb(255, 171, 145)',
            fill: false,
            yAxisID: 0
        }]
    },
    options: {
        scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true
            }]
        }
    }
});

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

        downloadedBytesChart2.data.labels = [...Array(data.length).keys()];
        downloadedBytesChart2.data.datasets[0].data = data.map(row => row.bytes);
        downloadedBytesChart2.data.datasets[1].data = data.map(row => row.bytesSavedByCache + row.bytes);
        downloadedBytesChart2.update();

        stackedBar.data.labels = [...Array(data.length).keys()];
        stackedBar.data.datasets[0].data = data.map(row => row.bytes);
        stackedBar.data.datasets[1].data = data.map(row => row.bytesSavedByCache);
        stackedBar.data.datasets[2].data = data.map(row => row.bytesSavedByCompression);
        stackedBar.update();
    });
}

const formatBytes = (size, scale = 0) => {
    return size <= 1024 ? `${Math.round(size)} ${sizes[scale]}` : formatBytes(size/1024, ++scale);
};

document.getElementById('reset').addEventListener('click', () => {
    fetch('/stats/reset', {credentials: "same-origin"});
    location.href = "/";
});

window.addEventListener('statsUpdate', () => {
    // TODO: should this be included? If so, update the graph as well
    const statsCookie = new StatsCookie();
    document.getElementById("avgLoadTime").innerHTML = statsCookie.averageLoadTime;
    document.getElementById("pageLoads").innerHTML = statsCookie.numberOfLoads.toString();


});

document.getElementById("nImages").innerHTML = statsCookie.images.toString();

getStats();


