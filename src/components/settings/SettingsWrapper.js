import React from "react";
import SettingsPanel from "./SettingsPanel";
import SettingsExplained from "./SettingsExplained";
import SettingsCookie from "../../../public/scripts/cookies/SettingsCookie";

export default class SettingsWrapper extends React.Component {

    componentDidMount() {
        const settingsCookie = new SettingsCookie();
        if (settingsCookie.clientSide && this.props.pageLoaded) {
            this.props.updateClientSideStats();
        }
    }

    render() {
        return (
            <React.Fragment>
                <SettingsPanel />
                <SettingsExplained />
            </React.Fragment>
        );
    }
};