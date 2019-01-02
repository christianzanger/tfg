import React from "react";

export default class ProductionExplained extends React.Component {
    render () {
        return (
            <li>
                <div className="collapsible-header">
                    <h5><i className="material-icons">public</i>Production mode</h5>
                </div>
                <div className="collapsible-body white">
                    <strong>Production mode</strong>, among other things, refers to setting up right your environment
                    which is very important for modern libraries like <a href="https://reactjs.org/" target="_blank">Facebook's React</a>!
                    <br/><br/>
                    The development library of React, which has many tools that are very helpful while developing, is
                    about 1,3 MB bigger than the production library! 1,3 MB in web is a big number so it's very important for you
                    and your users that production mode is set up right. Many other frameworks and libraries have very similar settings.
                    <br/><br/>
                    In most cases, production mode applies <b>minification of assets</b>, for example in JavaScript. Minification refers to
                    deleting spaces and comments and shortening variable's names since they're only useful while developing. An example of minification
                    could be the following: <i><b>const explicitVariableName = 50;</b></i> can be simplified into something like <i><b>const a = 50;</b></i>.
                    Even if this change seems trivial, it is not. In web, every byte counts an in the end deleting every space, every comment and simplifying
                    every variable/function/class name can add up to a lot of saved bytes. If you're targeting mobile clients think that if your client isn't
                    connected to Wi-Fi, every bytes gets charged from his mobile plan!
                </div>
            </li>
        )
    }
}