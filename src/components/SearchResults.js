import React from 'react';
import SearchResultsRow from './SearchResultsRow';
import SettingsCookie from "../../public/scripts/cookies/SettingsCookie";
import Step3 from "./tutorial/Step3";
import Step7 from "./tutorial/Step7";

export default class SearchResults extends React.Component {

    componentDidMount() {
        const settingsCookie = new SettingsCookie();
        if (settingsCookie.clientSide) {
            const imgs = document.querySelectorAll("img");
            const query = window.location.search.substring(3);

            const assignSrc = (img, index) => {
                fetch(`/images/searches/${query}/${index}.png`, {method: 'HEAD', credentials: "same-origin"}).then((response) => {
                    if (response.status === 200) {
                        const settings = new SettingsCookie();
                        const cache =  settings.cache ? '/cached' : '';
                        img.src = `${cache}/images/searches/${query}/${index}.png`;
                    } else {
                        setTimeout(() => assignSrc(img, index), 200);
                    }
                })
            };

            imgs.forEach((img, index) => assignSrc(img, index));

            // Hide the progess bar
            document.querySelector('.progress').style.display = 'none';

            if (this.props.pageLoaded) {
                this.props.updateClientSideStats();
            }
        }
    }

    render () {
        const settingsCookie = new SettingsCookie();
        const isStep3 = settingsCookie.tutorialStep === 3;
        const isStep7 = settingsCookie.tutorialStep === 7;

        return (
            <div>
                {isStep3 && <Step3 />}
                {isStep7 && <Step7 />}

                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
                <SearchResultsRow featured={3} cards={6}/>
                <SearchResultsRow cards={6}/>
            </div>
        );
    }
}