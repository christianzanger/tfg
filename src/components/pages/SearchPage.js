import React from 'react';
import ReactDOM from "react-dom";
import Header from '../Header';
import SearchResults from '../SearchResults';
import SettingsCookie from "../../../public/scripts/cookies/SettingsCookie.js";

class SearchPage extends React.Component {
    state = {};

    render () {
        const settingsCookie = new SettingsCookie();
        const cached = settingsCookie.cache ? '/cached' : '';
        const materializeJS = document.createElement('script');
        const classicApp = document.createElement('script');
        const search = document.createElement('script');
        const icons = document.createElement('link');
        const styles = document.createElement('link');

        materializeJS.src = `${cached}/scripts/materialize.min.js`;
        classicApp.crossOrigin = "use-credentials";
        classicApp.type = "module";
        classicApp.src = `${cached}/scripts/classicApp.js`;
        search.src = `${cached}/scripts/search.js`;
        search.type = "module";
        search.crossOrigin = "use-credentials";


        icons.rel = "stylesheet";
        icons.href = `${cached}/styles/icons.css`;
        styles.rel = "stylesheet";
        styles.type = "text/css";
        styles.href = `${cached}/styles/styles.css`;

        document.head.appendChild(icons);
        document.head.appendChild(styles);

        document.body.appendChild(materializeJS);
        document.body.appendChild(classicApp);
        document.body.appendChild(search);
        return (
            <div className="app">
                <Header />
                <SearchResults />
            </div>
        );
    }
}

ReactDOM.render(<SearchPage />, document.getElementById('app'));