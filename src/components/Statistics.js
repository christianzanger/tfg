import React from 'react';

export default class Statistics extends React.Component {
    render () {
        return (
            <div>
                <div>
                    <div>Average load time: <span id="avgLoadTime">Loading...</span></div>
                    <div>Page loads: <span id="pageLoads">Loading...</span></div>
                    <br />
                    <div>Images downloaded: <span id="nImages">Loading...</span></div>
                </div>
                <div id="avgLoadTimeChart" className="row">
                    <div className="col s12 m12 l6">
                        <canvas id="avgLoadTimeChart__canvas"></canvas>
                    </div>
                    <div className="col s12 m12 l6">
                        <canvas id="stacked__canvas"></canvas>
                    </div>
                </div>
                <div id="downloadedBytesChart" className="row">
                    <div className="col s12 m12 l6">
                        <canvas id="downloadedBytesChart__canvas"></canvas>
                    </div>
                </div>
                <div id="downloadedBytesChart2" className="row">
                    <div className="col s12 m12 l6">
                        <canvas id="downloadedBytesChart2__canvas"></canvas>
                    </div>
                </div>
            </div>
        );
    }
}