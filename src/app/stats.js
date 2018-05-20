window.addEventListener('statsUpdate', () => {
    const sessionStats = JSON.parse(sessionStorage.getItem("stats"));

    document.getElementById("avgLoadTime").innerHTML = sessionStats.averageLoadTime;
    document.getElementById("pageLoads").innerHTML = sessionStats.numberOfLoads;
});