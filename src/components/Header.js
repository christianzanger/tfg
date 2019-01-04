import React from 'react';
import SettingsCookie from "../../public/scripts/cookies/SettingsCookie";
import StatsCookie from "../../public/scripts/cookies/StatsCookie";
import NavigationLink from "./NavigationLink";


export default class Header extends React.Component {

    resetCookies() {
        fetch('/stats/reset', {credentials: "same-origin"}).then(() => {
            SettingsCookie.reset();
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
                        <li>
                            <NavigationLink url="/" text="Home" />
                        </li>
                        <li>
                            <NavigationLink url="/stats" id="statsLink" text="Stats" />
                        </li>
                        <li>
                            <NavigationLink url="/settings" id="settingsLink" text="Settings" />
                        </li>
                        <li className="highlight red">
                            <a onClick={this.resetCookies}>Reset</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}