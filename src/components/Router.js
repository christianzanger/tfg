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
import "../../public/styles/styles.css";
import "../../public/styles/icons.css";
import "../../public/styles/materialize.min.css";
import "../../public/scripts/vendors/materialize.min.js";
import "../../public/scripts/vendors/Chart.min.js";

class AppRouter extends React.Component {
    render() {
        return (
            <Router>
                <React.Fragment>
                    <Header/>
                    <Switch>
                        <Route path="/stats" component={Statistics} />
                        <Route path="/settings" component={SettingsWrapper} />
                        <Route path="/" component={SearchForm} />
                    </Switch>
                </React.Fragment>
            </Router>
        )
    }
}

ReactDOM.render(<AppRouter />, document.getElementById('app'));