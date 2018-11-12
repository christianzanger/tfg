import React from 'react';
import Featured from './Featured';
import SettingsCookie from "../../public/scripts/cookies/SettingsCookie";
import Step1 from "./tutorial/Step1";
import Step2 from "./tutorial/Step2";
import Step6 from "./tutorial/Step6";

export default class SearchForm extends React.Component {

    constructor(props) {
        super(props);

        this.forceRerender = this.forceRerender.bind(this);
    }

    forceRerender() {
        this.forceUpdate();
    }

    search(e) {
        e.preventDefault();
        const $input = document.getElementById("search__text");
        window.location = `/search?q=${encodeURIComponent($input.value)}`
    }

    render () {
        const settingsCookie = new SettingsCookie();
        const isStep1 = settingsCookie.tutorialStep === 1;
        const isStep2 = settingsCookie.tutorialStep === 2;
        const isStep6 = settingsCookie.tutorialStep === 6;

        return (
            <div id="search" className="valign-wrapper">
                { isStep1 && <Step1 updateParent={this.forceRerender}/> }
                { isStep2 && <Step2 /> }
                { isStep6 && <Step6 /> }
                <div className="container amber lighten-3">
                    <form className="" id="search__form" method="get" onSubmit={this.search}>
                        <div className="input-field col s12">
                            <i className="material-icons prefix grey-text text-darken-4">search</i>
                            <input
                                id="search__text"
                                type="text"
                                className="validate amber lighten-5"
                                placeholder="Location"
                                name="q"
                            />
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