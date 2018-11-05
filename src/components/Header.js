import React from 'react';
import SettingsCookie from "../../public/scripts/cookies/SettingsCookie";
import StatsCookie from "../../public/scripts/cookies/StatsCookie";

export default class Header extends React.Component {

    resetCookies() {
        SettingsCookie.reset();
        fetch('/stats/reset', {credentials: "same-origin"}).then(() => {
            StatsCookie.reset();
            location.href = "/"
        });
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper amber lighten-2">
                    <a href="#" className="brand-logo right hide-on-med-and-down">Interactive web performance</a>
                    <ul id="nav-mobile" className="left">
                        <li><a href="/">Home</a></li>
                        <li><a href="">FAQ</a></li>
                        <li>
                            <a href="/pages/react/statsReact.html" id="statsLink">
                                Stats
                            </a>
                        </li>
                        <li><a href="/pages/react/settingsReact.html" id="settingsLink">Settings</a></li>
                        <li className="red"><a onClick={this.resetCookies}>Reset</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}