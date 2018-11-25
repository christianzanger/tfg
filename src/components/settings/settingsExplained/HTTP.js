import React from 'react';

export default class HTTP extends React.Component {
    render() {
        const className = `http card col m5 grey lighten-4 ${this.props.offset}`;
        return (
            <div className={className}>
                <div className="card-content">
                    <span className="card-title"><strong>{this.props.method}</strong></span>
                    { this.props.url && <span><strong>Request URL: </strong>{this.props.url}<br /></span>}
                    { this.props.acceptEncoding && <span><strong>Accept-Encoding: </strong>{this.props.acceptEncoding}<br /></span>}
                    { this.props.contentEncoding && <span><strong>Content-Encoding: </strong>{this.props.contentEncoding}<br /></span>}
                    { this.props.vary && <span><strong>Vary: </strong>{this.props.vary}<br /></span>}
                    { this.props.cacheControl && <span><strong>Cache-Control: </strong>{this.props.cacheControl}<br /></span>}
                </div>
            </div>
        )
    }
}