import React from 'react';
import ReactDOM from "react-dom";
import Header from '../Header';
import SearchResults from '../SearchResults';

class Search extends React.Component {
    state = {};

    render () {
        return (
            <div className="app">
                <Header />
                <SearchResults />
            </div>
        );
    }
}

ReactDOM.render(<Search />, document.getElementById('app'));