import React from 'react';
import {
    BrowserRouter as Router,
    Route, Switch
} from 'react-router-dom';
import ReactDOM from "react-dom";
import SearchForm from "./SearchForm";
import Header from "./Header";
import Statistics from "./Statistics";
import SettingsWrapper from "./settings/SettingsWrapper";
import SearchResults from "./SearchResults";

import "../../public/styles/styles.css";
import "../../public/styles/icons.css";
import "../../public/styles/materialize.min.css";
import "../../public/scripts/vendors/materialize.min.js";
import "../../public/scripts/vendors/Chart.min.js";
import StatsCookie from "../../public/scripts/cookies/StatsCookie";
import SettingsCookie from "../../public/scripts/cookies/SettingsCookie";

class AppRouter extends React.Component {

    constructor(props) {
        super(props);

        this.pageLoadedHandler = this.pageLoadedHandler.bind(this);

        this.state = {
          pageLoaded: false
        };
    }

    pageLoadedHandler() {
        const statsCookie = new StatsCookie();
        const settingsCookie = new SettingsCookie();
        // The last 2 conditions are to filter out the HEAD requests in the search page
        const localEntries = window.performance.getEntries()
            .filter(entry => entry.initiatorType !== "fetch" || !entry.name.includes("images"));
        const cachedEntries = localEntries.filter(entry => entry.transferSize === 0);
        const reactDevBytes = 1355907;

        if (settingsCookie.compression) {
            let compressedEntries;
            const compressionAdder = (accumulator, entry) => accumulator + (entry.decodedBodySize - entry.encodedBodySize);
            if (settingsCookie.cache && cachedEntries.length > 0) {
                compressedEntries = localEntries.filter(entry => entry.decodedBodySize && entry.transferSize !== 0);
            } else {
                compressedEntries = localEntries.filter(entry => entry.decodedBodySize);
            }

            statsCookie.bytesSavedByCompression  = compressedEntries.reduce(compressionAdder, 0);
        }

        if (settingsCookie.cache && cachedEntries.length > 0) {
            statsCookie.bytesSavedByCache = cachedEntries.reduce((accumulator, entry) => accumulator + entry.decodedBodySize, 0);
            if (settingsCookie.minification) {
                statsCookie.bytesSavedByCache += reactDevBytes;
            }
        } else {
            statsCookie.bytesSavedByCache = 0;
        }

        if (settingsCookie.minification && cachedEntries.filter(entry => entry.name.includes('bundle')).length === 0) {
            statsCookie.bytesSavedByProd = reactDevBytes;
        } else {
            statsCookie.bytesSavedByProd = 0;
        }

        statsCookie.bytes = localEntries.filter(entry => entry.transferSize).reduce((accumulator, entry) => accumulator + entry.transferSize, 0);

        statsCookie.images = localEntries.filter(entry => entry.name.includes("images") && entry.transferSize !== 0).length;
        statsCookie.cssFiles = localEntries.filter(entry => entry.name.includes("css") && entry.transferSize !== 0).length;
        statsCookie.jsFiles = localEntries.filter(entry => entry.name.includes("js") && entry.transferSize !== 0).length;
        statsCookie.filesSavedByCache = cachedEntries.length;

        statsCookie.updateStats();

        fetch('/savehistory', {
            credentials: "same-origin",
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({page: window.location.href}),
        }).then(() => {
            this.setState(() => ({ pageLoaded: true }));
        });
    }

    updateClientSideStats() {
        const statsCookie = new StatsCookie();
        // The last 2 conditions are to filter out the HEAD requests in the search page
        const localEntries = window.performance.getEntries()
            .filter(entry => entry.initiatorType !== "fetch" || !entry.name.includes("images"));
        const totalBytes = localEntries.filter(entry => entry.transferSize).reduce((accumulator, entry) => accumulator + entry.transferSize, 0);
        const imageBytes = localEntries.filter(entry => entry.name.includes('images')).reduce((accumulator, entry) => accumulator + entry.transferSize, 0);

        statsCookie.bytes = imageBytes;
        statsCookie.images = localEntries.filter(entry => entry.name.includes("images") && entry.transferSize !== 0).length;
        statsCookie.cssFiles = localEntries.filter(entry => entry.name.includes("css") && entry.transferSize !== 0).length;
        statsCookie.jsFiles = localEntries.filter(entry => entry.name.includes("js") && entry.transferSize !== 0).length;
        statsCookie.filesSavedByCache = 0;
        statsCookie.bytesSavedByProd = 0;
        statsCookie.bytesSavedByCompression = 0;
        statsCookie.bytesSavedByClientSide = totalBytes - imageBytes;

        statsCookie.updateStats();

        fetch('/savehistory', {
            credentials: "same-origin",
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({page: window.location.href}),
        });
    }

    componentDidMount() {
        window.addEventListener('load', () =>
            setTimeout(this.pageLoadedHandler, 0)
        );
    }

    render() {
        const statistics = (props) => <Statistics {...props} pageLoaded={this.state.pageLoaded} updateClientSideStats={this.updateClientSideStats}/>;
        const settingsWrapper = (props) => <SettingsWrapper {...props} pageLoaded={this.state.pageLoaded} updateClientSideStats={this.updateClientSideStats}/>;
        const searchForm = (props) => <SearchForm {...props} pageLoaded={this.state.pageLoaded} updateClientSideStats={this.updateClientSideStats}/>;
        const searchResults = (props) => <SearchResults {...props} pageLoaded={this.state.pageLoaded} updateClientSideStats={this.updateClientSideStats}/>;

        return (
            <Router>
                <React.Fragment>
                    <Header/>
                    <Switch>
                        <Route path="/stats" render={statistics}/>
                        <Route path="/settings" render={settingsWrapper} />
                        <Route path="/search" render={searchResults} />
                        <Route path="/" render={searchForm} />
                    </Switch>
                </React.Fragment>
            </Router>
        )
    }
}

ReactDOM.render(<AppRouter />, document.getElementById('app'));