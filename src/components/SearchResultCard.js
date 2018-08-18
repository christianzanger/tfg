import React from 'react';

export default class SearchResultCard extends React.Component {
    render() {
        const featuredBadge =
            <div className="featured__badge deep-orange lighten-3 deep-orange-text text-darken-4">
                <i className="material-icons deep-orange-text">favorite</i>
                Featured
            </div>;
        return (
            <div className="col s12 m6 l2">
                <div className="card">
                    {this.props.featured ? featuredBadge : ''}
                    <div className="card-image">
                        <img />
                    </div>
                    <div className="card-content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div className="card-action">
                        <a href="#">Visit offer</a>
                    </div>
                </div>
            </div>
        );
    }
}