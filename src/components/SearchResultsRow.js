import React from 'react';
import SearchResultCard from './SearchResultCard';

export default class SearchResultsRow extends React.Component {
    render() {
        const range = [...Array(this.props.cards).keys()];
        return (
            <div className="row">
                {range.map( i => <SearchResultCard featured={i < this.props.featured ? 1 : 0} key={i}/>)}
            </div>
        );
    }
}