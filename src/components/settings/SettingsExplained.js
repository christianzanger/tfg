import React from 'react';
import Step9 from "../tutorial/Step9";
import SettingsCookie from "../../../public/scripts/cookies/SettingsCookie";
import CompressionExplained from "./settingsExplained/CompressionExplained";
import CacheExplained from "./settingsExplained/CacheExplained";
import ProductionExplained from "./settingsExplained/ProductionExplained";
import ClientRoutingExplained from "./settingsExplained/ClientRoutingExplained";
import RenderBlockingExplained from "./settingsExplained/RenderBlockingExplained";

export default class SettingsExplained extends React.Component {
    constructor(props) {
        super(props);

        this.forceRerender = this.forceRerender.bind(this);
    }

    forceRerender() {
        this.forceUpdate();
    }

    componentDidMount() {
        const settingsCookie = new SettingsCookie();
        if (settingsCookie.clientSide) {
            const collapsibles = document.querySelectorAll('.collapsible');
            M.Collapsible.init(collapsibles);
        }
    }

    render () {
        const settingsCookie = new SettingsCookie();
        const isStep9 = settingsCookie.tutorialStep === 9;

        return (
            <div className="container">
                {isStep9 && <Step9 updateParent={this.forceRerender}/>}
                <h1 className="center-align settings__header">How it works</h1>
                <ul className="collapsible popout" id="compressionExplainedDropdown">
                    <CompressionExplained/>
                    <CacheExplained/>
                    <ProductionExplained/>
                    <ClientRoutingExplained/>
                    <RenderBlockingExplained/>
                </ul>
            </div>
        );
    }
}