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
        const settingsCookie = new SettingsCookie();
        const isStep3 = settingsCookie.tutorialStep === 3;
        const step3Text = "Now that we have some data for our stats, let's take a look at them! When you're ready, click on \"Stats\"";
        const className = isStep3 ? "highlight amber lighten-2 tooltipped" : "";
        const endStep3 = (event) => {
          if (isStep3) {
              event.preventDefault();
              settingsCookie.tutorialStep = 4;
              console.log("Entering step 4");
              settingsCookie.update();
              window.location = "/pages/react/statsReact.html";
          }
        };

        return (
            <nav>
                <div className="nav-wrapper amber lighten-2">
                    <a href="#" className="brand-logo right hide-on-med-and-down">Interactive web performance</a>
                    <ul id="nav-mobile" className="left">
                        <li><a href="/">Home</a></li>
                        <li><a href="">FAQ</a></li>
                        <li>
                            <a href="/pages/react/statsReact.html"
                               className={className}
                               data-position={isStep3 && "bottom"}
                               data-tooltip={isStep3 && step3Text}
                               onClick={endStep3}
                            >
                                Stats
                            </a>
                        </li>
                        <li><a href="/pages/react/settingsReact.html" id="settingsLink">Settings</a></li>
                        <li className="red"><a onClick={this.resetCookies}>Reset Cookies</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}