import React from "react";

export default class Step3 extends React.Component {

    startStep3() {
        const $tooltiped = document.querySelector('.tooltipped');
        const tooltipInstance =  M.Tooltip.init($tooltiped, {});
        tooltipInstance.isHovered = true;
        tooltipInstance.open();
    }

    componentDidMount() {
        if (typeof M == "undefined") {
            window.addEventListener('load', this.startStep3);
        } else {
            this.startStep3();
        }
    }

    render() {
        return (
            <div className="translucent-bg"></div>
        )
    }
}