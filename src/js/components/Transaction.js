import React from 'react';
import Blockies from 'react-blockies'

class Transaction extends React.Component{
    

    render(){
        return(
            <div className="Transaction">
                <div>
                    {/* Recieving address identicon - Not sure how to pass the current input text into the address */}
                    {/* <Blockies seed={address} size={4} scale={3} color="" bgColor="" spotColor=""/> */}
                    {/* Blockie needs to update as the user types in the receiving address */}
                    {/* Receiving address */}
                    <label htmlFor="receivingAddress">Receiving Address: </label>
                    <input 
                    id="receivingAddress"
                    type="text"
                    required
                    />
                    {/* Amount */}
                    <label htmlFor="amount">Amount</label>
                    <input
                    id="amount"
                    type="number"
                    required
                    />
                    {/* Remove this transaction button */}
                    <button>Remove Transactions</button>
                </div>
            </div>
        )
    }
}

export default Transaction;