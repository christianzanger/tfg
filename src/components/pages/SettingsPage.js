import React from 'react';
import ReactDOM from "react-dom";
import Header from '../Header';
import Settings from '../Settings';
import Cookie from "../../../public/scripts/Cookie";

class StatisticsPage extends React.Component {
    state = {};

    render () {
        const settingsCookie = new Cookie("settings");
        const cached = settingsCookie.obj.settings && settingsCookie.obj.settings.cache ? '/cached' : '';

        const materializeJS = document.createElement('script');
        const classicApp = document.createElement('script');
        const settings = document.createElement('script');

        const icons = document.createElement('link');
        const styles = document.createElement('link');

        materializeJS.src = `${cached}/scripts/materialize.min.js`;
        classicApp.src = `${cached}/scripts/classicApp.js`;
        classicApp.type = "module";
        settings.src = `${cached}/scripts/settings.js`;
        settings.type = "module";

        icons.rel = "stylesheet";
        icons.href = `${cached}/styles/icons.css`;
        styles.rel = "stylesheet";
        styles.type = "text/css";
        styles.href = `${cached}/styles/styles.css`;

        document.head.appendChild(icons);
        document.head.appendChild(styles);

        document.body.appendChild(materializeJS);
        document.body.appendChild(settings);
        document.body.appendChild(classicApp);
        return (
            <div className="app">
                <Header />
                <Settings />
            </div>
        );
    }
}

ReactDOM.render(<StatisticsPage />, document.getElementById('app'));