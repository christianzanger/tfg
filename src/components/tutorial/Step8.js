import React from "react";
import SettingsCookie from "../../../public/scripts/cookies/SettingsCookie";

export default class Step8 extends React.Component {

    componentDidMount() {
        const $settingsLink = document.getElementById("settingsLink");
        document.body.style.overflow = "hidden";

        $settingsLink.classList.add('highlight', 'amber', 'lighten-2');
        $settingsLink.addEventListener('click', event => {
            event.preventDefault();
            const settingsCookie = new SettingsCookie();
            settingsCookie.tutorialStep = 9;
            settingsCookie.update();
            window.location.href = "/pages/react/settingsReact.html"
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="translucent--half"></div>
                <div className="translucent--quarter">
                    <div className="tutorial-panel step4">
                        The colors have changed! Green is still the bytes that the browser's downloaded
                        but, as you can see, since we've enabled compression this number has gone down a lot!
                        The pink color represents the bytes that we didn't have to download thanks to compression.
                        When you're ready, click on "Settings".
                    </div>
                </div>
            </React.Fragment>
        )
    }
}