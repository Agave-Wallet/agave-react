import React from 'react';

class DeckCreateForm extends React.Component {
   
    render(){
        return(
            <div className="pageItem-assetCreateForm">
                {/* Select Asset type dropdown */}
                {/* TODO: Remove this */}
                <h2 className="pageSubtitle">Create Deck</h2> 
                {/* Deck NaCabbnme input */}
                <input type="text" id="assetDeckName" placeholder="Deck Name:"/>

                {/* Deck Issue Mode */}
                <select id="assetDeckIssueMode" default="Issue Mode:">
                    <option value="none">None Issue Mode</option>
                    {/* <option value="custom">Custom Issue Mode</option> */}
                    <option value="once">Once Issue Mode</option>
                    <option value="multi">Multi Issue Mode</option>
                    <option value="mono">Mono Issue Mode</option>
                    <option value="singlet">Singlet Issue Mode</option>
                    <option value="unflushable">Unflushable Issue Mode</option>
                    <option value="subscription">Subscription Issue Mode</option>
                {/* TODO: Add combined issue modes somehow */}
                {/* https://medium.com/peercoin/peerassets-deck-issue-modes-c419f38f7800 */}
                </select>

                <input type="number" id="assetDeckDecimals" min="0" max="8" placeholder="Decimal Places:"/>

                {/* Optional */}
                <input type="text" id="assetSpecificData" placeholder="Asset Specific Data (Optional)" />

                {/* Check if all these fields are filled then unlock the sign transaction button */}
                <button id="signTransactionButton">
                    Sign Transaction
                </button>

            </div>
        )
    }
}

export default DeckCreateForm;