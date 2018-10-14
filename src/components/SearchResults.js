import React from 'react';
import SearchResultsRow from './SearchResultsRow';
import SettingsCookie from "../../public/scripts/cookies/SettingsCookie";
import Step3 from "./tutorial/Step3";

export default class SearchResults extends React.Component {
    render () {
        const settingsCookie = new SettingsCookie();
        const isStep3 = settingsCookie.tutorialStep === 3;

        return (
            <div>
                {isStep3 && <Step3 />}
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
                <SearchResultsRow featured={3} cards={6}/>
                <SearchResultsRow cards={6}/>
            </div>
        );
    }
}