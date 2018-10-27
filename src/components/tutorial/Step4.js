import React from "react";

export default class Step4 extends React.Component {

    startStep4() {
        const downloadedBytesChart = document.getElementById('stacked');
        downloadedBytesChart.className += " highlight";
    }

    componentDidMount() {
        if (typeof M == "undefined") {
            window.addEventListener('load', this.startStep4);
        } else {
            this.startStep4();
        }
    }

    render() {
        return (
            <div className="translucent-bg"></div>
        )
    }
}