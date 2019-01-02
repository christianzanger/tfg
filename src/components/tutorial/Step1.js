import React from 'react';
import SettingsCookie from "../../../public/scripts/cookies/SettingsCookie";

export default class Step1 extends React.Component {

    constructor(props) {
        super(props);

        this.handleYesClick = this.handleYesClick.bind(this);
    }

    handleYesClick() {
        const settingsCookie = new SettingsCookie();
        settingsCookie.tutorialStep = 2;
        settingsCookie.update();
        this.props.updateParent();
    }

    handleDismissal() {
        const settingsCookie = new SettingsCookie();
        if (settingsCookie.tutorialStep !== 2) {
            settingsCookie.tutorialStep = -1;
            settingsCookie.update()
        }
    }

    componentDidMount() {
        const $materializeJS = document.getElementById('materializeJS');
        $materializeJS.addEventListener('load', () => {
            const $modal = document.getElementById('modal1');
            const modalSettings = {
                onCloseEnd: this.handleDismissal
            };
            const instance = M.Modal.init($modal, modalSettings);
            instance.open();
        });
    }

    render() {
        return (
            <div id="modal1" className="modal modal--small">
                <div className="modal__header">
                    <h4><strong>Do you want to try out the tutorial?</strong></h4>
                </div>
                <div className="modal-content">
                    Hello! Is this your first time here? You might be interested in doing this tutorial!
                    <br/><br/>
                    Interactive Web Performance is a website that's all about web performance.
                    There are tools like <a href="https://web.dev/" target="_blank">Google's web.dev</a> that analyse a specific
                    webpage for increasing it's performance, but this site is all about teaching you about
                    web performance: its impact on bytes downloaded (and therefore load speed) most of all.
                    <br/><br/>
                    This page came as an idea to me during one of my CS degree courses, SOB, where the basics of websites were explained
                    to us. In the university I'm studying, Universitat Rovira i Virgili, there aren't really manny courses on web related
                    subjects so I thought of this tool as an initiative of teaching web performance, and more specifically, a tool for SOB.
                    <br/><br/>
                    So if you want to try out this tool there's a tutorial that explains step by step how to change this page's settings
                    and see how it affects the bytes that are downloaded, among other information!
                </div>
                <div className="modal-footer modal__footer">
                    <a
                        className="modal-close waves-effect waves-green btn green"
                        id="step1Button"
                        onClick={this.handleYesClick}
                    >
                        Sure!
                    </a>
                    <a className="waves-effect waves-light btn red modal-close">No</a>
                    <a className="waves-effect btn urv" href="http://www.urv.cat/en/" target="_blank">
                        <img src="http://www.urv.cat/media/img/logo-urv-nav.png" className="right"/>
                        More about URV!
                    </a>
                </div>
            </div>
        );
    }
}