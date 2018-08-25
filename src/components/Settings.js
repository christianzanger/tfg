import React from 'react';
import SettingsCookie from "../../public/scripts/cookies/SettingsCookie.js";
import StatsCookie from "../../public/scripts/cookies/StatsCookie";

export default class SettingsPanel extends React.Component {
    state = {};

    settingsSubmitHandler (event) {
        const settingsCookie = new SettingsCookie();
        const statsCookie = new StatsCookie();
        const data = new FormData(event.target);

        settingsCookie.compression = data.get("compression") === "on";
        settingsCookie.cache = data.get("cache") === "on";
        settingsCookie.update();

        if (!settingsCookie.compression) statsCookie.bytesSavedByCompression = 0;
        if (!settingsCookie.cache) statsCookie.bytesSavedByCache = 0;

        statsCookie.update();

        M.toast({html: 'Settings saved!'});
        event.preventDefault();
    }

    componentDidMount() {
        const settingsCookie = new SettingsCookie();
        document.getElementById("compression").checked = settingsCookie.compression;
        document.getElementById("cache").checked = settingsCookie.cache;

        document.querySelectorAll("[data-collapsible]").forEach(clickable => {
            const collapsible = document.querySelector('.collapsible');
            clickable.addEventListener('click', (e) => {
                const collapsibleToExpand = e.target.dataset.collapsible;
                M.Collapsible.getInstance(collapsible).open(collapsibleToExpand);
            })
        });
    }

    render () {
        return (
            <div className="container">
                <h1 className="center-align settings__header">Settings</h1>
                <div className="settings-panel">
                    <div className="card-panel white">
                        <form id="settings" onSubmit={this.settingsSubmitHandler}>
                            <div className="row">
                                <div className="settings-panel__setting">
                                    <div className="col s2">
                                        Compression
                                    </div>
                                    <div className="col s2" data-collapsible="0">
                                        Explain!
                                    </div>
                                    <div className="switch col s2">
                                        <label>
                                            Off
                                            <input type="checkbox" name="compression" id="compression" />
                                            <span className="lever"></span>
                                            On
                                        </label>
                                    </div>
                                </div>
                                <div className="settings-panel__setting">
                                    <div className="col s2">
                                        Cache assets
                                    </div>
                                    <div className="col s2" data-collapsible="1">
                                        Explain!
                                    </div>
                                    <div className="switch col s2">
                                        <label>
                                            Off
                                            <input type="checkbox" name="cache" id="cache" />
                                            <span className="lever"></span>
                                            On
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <button className="btn waves-effect waves-light amber darken-4" type="submit" name="action">
                                Save
                                <i className="material-icons right">sync</i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}