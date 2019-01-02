import React from 'react';
import ReactDOM from "react-dom";
import Header from '../Header';
import Statistics from '../Statistics';
import SettingsCookie from "../../../public/scripts/cookies/SettingsCookie.js";

export default class StatisticsPage extends React.Component {
    state = {};

    render () {
        const settingsCookie = new SettingsCookie();
        const cached = settingsCookie.cache ? '/cached' : '';
        const minification = settingsCookie.minification ? '/minified' : '';
        const minificationExtension = settingsCookie.minification ? '.min' : '';

        const materializeJS = document.createElement('script');
        const classicApp = document.createElement('script');
        const chartjs = document.createElement('script');
        const stats = document.createElement('script');

        const icons = document.createElement('link');
        const styles = document.createElement('link');

        materializeJS.src = `${cached}/scripts/vendors/materialize.min.js`;
        materializeJS.id = 'materializeJS';
        classicApp.src = `${cached}${minification}/scripts/classicApp${minificationExtension}.js`;
        classicApp.type = "module";
        classicApp.crossOrigin = "use-credentials";
        chartjs.src = `${cached}/scripts/vendors/Chart.min.js`;
        chartjs.onload = () => stats.src = `${cached}${minification}/scripts/stats${minificationExtension}.js`;
        stats.type = "module";
        stats.crossOrigin = "use-credentials";


        icons.rel = "stylesheet";
        icons.href = `${cached}/styles/icons.css`;
        styles.rel = "stylesheet";
        styles.type = "text/css";
        styles.href = `${cached}/styles/styles.css`;

        document.head.appendChild(icons);
        document.head.appendChild(styles);

        document.body.appendChild(materializeJS);
        document.body.appendChild(chartjs);
        document.body.appendChild(stats);
        document.body.appendChild(classicApp);
        return (
            <React.Fragment>
                <Header />
                <Statistics />
            </React.Fragment>
        );
    }
}

ReactDOM.render(<StatisticsPage />, document.getElementById('app'));