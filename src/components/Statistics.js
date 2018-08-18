import React from 'react';
import Cookie from "../../public/scripts/Cookie";

export default class Statistics extends React.Component {
    state = {};

    render () {
        return (
            <div>
                <div>
                    <div>Average load time: <span id="avgLoadTime">Loading...</span></div>
                    <div>Page loads: <span id="pageLoads">Loading...</span></div>
                    <br />
                    <div>Images downloaded: <span id="nImages">Loading...</span></div>
                    <div>Bytes of images downloaded: <span id="downloadedBytes">Loading...</span></div>
                </div>
                <input type="button" id="reset" value="Reset stats" />
                <div id="avgLoadTimeChart" className="row">
                    <div className="col s12 m12 l6">
                        <canvas id="avgLoadTimeChart__canvas"></canvas>
                    </div>
                </div>
                <div id="downloadedBytesChart" className="row">
                    <div className="col s12 m12 l6">
                        <canvas id="downloadedBytesChart__canvas"></canvas>
                    </div>
                </div>
            </div>
        );
    }
}