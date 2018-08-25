import React from 'react';
import ReactDOM from "react-dom";
import Header from '../Header';
import Statistics from '../Statistics';
import SettingsCookie from "../../../public/scripts/cookies/SettingsCookie.js";

class StatisticsPage extends React.Component {
    state = {};

    render () {
        const settingsCookie = new SettingsCookie();
        const cached = settingsCookie.cache ? '/cached' : '';
        const materializeJS = document.createElement('script');
        const classicApp = document.createElement('script');
        const chartjs = document.createElement('script');
        const stats = document.createElement('script');

        const icons = document.createElement('link');
        const styles = document.createElement('link');

        materializeJS.src = `${cached}/scripts/materialize.min.js`;
        classicApp.src = `${cached}/scripts/classicApp.js`;
        classicApp.type = "module";
        classicApp.crossOrigin = "use-credentials";
        chartjs.src = `${cached}/scripts/Chart.min.js`;
        chartjs.onload = () => stats.src = `${cached}/scripts/stats.js`;
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
            <div className="app">
                <Header />
                <Statistics />
            </div>
        );
    }
}

ReactDOM.render(<StatisticsPage />, document.getElementById('app'));