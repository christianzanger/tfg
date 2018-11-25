import React from "react";
import SettingsCookie from "../../../public/scripts/cookies/SettingsCookie";
import SettingsPanel from "../settings/SettingsPanel";

export default class Step5 extends React.Component {

    componentDidMount() {
        const $compressionSwitch = document.getElementById("compression");
        $compressionSwitch.addEventListener('click', event => {
            event.preventDefault();
            SettingsPanel.compressionSwitchChange();
            const settingsCookie = new SettingsCookie();
            settingsCookie.tutorialStep = 6;
            settingsCookie.update();
            window.location.href = "/";
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="translucent--step5--1"></div>
                <div className="translucent--step5--2"></div>
                <div className="translucent--step5--3">
                    <div className="tutorial-panel step5">
                        In the settings page you can choose what settings you want to activate.
                        For now, let's activate compression and do another search!
                        If you're curious about what compression is and how it works, see the
                        "How it works" section below.
                    </div>
                </div>
                <div className="translucent--step5--4"></div>
            </React.Fragment>
        )
    }
}