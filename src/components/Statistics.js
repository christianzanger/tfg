import React from 'react';
import SettingsCookie from "../../public/scripts/cookies/SettingsCookie";
import Step4 from "./tutorial/Step4";
import Step8 from "./tutorial/Step8";

export default class Statistics extends React.Component {
    render () {
        const settingsCookie = new SettingsCookie();
        const isStep4 = settingsCookie.tutorialStep === 4;
        const isStep8 = settingsCookie.tutorialStep === 8;

        return (
            <div>
                {isStep4 && <Step4/>}
                {isStep8 && <Step8/>}
                <div>
                    <div>Average load time: <span id="avgLoadTime">Loading...</span></div>
                    <div>Page loads: <span id="pageLoads">Loading...</span></div>
                    <br />
                    <div>Images downloaded: <span id="nImages">Loading...</span></div>
                </div>
                <div className="row">
                    <div className="col s12 m12 l6">
                        <canvas id="avgLoadTimeChart__canvas"></canvas>
                    </div>
                    <div className="col s12 m12 l6" id="stacked">
                        <canvas id="stacked__canvas"></canvas>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 m12 l6">
                        <canvas id="downloadedBytesChart__canvas"></canvas>
                    </div>
                    <div className="col s12 m12 l6">
                        <canvas id="downloadedBytesChart2__canvas"></canvas>
                    </div>
                </div>
            </div>
        );
    }
}