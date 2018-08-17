import React from 'react';

export default class Header extends React.Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper amber lighten-2">
                    <a href="#" className="brand-logo right hide-on-med-and-down">A generic travel agency</a>
                    <ul id="nav-mobile" className="left">
                        <li><a href="">Home</a></li>
                        <li><a href="">FAQ</a></li>
                        <li><a href="/pages/statistics.html">Stats</a></li>
                        <li><a href="/pages/settings.html">Settings</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}