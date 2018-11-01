import React from "react";
import SettingsCookie from "../../../public/scripts/cookies/SettingsCookie";

export default class Step4 extends React.Component {

    startStep4() {
        const $quarter = document.getElementById('quarter');
        $quarter.dataset.tooltip = `In this page you'll see how the performance of the website is going. 
                                   In this particular chart you're seeing the bytes downloaded for every page. 
                                   Since we've visited 3 pages (home, search and now statistics) there are 3 bars. 
                                   When you're ready to get to the interesting part, click on "Settings" in the menu.`;

        $quarter.dataset.position = "top";

        const $tooltiped = document.querySelector('.tooltipped');
        const tooltipInstance =  M.Tooltip.init($tooltiped, {});
        tooltipInstance.isHovered = true;
        tooltipInstance.open();

        const $settingsLink = document.getElementById("settingsLink");
        $settingsLink.className += "highlight amber lighten-2";
        $settingsLink.addEventListener('click', () => {
           const settingsCookie = new SettingsCookie();
           settingsCookie.tutorialStep = 5;
           settingsCookie.update();
        });

        const $tooltip = document.getElementsByClassName("material-tooltip")[0];
        $tooltip.style.left = "40%";
        $tooltip.style.top = "60%";
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
            <React.Fragment>
                <div className="translucent--half"></div>
                <div className="translucent--quarter tooltipped" id="quarter"></div>
            </React.Fragment>
        )
    }
}