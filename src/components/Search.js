import React from 'react';
import Featured from './Featured';

export default class Search extends React.Component {
    render () {
        return (
            <div id="search" className="valign-wrapper">
                <div className="container amber lighten-3">
                    <form className="" id="search__form" action="/search" method="get">
                        <div className="input-field col s12">
                            <i className="material-icons prefix grey-text text-darken-4">search</i>
                            <input id="search__text" type="text" className="validate amber lighten-5"
                                   placeholder="Location" name="q" />
                        </div>
                    </form>
                    <div id="featured" className="row">
                        <Featured imageId={1} />
                        <Featured imageId={2} />
                        <Featured imageId={3} />
                    </div>
                </div>
            </div>
        );
    }
}