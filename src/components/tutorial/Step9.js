import React from "react";
import SettingsCookie from "../../../public/scripts/cookies/SettingsCookie";

export default class Step9 extends React.Component {

    componentDidMount() {
        const $compressionExplainedDropdown = document.getElementById("compressionExplainedDropdown");
        $compressionExplainedDropdown.addEventListener('click', () => {
            const settingsCookie = new SettingsCookie();
            settingsCookie.tutorialStep = 10;
            settingsCookie.update();
            this.props.updateParent()
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="translucent--step9--1"></div>
                <div className="translucent--step9--2"></div>
                <div className="translucent--step9--3">
                    <div className="tutorial-panel step9">
                        If you're curious about how compression works, you've got an explanation just here waiting to be clicked.
                        That's it for the tutorial, as soon you click on the big white "Compression" dropdown, you're free to
                        try out all the different settings (all of them have an explanation just like this!). Try to get the downloaded
                        bytes as low as possible! :)
                    </div>
                </div>
                <div className="translucent--step9--4"></div>
            </React.Fragment>
        )
    }
}