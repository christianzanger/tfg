import React from "react";
import SettingsCookie from "../../../public/scripts/cookies/SettingsCookie";

export default class Step7 extends React.Component {

    componentDidMount() {
        const $statsLink = document.getElementById('statsLink');
        const settingsCookie = new SettingsCookie();

        $statsLink.classList.add('highlight', 'amber', 'lighten-2');

        $statsLink.addEventListener('click', (event) => {
            event.preventDefault();
            settingsCookie.tutorialStep = 8;
            settingsCookie.update();
            window.location = "/pages/react/statsReact.html";
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="translucent">
                    <div className="tutorial-panel step3">
                        Let's see how the statistics have changed now that we have compression enabled. Click on "Stats" when you're ready
                    </div>
                </div>
            </React.Fragment>
        )
    }
}