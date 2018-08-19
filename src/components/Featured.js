import React from 'react';
import Cookie from '../../public/scripts/Cookie';

export default class Featured extends React.Component {
    render () {
        const settingsCookie = new Cookie("settings");
        const cached = settingsCookie.obj.settings && settingsCookie.obj.settings.cache ? '/cached' : '';
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