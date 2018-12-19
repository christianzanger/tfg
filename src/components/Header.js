import React from 'react';
import SettingsCookie from "../../public/scripts/cookies/SettingsCookie";
import StatsCookie from "../../public/scripts/cookies/StatsCookie";
import NavigationLink from "./NavigationLink";
// import StatisticsPage from "./pages/StatisticsPage";
// import IndexPage from "./pages/IndexPage";


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
                        <li>
                            <NavigationLink url="/" text="Home" />
                        </li>
                        <li>
                            <NavigationLink url="#" text="FAQ" />
                        </li>
                        <li>
                            <NavigationLink url="/pages/stats.html" id="statsLink" text="Stats" />
                        </li>
                        <li>
                            <NavigationLink url="/pages/settings.html" id="settingsLink" text="Settings" />
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