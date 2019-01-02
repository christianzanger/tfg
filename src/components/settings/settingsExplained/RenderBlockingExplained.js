import React from "react";

export default class RenderBlockingExplained extends React.Component {
    render () {
        return (
            <li>
                <div className="collapsible-header">
                    <h5><i className="material-icons">block</i>Render-blocking JS</h5>
                </div>
                <div className="collapsible-body white">
                    <strong>Render-blocking JS</strong>, refers to JavaScript that is impeding the visual creation of HTML elements in the browser.
                    <br/><br/>
                    When the HTML that is being read by the browser encounters a JavaScript dependency it stops rendering
                    the page and starts downloading the JavaScript file instead. When the download is complete, it has to be executed.
                    Only after this, the page will start rendering again.
                    <br/><br/>
                    The reason for this is that JavaScript has access to the DOM which can modify the structure of the page.
                    If a component gets rendered which will be eliminated or modified later with JS, that component has been rendered for nothing.
                    The browser has to know the "final" version of the document before it can render the HTML so it doesn't waste
                    any expensive rendering resources. This, unfortunately, means that <strong>if we load a heavy JavaScript file in the
                    HEAD tag of the document nothing will be visible until this heavy file has been downloaded and executed. </strong>
                    A common example of this are external dependencies like jQuery.
                    <br/><br/>
                    A common solution for these situations is to load JS at the very end of the BODY tag so that when the JavaScript starts
                    downloading the page's already rendered. HTML5 introduced the
                    <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script" target="_blank"> async and defer attributes </a>
                    which can be of great help too.
                    <br/><br/>
                    <i>Disclaimer: most of this applies to CSS too! Only load in the HEAD element what's truly necessary for the initial load.</i>
                </div>
            </li>
        )
    }
}