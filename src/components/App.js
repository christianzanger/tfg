import React from 'react';
import Header from './Header';
import Search from './Search';

export default class App extends React.Component {
    state = {};

    render () {
        return (
            <div className="app">
                <Header />
                <Search />
            </div>
        );
    }
}