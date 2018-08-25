import React from 'react';
import SettingsCookie from '../../public/scripts/cookies/SettingsCookie.js';

export default class Featured extends React.Component {
    render () {
        const settingsCookie = new SettingsCookie();
        const cached = settingsCookie.cache ? '/cached' : '';
        return (
            <div className="row col s4">
                <div className="card">
                    <div
                        className="featured__badge deep-orange lighten-3 deep-orange-text text-darken-4">
                        <i className="material-icons deep-orange-text">favorite</i>
                        Featured
                    </div>
                    <div className="card-image">
                        <img src={`${cached}/images/static/featured${this.props.imageId}.png`} />
                    </div>
                    <div className="card-content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit?.</p>
                    </div>
                    <div className="card-action">
                        <a href="#">Visit offer</a>
                    </div>
                </div>
            </div>
        );
    }
}