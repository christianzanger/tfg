import React from 'react';
import {
    BrowserRouter as Router,
    Route, Switch
} from 'react-router-dom';
import ReactDOM from "react-dom";
import SearchForm from "./SearchForm";
import Header from "./Header";
import Statistics from "./Statistics";
import styles from "../../public/styles/styles.css";
import icons from "../../public/styles/icons.css";
import materializecss from "../../public/styles/materialize.min.css"

class AppRouter extends React.Component {
    render() {
        return (
            <Router>
                <React.Fragment>
                    <Header/>
                    <Switch>
                        <Route path="/stats" component={Statistics} />
                        <Route path="/" component={SearchForm} />
                    </Switch>
                </React.Fragment>
            </Router>
        )
    }
}

ReactDOM.render(<AppRouter />, document.getElementById('app'));