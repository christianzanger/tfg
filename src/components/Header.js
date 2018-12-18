import React from 'react';
import SettingsCookie from "../../public/scripts/cookies/SettingsCookie";
import StatsCookie from "../../public/scripts/cookies/StatsCookie";
import StatisticsPage from "./pages/StatisticsPage";
import IndexPage from "./pages/IndexPage";
import {Link} from "react-router-dom";

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
                        <li><Link to="/">Home</Link></li>
                        <li><a href="">FAQ</a></li>
                        <li>
                            {/*<a href="/pages/stats.html" id="statsLink">*/}
                                {/*Stats*/}
                            {/*</a>*/}
                            <Link to="/stats" id="statsLink">Stats</Link>
                        </li>
                        <li><a href="/pages/settings.html" id="settingsLink">Settings</a></li>
                        <li className="highlight red"><a onClick={this.resetCookies}>Reset</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}