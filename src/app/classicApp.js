const recalcAvgLoadTime = (stats) => {
    const lastSumOfTimes = stats.averageLoadTime * stats.numberOfLoads;
    const currentTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;

    stats.numberOfLoads += 1;
    const newAverage = (lastSumOfTimes + currentTime) / stats.numberOfLoads;
    stats.averageLoadTime = Math.round(newAverage * 100) / 100;

    sessionStorage.setItem("stats", JSON.stringify(stats));
    // console.log(stats);
    window.dispatchEvent(statsUpdatedEvent);
};

const updateStats = () => {
    try {
        const sessionStats = sessionStorage.getItem("stats");

        if (!sessionStats) {
            const defaultStats = {
                averageLoadTime: 0,
                numberOfLoads: 0
            };

            recalcAvgLoadTime(defaultStats);
            sessionStorage.setItem("stats", JSON.stringify(defaultStats));
        } else {
            recalcAvgLoadTime(JSON.parse(sessionStats));
        }
    } catch (e) {
        console.log(e);
        alert('Session storage failed!');
    }
};

const statsUpdatedEvent = new Event('statsUpdate');

// This function has to be deferred so loadEventEnd can have a value
// If it's not deferred, loadEventEnd will equal 0 since it's not really finished yet (and averageLoadTime will be negative).
window.addEventListener('load', () => {setTimeout(updateStats, 0)});
