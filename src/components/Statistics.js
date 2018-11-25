import React from 'react';
import SettingsCookie from "../../public/scripts/cookies/SettingsCookie";
import Step4 from "./tutorial/Step4";
import Step8 from "./tutorial/Step8";
import StatsPanel from "./StatsPanel";

export default class Statistics extends React.Component {
    render () {
        const settingsCookie = new SettingsCookie();
        const isStep4 = settingsCookie.tutorialStep === 4;
        const isStep8 = settingsCookie.tutorialStep === 8;

        return (
            <div>
                {isStep4 && <Step4/>}
                {isStep8 && <Step8/>}
                <div className="row">
                    {/*<div className="col s12 m12 l6">*/}
                        {/*<canvas id="avgLoadTimeChart__canvas"></canvas>*/}
                    {/*</div>*/}
                    <div className="col s12 m12 l4">
                        <StatsPanel/>
                    </div>
                    <div className="col s12 m12 l7 card-panel white" id="stacked">
                        <canvas id="stacked__canvas"></canvas>
                    </div>
                </div>
                {/*<div className="row">*/}
                    {/*<div className="col s12 m12 l6">*/}
                        {/*<canvas id="downloadedBytesChart__canvas"></canvas>*/}
                    {/*</div>*/}
                    {/*<div className="col s12 m12 l6">*/}
                        {/*<canvas id="downloadedBytesChart2__canvas"></canvas>*/}
                    {/*</div>*/}
                {/*</div>*/}
            </div>
        );
    }
}