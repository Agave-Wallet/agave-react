import React from 'react';


class CardCreateForm extends React.Component {
   
    render(){
        return(
            <div className="pageItem-assetCreateForm">
                {/* Select Asset type dropdown */}
                {/* TODO: Remove this */}
                <h2 className="pageSubtitle">Create Card</h2> 
                {/* Deck NaCabbnme input */}
                {/* TODO: This will be a dropdown for held cards that are multi or unflushable */}
                

                {/* Check if all these fields are filled then unlock the sign transaction button */}
                <button id="signTransactionButton">
                    Sign Transaction
                </button>

            </div>
        )
    }
}

export default CardCreateForm;