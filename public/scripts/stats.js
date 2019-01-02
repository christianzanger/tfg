import StatsCookie from "./cookies/StatsCookie.js";

const stacked = document.getElementById('stacked__canvas').getContext('2d');
const stackedBar = new Chart(stacked, {
    type: 'bar',
    data: {
        datasets: [
            {
                label: "Downloaded bytes",
                backgroundColor: 'rgb(51, 204, 51)',
                fill: false,
                yAxisID: 0
            },
            {
                label: "Bytes saved by cache",
                backgroundColor: 'rgb(51, 204, 204)',
                fill: false,
                yAxisID: 0
            },
            {
                label: "Bytes saved by compression",
                backgroundColor: 'rgb(255, 171, 145)',
                fill: false,
                yAxisID: 0
            },
            {
                label: "Bytes saved by prod env",
                backgroundColor: 'rgb(255, 87, 34)'
            },
            {
                label: "Bytes saved by client-side routing",
                backgroundColor: 'rgb(155,89,182)'
            }
        ]
    },
    options: {
        scales: {
            xAxes: [{
                stacked: true,
                ticks: {
                    autoSkip: false
                }
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
        const bytesSavedByCompression = data.reduce((accumulator, entry) => accumulator + entry.bytesSavedByCompression, 0);
        const msWastedByRenderBlocking = data.reduce((accumulator, entry) => accumulator + entry.msWastedByRenderBlocking, 0);
        const bytesSavedByCache = data.reduce((accumulator, entry) => accumulator + entry.bytesSavedByCache, 0);
        const filesSavedByCache = data.reduce((acculator, entry) => acculator + entry.filesSavedByCache, 0);

        if (bytesSavedByCompression > 0) {
            const $compressionSavings = document.getElementById('compressionSavings');
            $compressionSavings.innerHTML = formatBytes(bytesSavedByCompression);
            $compressionSavings.parentElement.classList.remove('hidden');
        }

        if (bytesSavedByCache > 0) {
            const $cacheSavings = document.getElementById('cacheSavings');
            $cacheSavings.innerHTML = formatBytes(bytesSavedByCache);
            $cacheSavings.parentElement.classList.remove('hidden');

            const $cacheFileSavings = document.getElementById('cachefileSavings');
            $cacheFileSavings.innerHTML = filesSavedByCache;
            $cacheFileSavings.parentElement.classList.remove('hidden');
        }

        if (msWastedByRenderBlocking > 0) {
            const $msWastedByRenderBlocking = document.getElementById('msWastedByRenderBlocking');
            $msWastedByRenderBlocking.innerHTML = msWastedByRenderBlocking;
            $msWastedByRenderBlocking.parentElement.classList.remove('hidden');
        }

        document.getElementById("nImages").innerHTML = data.reduce((accumulator, entry) => accumulator + entry.images, 0);
        document.getElementById("jsFiles").innerHTML = data.reduce((accumulator, entry) => accumulator + entry.javascriptFiles, 0);
        document.getElementById("cssFiles").innerHTML = data.reduce((accumulator, entry) => accumulator + entry.cssFiles, 0);

        stackedBar.data.labels = data.map(row => row.page);
        stackedBar.data.datasets[0].data = data.map(row => row.bytes);
        stackedBar.data.datasets[1].data = data.map(row => row.bytesSavedByCache);
        stackedBar.data.datasets[2].data = data.map(row => row.bytesSavedByCompression);
        stackedBar.data.datasets[3].data = data.map(row => row.bytesSavedByProd);
        stackedBar.data.datasets[4].data = data.map(row => row.bytesSavedByClientSide);
        stackedBar.update();
    });
}

const formatBytes = (size, scale = 0) => {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    return size <= 1024 ? `${Math.round(size)} ${sizes[scale]}` : formatBytes(size/1024, ++scale);
};

window.addEventListener('statsUpdate', () => {
    const statsCookie = new StatsCookie();
    document.getElementById("avgLoadTime").innerHTML = statsCookie.averageLoadTime;
    document.getElementById("pageLoads").innerHTML = statsCookie.numberOfLoads.toString();

    getStats();
});


