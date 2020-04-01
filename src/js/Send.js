import React from 'react';
import '../css/Page.css';

function Send() {
 
  return (
    <div className = "Page">
          {/* Page Title */}
          <h1 className="pageTitle">Send</h1>

          {/* Actual page content */}
          <div className = "pageContent">
            
            {/* Select Asset etc */}
            <div className="pageItem-selectAsset">
              <select placeholder="Select Asset">Select Asset
                <option value="scottcoin">ScottCoin</option>
                <option value="lettercoiny">LetterCoiny</option>
                <option value=":(">:( </option>
                <option value="skatekid4352">Skatekid4352</option>
              </select>
              <p>User Balance</p>
              <p>Transaction Cost</p>
            </div>

            {/* Buttons like clear */}
            <div className="pageItem-sendButtons">
              <button>Send</button>
              <button>Clear All</button>
              <button>Add Recipient</button>
            </div>

            {/* Transaction cards and such */}
            <div className="pageItem-sendTransactions">
              Send Transactions
            </div>

        </div>
      </div>
  );
}

export default Send;