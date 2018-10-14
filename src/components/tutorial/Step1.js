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
            console.log("Setting -1");
            settingsCookie.tutorialStep = -1;
            settingsCookie.update()
        }
    }

    componentDidMount() {
        window.addEventListener('load', () => {
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
                    <h4><strong>Want to try out the tutorial?</strong></h4>
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
                </div>
            </div>
        );
    }
}