import React from "react";
import SettingsCookie from "../../public/scripts/cookies/SettingsCookie";
import {Link} from "react-router-dom";


export default class NavigationLink extends React.Component {

    render() {
        const settingsCookie = new SettingsCookie();
        const url = this.props.url;
        const text = this.props.text;
        const id = this.props.id;

        return settingsCookie.clientSide ? <Link to={url} id={id}>{text}</Link> : <a href={url} id={id}>{text}</a>
    }
}