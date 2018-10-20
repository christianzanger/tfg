import React from 'react';
import ReactDOM from "react-dom";
import Header from '../Header';
import Settings from '../Settings';
import SettingsExplained from '../SettingsExplained';
import SettingsCookie from "../../../public/scripts/cookies/SettingsCookie.js";

class SettingsPage extends React.Component {
    state = {};

    render () {
        const settingsCookie = new SettingsCookie();
        const cached = settingsCookie.cache ? '/cached' : '';

        const materializeJS = document.createElement('script');
        const classicApp = document.createElement('script');

        const icons = document.createElement('link');
        const styles = document.createElement('link');

        materializeJS.src = `${cached}/scripts/materialize.min.js`;
        materializeJS.onload = () => {
            const collapsibles = document.querySelectorAll('.collapsible');
            M.Collapsible.init(collapsibles);
        };
        classicApp.src = `${cached}/scripts/classicApp.js`;
        classicApp.type = "module";
        classicApp.crossOrigin = "use-credentials";

        icons.rel = "stylesheet";
        icons.href = `${cached}/styles/icons.css`;
        styles.rel = "stylesheet";
        styles.type = "text/css";
        styles.href = `${cached}/styles/styles.css`;

        document.head.appendChild(icons);
        document.head.appendChild(styles);

        document.body.appendChild(materializeJS);
        document.body.appendChild(classicApp);
        return (
            <React.Fragment>
                <Header />
                <Settings />
                <SettingsExplained />
            </React.Fragment>
        );
    }
}

ReactDOM.render(<SettingsPage />, document.getElementById('app'));