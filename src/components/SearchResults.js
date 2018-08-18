import React from 'react';
import SearchResultsRow from './SearchResultsRow';

export default class SearchResults extends React.Component {
    render () {
        return (
            <div>
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
                <SearchResultsRow featured={3} cards={6}/>
                <SearchResultsRow cards={6}/>
            </div>
        );
    }
}