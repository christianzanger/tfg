import React from 'react';
import Featured from './Featured';
import SettingsCookie from "../../public/scripts/cookies/SettingsCookie";
import Step1 from "./tutorial/Step1";
import Step2 from "./tutorial/Step2";

export default class SearchForm extends React.Component {

    componentDidMount() {
        window.addEventListener('load', () => {
            const $tooltip = document.querySelector('.tooltipped');
            const tooltipInstance =  M.Tooltip.init($tooltip, {});
            // TODO: this shit doesn't work (opened tooltip isn't anythwere)!!
            // tooltipInstance.open();
        });
    }

    render () {
        const settingsCookie = new SettingsCookie();
        const step2Text = "Test";

        return (
            <div id="search" className="valign-wrapper">
                { settingsCookie.tutorialStep === 1 && <Step1 updateParent={this.forceUpdate.bind(this)}/> }
                { settingsCookie.tutorialStep === 2 && <Step2 /> }
                <div className="container amber lighten-3">
                    <form className="" id="search__form" action="/search" method="get">
                        <div className="input-field col s12">
                            <i className="material-icons prefix grey-text text-darken-4">search</i>
                            <input
                                id="search__text"
                                type="text"
                                className={`validate amber lighten-5 ${settingsCookie.tutorialStep === 2 && 'highlight tooltipped'}`}
                                data-position={settingsCookie.tutorialStep === 2 && "bottom"}
                                data-tooltip={settingsCookie.tutorialStep === 2 && step2Text}
                                disabled={settingsCookie.tutorialStep === 2 && "true"}
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