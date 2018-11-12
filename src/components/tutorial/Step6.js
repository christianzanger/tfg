import React from "react";
import SettingsCookie from "../../../public/scripts/cookies/SettingsCookie";

export default class Step6 extends React.Component {

    componentDidMount() {
        const $search = document.getElementById("search__form");
        $search.addEventListener('submit', () => {
            const settingsCookie = new SettingsCookie();
            settingsCookie.tutorialStep = 7;
            settingsCookie.update();
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="translucent--step6--1"></div>
                <div className="translucent--step6--2"></div>
                <div className="translucent--step6--3">
                    <div className="tutorial-panel step6">
                        Now that we have compression enabled, let's search again to compare it. This time, search for whatever you want :)
                        If you're out of ideas, try Barcelona!
                    </div>
                </div>
                <div className="translucent--step6--4"></div>
            </React.Fragment>
        )
    }
}