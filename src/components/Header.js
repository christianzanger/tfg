import React from 'react';
import SettingsCookie from "../../public/scripts/cookies/SettingsCookie";
import StatsCookie from "../../public/scripts/cookies/StatsCookie";

export default class Header extends React.Component {

    resetCookies() {
        StatsCookie.reset();
        SettingsCookie.reset();
        location.href = "/";
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper amber lighten-2">
                    <a href="#" className="brand-logo right hide-on-med-and-down">A generic travel agency</a>
                    <ul id="nav-mobile" className="left">
                        <li><a href="/">Home</a></li>
                        <li><a href="">FAQ</a></li>
                        <li><a href="/pages/react/statsReact.html">Stats</a></li>
                        <li><a href="/pages/react/settingsReact.html">Settings</a></li>
                        <li className="red"><a onClick={this.resetCookies}>Reset Cookies</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}