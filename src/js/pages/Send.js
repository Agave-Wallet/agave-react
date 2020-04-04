import React from 'react';
import '../../css/Page.css';
import Blockies from 'react-blockies';


function Send() {
  const [blockieVal, setBlockieVal] = React.useState("")

  function handleChange(evt){
    this.setState({ [evt.target.name]: evt.target.value });
  }
 
  // Add transaction card
  function addTransaction() {
    const transactions = document.getElementsByClassName("pageItem-sendTransactions")
    
  }

  return (
    <div className = "Page">

          {/* Actual page content */}
          <div className = "pageContent sendContent">

            {/* Transaction cards and such */}
            <div className="pageItem-sendTransactions">

              <div className="pageItem-sendTransactions__identicon">
                {/* Page Title */}
                <h1 className="pageTitle">Send</h1>
                {/* This needs to take input from the receiving address */}
                <Blockies seed={blockieVal} size={20} scale={6} color="#dfe" bgColor="#C06E5B" spotColor="#011627"/>
              
                <h2>Transaction Fee</h2>
                <h2>Signed?</h2>
              </div>          

              <div className="pageItem-sendTransactions__fields">
                <form>
                  {/* <Transaction /> */}
                  <input
                  required
                  id="receivingAddress"
                  type="text"
                  placeholder = "Receiving Address" 
                  onChange={ e => setBlockieVal(e.target.value)}/>

                  {/* Amount form */}
                  <input
                  required
                  id="amount"
                  type="number"
                  placeholder = "0.0" 
                  min = "0" />

                  {/* Asset type */}
                  <select
                  required
                  id="assetType">

                  {/* TODO: Iterate through availabe currencies to send */}
                    <option>Peercoin</option>
                    <option>ScamCoin</option>
                    <option>XD</option>
                  </select>

                  {/* Message Field */}
                  <input
                  optional
                  id="message"
                  type="text"
                  placeholder = "Message" />

                </form>

                <br/>
                <br/>

                {/* Sign button */}
                <button>Sign Transaction</button>
                <button>Send</button>
              </div>

            </div>        

        </div>
      </div>
  );
}

export default Send;