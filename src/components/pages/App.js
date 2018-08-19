import React from 'react';
import Header from '../Header';
import SearchForm from '../SearchForm';
import Cookie from '../../../public/scripts/Cookie';
import ReactDOM from "react-dom";

class Index extends React.Component {
    state = {};

    render () {
        const settingsCookie = new Cookie("settings");
        const cached = settingsCookie.obj.settings && settingsCookie.obj.settings.cache ? '/cached' : '';
        const materializeJS = document.createElement('script');
        const classicApp = document.createElement('script');
        // const materializeCSS = document.createElement('link');
        const icons = document.createElement('link');
        const styles = document.createElement('link');

        materializeJS.src = `${cached}/scripts/materialize.min.js`;
        classicApp.src = `${cached}/scripts/classicApp.js`;
        classicApp.type = "module";

        // materializeCSS.rel = "stylesheet";
        // materializeCSS.href = `/styles/materialize.min.css`;
        icons.rel = "stylesheet";
        icons.href = `${cached}/styles/icons.css`;
        styles.rel = "stylesheet";
        styles.type = "text/css";
        styles.href = `${cached}/styles/styles.css`;


        document.body.appendChild(materializeJS);
        document.body.appendChild(classicApp);

        // document.head.appendChild(materializeCSS);
        document.head.appendChild(icons);
        document.head.appendChild(styles);

        return (
            <div className="app">
                <Header />
                <SearchForm />
            </div>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('app'));