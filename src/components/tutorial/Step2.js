import React from "react";
import SettingsCookie from "../../../public/scripts/cookies/SettingsCookie";

export default class Step2 extends React.Component {

    startStep2() {
        const $tooltiped = document.querySelector('.tooltipped');
        const tooltipInstance =  M.Tooltip.init($tooltiped, {});
        const settingsCookie = new SettingsCookie();
        const search = "Dublin";
        const lastIteration = search.length - 1;
        let offset = 2000;

        tooltipInstance.isHovered = true;
        tooltipInstance.open();

        [...search].forEach((char, i) => {
            if (i !== lastIteration) {
                setTimeout(() => $tooltiped.value += char, offset);
            } else {
                setTimeout(() => {
                    $tooltiped.value += char;
                    settingsCookie.tutorialStep = 3;
                    settingsCookie.update();
                    setTimeout(() => window.location = '/search?q=Dublin', 300);
                }, offset);
            }
            offset += 600;
        })
    }

    componentDidMount() {
        if (typeof M == "undefined") {
            window.addEventListener('load', this.startStep2);
        } else {
            this.startStep2();
        }
    }

    render() {
        return (
            <div className="translucent"></div>
        )
    }
}