import React from 'react';
import SettingsCookie from "../../../public/scripts/cookies/SettingsCookie.js";
import StatsCookie from "../../../public/scripts/cookies/StatsCookie";
import Step5 from "../tutorial/Step5";

export default class SettingsPanel extends React.Component {
    static compressionSwitchChange() {
        const settingsCookie = new SettingsCookie();
        const statsCookie = new StatsCookie();

        const data = new FormData(document.getElementById('settings'));
        settingsCookie.compression = data.get("compression") === "on";
        if (!settingsCookie.compression) statsCookie.bytesSavedByCompression = 0;

        settingsCookie.update();
        statsCookie.update();
    }

    cacheSwitchChange() {
        const settingsCookie = new SettingsCookie();
        const statsCookie = new StatsCookie();

        const data = new FormData(document.getElementById('settings'));
        settingsCookie.cache = data.get("cache") === "on";
        if (!settingsCookie.cache) statsCookie.bytesSavedByCache = 0;

        settingsCookie.update();
        statsCookie.update();
    }

    minificationSwitchChange() {
        const settingsCookie = new SettingsCookie();
        const data = new FormData(document.getElementById('settings'));

        settingsCookie.minification = data.get("minification") === "on";
        settingsCookie.update();
    }


    clientSideSwitchChange() {
        const settingsCookie = new SettingsCookie();
        const data = new FormData(document.getElementById('settings'));

        settingsCookie.clientSide = data.get("client-side") === "on";
        settingsCookie.update();
    }

    renderBlockingSwitchChange() {
        const settingsCookie = new SettingsCookie();
        const data = new FormData(document.getElementById('settings'));

        settingsCookie.renderBlocking = data.get("render-blocking") === "on";
        settingsCookie.update();
        console.log(settingsCookie);
    }

    componentDidMount() {
        const settingsCookie = new SettingsCookie();
        document.getElementById("compression").checked = settingsCookie.compression;
        document.getElementById("cache").checked = settingsCookie.cache;
        document.getElementById("minification").checked = settingsCookie.minification;
        document.getElementById("client-side").checked = settingsCookie.clientSide;
        document.getElementById("render-blocking").checked = settingsCookie.renderBlocking;

        document.querySelectorAll("[data-collapsible]").forEach(clickable => {
            const collapsible = document.querySelector('.collapsible');
            clickable.addEventListener('click', (e) => {
                const collapsibleToExpand = e.target.dataset.collapsible;
                M.Collapsible.getInstance(collapsible).open(collapsibleToExpand);
            })
        });
    }

    render () {
        const settingsCookie = new SettingsCookie();
        const isStep5 = settingsCookie.tutorialStep === 5;

        return (
            <div className="container">
                {isStep5 && <Step5 />}
                <h1 className="center-align settings__header">Settings</h1>
                <div className="settings-panel">
                    <div className="card-panel white">
                        <form id="settings" onSubmit={(e) => e.preventDefault()}>
                            <div className="row">
                                <div className="settings-panel__setting">
                                    <div className="col s2">
                                        Compression
                                    </div>
                                    <div className="switch col s2">
                                        <label>
                                            Off
                                            <input type="checkbox" name="compression" id="compression" onClick={SettingsPanel.compressionSwitchChange}/>
                                            <span className="lever"></span>
                                            On
                                        </label>
                                    </div>
                                </div>
                                <div className="settings-panel__setting">
                                    <div className="col s2">
                                        Cache assets
                                    </div>
                                    <div className="switch col s2">
                                        <label>
                                            Off
                                            <input type="checkbox" name="cache" id="cache" onClick={this.cacheSwitchChange} />
                                            <span className="lever"></span>
                                            On
                                        </label>
                                    </div>
                                </div>
                                <div className="settings-panel__setting">
                                    <div className="col s2">
                                        Production mode
                                    </div>
                                    <div className="switch col s2">
                                        <label>
                                            Off
                                            <input type="checkbox" name="minification" id="minification" onClick={this.minificationSwitchChange} />
                                            <span className="lever"></span>
                                            On
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s2">
                                    Client-side routing
                                </div>
                                <div className="switch col s2">
                                    <label>
                                        Off
                                        <input type="checkbox" name="client-side" id="client-side" onClick={this.clientSideSwitchChange}/>
                                        <span className="lever"></span>
                                        On
                                    </label>
                                </div>
                                <div className="col s2">
                                    Render-blocking JS
                                </div>
                                <div className="switch col s2">
                                    <label>
                                        Off
                                        <input type="checkbox" name="render-blocking" id="render-blocking" onClick={this.renderBlockingSwitchChange}/>
                                        <span className="lever"></span>
                                        On
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}