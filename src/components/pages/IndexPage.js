import React from 'react';
import ReactDOM from "react-dom";

import Header from '../Header';
import SearchForm from '../SearchForm';
import SettingsCookie from "../../../public/scripts/cookies/SettingsCookie";

class IndexPage extends React.Component {
    render () {
        const settingsCookie = new SettingsCookie();
        const cached = settingsCookie.cache ? '/cached' : '';
        const materializeJS = document.createElement('script');
        const classicApp = document.createElement('script');
        const icons = document.createElement('link');
        const styles = document.createElement('link');

        materializeJS.src = `${cached}/scripts/materialize.min.js`;
        classicApp.src = `${cached}/scripts/classicApp.js`;
        classicApp.type = "module";
        classicApp.crossOrigin = "use-credentials";

        icons.rel = "stylesheet";
        icons.href = `${cached}/styles/icons.css`;
        styles.rel = "stylesheet";
        styles.type = "text/css";
        styles.href = `${cached}/styles/styles.css`;


        document.body.appendChild(materializeJS);
        document.body.appendChild(classicApp);

        document.head.appendChild(icons);
        document.head.appendChild(styles);

        return (
            <React.Fragment>
                <Header />
                <SearchForm />
            </React.Fragment>
        );
    }
}

ReactDOM.render(<IndexPage />, document.getElementById('app'));