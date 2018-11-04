import React from "react";
import SettingsCookie from "../../../public/scripts/cookies/SettingsCookie";

export default class Step3 extends React.Component {

    componentDidMount() {
        const $statsLink = document.getElementById('statsLink');
        const settingsCookie = new SettingsCookie();

        $statsLink.classList.add('highlight', 'amber', 'lighten-2');

        $statsLink.addEventListener('click', (event) => {
            event.preventDefault();
            settingsCookie.tutorialStep = 4;
            console.log("Entering step 4");
            settingsCookie.update();
            window.location = "/pages/react/statsReact.html";
        })
    }

    render() {
        return (
            <div className="translucent">
                <div className="tutorial-panel step3">
                    Now that we have some data for our stats, let's take a look at them! When you're ready, click on "Stats"
                </div>
            </div>
        )
    }
}