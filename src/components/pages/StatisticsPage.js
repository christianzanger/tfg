import React from 'react';
import ReactDOM from "react-dom";
import Header from '../Header';
import Statistics from '../Statistics';
import Cookie from "../../../public/scripts/Cookie";

class StatisticsPage extends React.Component {
    state = {};

    render () {
        const settingsCookie = new Cookie("settings");
        const cached = settingsCookie.obj.settings.cache ? '/cached' : '';
        const materializeJS = document.createElement('script');
        const classicApp = document.createElement('script');
        const chartjs = document.createElement('script');
        const stats = document.createElement('script');

        const icons = document.createElement('link');
        const styles = document.createElement('link');

        materializeJS.src = `${cached}/scripts/materialize.min.js`;
        classicApp.src = `${cached}/scripts/classicApp.js`;
        classicApp.type = "module";
        chartjs.src = `${cached}/scripts/Chart.min.js`;
        stats.src = `${cached}/scripts/stats.js`;
        stats.type = "module";

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