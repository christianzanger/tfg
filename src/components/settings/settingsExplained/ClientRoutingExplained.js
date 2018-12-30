import React from "react";

export default class ClientRoutingExplained extends React.Component {
    render () {
        return (
            <li>
                <div className="collapsible-header">
                    <h5><i className="material-icons">call_split</i>Client-side routing</h5>
                </div>
                <div className="collapsible-body white">
                    <i>Disclaimer: client-side routing is heavily tied to modern front-end libraries like <a href="https://reactjs.org/" target="_blank">React </a>
                        or <a href="https://angular.io/" target="_blank">Angular</a> but in my opinion it's still something that you should be aware of :)</i>
                    <br/><br/>
                    <strong>Server-side routing</strong> refers to the standard routing. Earch URL is associated with an HTML document on the server. The client accesses a
                    certain URL and the server responds with said document, the browser parses the HTML and then sends further requests for JS or CSS files.
                    On modern front-end libraries the user normally doesn't download the final HTML but an empty placeholder body with a JS bundle. It's
                    then the library's job to render the view into de DOM with JS.
                    <br/><br/>
                    <strong>Server-side routing</strong> refers to having the front-end library handle the routing. This means that when the URL changes from clicking on a link,
                    <strong> the library detects that and instead of sending a request to the server to download the new document, it renders the necessary components into
                        the view without making a request to the server</strong>. This is specially useful for SPAs or different pages that will always mantain some elements
                    (for example the Header and the Footer and the sidebar will always be visible and rendered). If you need new data for a specific view, you can
                    just make an asynchronous call to your backend instead of serving a whole HTML document with its dependencies!
                    <br/><br/>
                    This also means that the first load will be slower since all of the components will have to be in the initial JS bundle. If you have a page with
                    many different sites this might not be a good idea since it's most likely that the client's downloading components that he'll never see.
                </div>
            </li>
        )
    }
}