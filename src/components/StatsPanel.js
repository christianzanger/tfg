import React from "react";

export default class StatsPanel extends React.Component {
    render() {
        return (
            <div className="card-panel white" id="statsPanel">
                <h4>General statistics</h4>
                <div>Average load time: <span id="avgLoadTime">Loading...</span> ms</div>
                <div>Pages loaded: <span id="pageLoads">Loading...</span></div>
                <div className="hidden">Savings from compression: <span id="compressionSavings">Loading...</span></div>
                <div className="hidden">Savings from cache: <span id="cacheSavings">Loading...</span></div>
                <br />
                <h4>Downloaded resources</h4>
                <div>Images: <span id="nImages">Loading...</span></div>
                <div>Javascript files: <span id="jsFiles">Loading...</span></div>
                <div>CSS files: <span id="cssFiles">Loading...</span></div>
                <div className="hidden">Files not downloaded thanks to cache: <span id="cachefileSavings">Loading...</span></div>
            </div>
        )
    }
}