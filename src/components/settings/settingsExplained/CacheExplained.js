import React from "react";
import HTTP from "./HTTP";

export default class CacheExplained extends React.Component {
    render() {
        return (
            <li>
                <div className="collapsible-header">
                    <h5><i className="material-icons">move_to_inbox</i>Cache</h5>
                </div>
                <div className="collapsible-body white">
                    <strong>Cache</strong> or <strong>Caching</strong> refers to store a requested
                    resource for future requests. For example, this page uses the materialize front-end framework.
                    For it to be used, a CSS file provided from them has to be loaded in the page. Since this
                    framework is used for all the pages, this file has to be loaded for each of them and each time it's
                    the same file, it doesn't change over time.<br/><br/>

                    What caching does is storing a copy of this file in the browser the first time it's requested
                    and when this file gets requested from another page, instead of downloading it again from the server
                    it's loaded from the browser's cache. This means less costly resources downloaded from the server,
                    faster loading times and less strain on the server. <strong>Using the browser's cache is
                    one of the most important performance improvements you can do.</strong><br/><br/>

                    It's important to note that caching everything without thinking about it is not recommended. What
                    happens if you update a file and the client has it in cache? The client won't get the updated file,
                    which can reach from no problems at all to a client that can't acces an imporant fix! You can choose
                    how long a file's copy is considered valid, from 15 min to several years. <strong>But always think
                    about how long a file should be cached!</strong><br/><br/>

                    <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching">MDN has a great article about
                    HTTP caching </a> with different techniques. This page uses the <i>Cache-Control</i> HTTP header,
                    using its <i>max-age</i> directive. When the browser sends a request to the server, the server sets
                    this header in the response indicating how long a resource may be stored.
                    <div className="row">
                        <HTTP
                            method="Client request: GET"
                            url="http://localhost:3000/styles/materialize.min.css"
                        />
                        <HTTP
                            method="Server response: HTTP/1.0 200 OK"
                            cacheControl="max-age=259200"
                            offset="offset-m2"
                        />
                    </div>
                </div>
            </li>
        );
    }
}