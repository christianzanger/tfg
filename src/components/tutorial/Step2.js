import React from "react";
import SettingsCookie from "../../../public/scripts/cookies/SettingsCookie";

export default class Step2 extends React.Component {

    componentDidMount() {
        const $searchInput = document.getElementById('search__text');
        const settingsCookie = new SettingsCookie();
        const search = "Dublin";
        const lastIteration = search.length - 1;
        let offset = 10000;

        $searchInput.classList.add("highlight");
        $searchInput.disabled = true;

        [...search].forEach((char, i) => {
            if (i !== lastIteration) {
                setTimeout(() => $searchInput.value += char, offset);
            } else {
                setTimeout(() => {
                    $searchInput.value += char;
                    settingsCookie.tutorialStep = 3;
                    settingsCookie.update();
                    setTimeout(() => window.location = '/search?q=Dublin', 300);
                }, offset);
            }
            offset += 600;
        });
    }

    render() {
        return (
            <div className="translucent">
                <div className="tutorial-panel step2">
                    Let's first establish a baseline of performance with the default settings.
                    You can search for anything you like! Big cities work well,
                    so let's search for pictures of Dublin. Wait 10 seconds for the input to complete itself :)
                </div>
            </div>
        )
    }
}