import React from 'react';
import '../../css/Page.css';


function Send() {
 
  // Add transaction card
  function addTransaction() {
    const transactions = document.getElementsByClassName("pageItem-sendTransactions")
    
  }

  return (
    <div className = "Page">
          {/* Page Title */}
          <h1 className="pageTitle">Send</h1>

          {/* Actual page content */}
          <div className = "pageContent">
            
            {/* Transaction cards and such */}
            <div className="pageItem-sendTransactions">
              Send Transactions
            </div>

            {/* Buttons like clear */}
            <div className="pageItem-sendButtons">
              {/* Does this need to be this.addTransaction? */}
              <button onClick={addTransaction}>Send</button>
              <button>Clear All</button>
              <button>Add Recipient</button>
            </div>        

        </div>
      </div>
  );
}

export default Send;