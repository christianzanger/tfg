import React from "react";
import SettingsCookie from "../../../public/scripts/cookies/SettingsCookie";

export default class Step4 extends React.Component {

    componentDidMount() {
        const $settingsLink = document.getElementById("settingsLink");
        document.body.style.overflow = "hidden";

        $settingsLink.classList.add('highlight', 'amber', 'lighten-2');
        $settingsLink.addEventListener('click', event => {
            event.preventDefault();
            const settingsCookie = new SettingsCookie();
            settingsCookie.tutorialStep = 5;
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
                        In this page you'll see how the performance of the website is going.
                        In this particular chart you're seeing the bytes downloaded for every page.
                        Since we've visited 3 pages (home, search and now statistics) there are 3 bars.
                        When you're ready to get to the interesting part, click on "Settings" in the menu
                    </div>
                </div>
            </React.Fragment>
        )
    }
}