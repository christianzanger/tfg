import React from 'react';
import HTTP from './HTTP';
import Step9 from "./tutorial/Step9";
import SettingsCookie from "../../public/scripts/cookies/SettingsCookie";

export default class SettingsExplained extends React.Component {
    constructor(props) {
        super(props);

        this.forceRerender = this.forceRerender.bind(this);
    }

    forceRerender() {
        this.forceUpdate();
    }

    render () {
        const settingsCookie = new SettingsCookie();
        const isStep9 = settingsCookie.tutorialStep === 9;

        return (
            <div className="container">
                {isStep9 && <Step9 updateParent={this.forceRerender}/>}
                <h1 className="center-align settings__header">How it works</h1>
                <ul className="collapsible popout" id="compressionExplainedDropdown">
                    <li>
                        <div className="collapsible-header">
                            <h5><i className="material-icons">work</i>Compression</h5>
                        </div>
                        <div className="collapsible-body white">
                            <strong>Compression</strong> refers to compressing the HTTP body in the server and decompressing it
                            on the client side. Intermediares (mostly proxies) are ignored, this type of compression is referred to as
                            <strong> end-to-end compression</strong>.<br /><br />
                            An HTTP request sent by a client usually contains an <i>Accept-Encoding</i> header, which declares to the server what
                            content encoding the client is able to understand. These encodings are usually compression algorithms like gzip or deflate.
                            From the accepted encodings sent by the client, the server picks one it supports and compresses the response's body with the
                            chosen compressing algorithm. It then adds the <i>Content-Encoding</i> header to the response to tell the client which
                            algorithm was chosen.
                            <br /><br />As this resource may get cached, the <i>Vary</i> header with <i>Accept-Encoding</i> has to
                            be added to the response, too. This means that when the client launches another request of the same resource and has caching enabled,
                            the encoding has to match as well.

                            <br/>
                            <div className="row">
                                <HTTP
                                    method="Client request: GET"
                                    url="http://localhost:3000/styles/styles.css"
                                    acceptEncoding="gzip, deflate, br"
                                />
                                <HTTP
                                    method="Server response: HTTP/1.0 200 OK"
                                    contentEncoding="gzip"
                                    offset="offset-m2"
                                    vary="Accept-Encoding"
                                />
                            </div>
                            Compression is extremely effective on text based files, like CSS and JavaScript. For example, the JavaScript file for the
                            Materialize framework is uncompressed 174.98 KB, while compressed it's 41.2 KB! On a modern web app that uses a lot of JavaScript
                            and CSS, compression is really important to lower the download time of these resources. On the other hand, on assets like images with
                            formats that are already highly compressed, end-to-end compression won't do much. For example, the home page's background image is
                            383 KB uncompressed, while compressed it's 382 KB.
                            <h5>When and what to compress</h5>
                            As explained above, compressing files that are based on text like HTML, CSS and JavaScript is great. Compressing files like images and
                            videos isn't. That's why you should choose what to compress and what not instead of blindly compressing everything. Don't waste server resources
                            on images when it's not that efficient. You can always try to compress everything (like this website) and see the numbers for yourself with tools like
                            <i>window.performance.getEntries()</i>which returns each request made from the client. Each element has an <i>encodedBodySize</i> and a <i>decodedBodySize</i>
                            which shows how much compression affected a file. It's also more reliable than using Chrome's network tab since the HTTP headers may be included in the file
                            sizes and the headers don't get compressed.
                        </div>
                    </li>
                    <li>
                        <div className="collapsible-header">
                            <h5><i className="material-icons">move_to_inbox</i>Cache</h5>
                        </div>
                        <div className="collapsible-body white">
                            <span>Lorem ipsum dolor sit amet.</span>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}