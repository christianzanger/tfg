import React from 'react';
import Cookie from "../../public/scripts/Cookie";

export default class Settings extends React.Component {
    state = {};

    render () {
        return (
            <div>
                <h1 className="white-text center-align settings__header">Settings</h1>
                <div className="row settings-panel">
                    <div className="col m8 offset-m2 card-panel white">
                        <form id="settings">
                            <div className="row">
                                <div className="settings-panel__setting">
                                    <div className="col s2">
                                        Compression
                                    </div>
                                    <div className="col s2">
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
                                    <div className="col s2">
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