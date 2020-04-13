import React from 'react';
import AssetTable from './../utils/AssetTable'
import '../../css/Page.css';
import '../../css/Components.css';

function Transactions() {

  function radioCheck () {
    const cardsRadio = document.getElementById("cardsRadio")
    const deckRadio = document.getElementById("decksRadio")

    if (cardsRadio.checked) {
      cardsRadio.defaultChecked = false
      deckRadio.defaultChecked = true
      
      document.getElementById("cardsDiv").style.display = "block"
      document.getElementById("decksDiv").style.display = "none"
      
    } else {
      cardsRadio.defaultChecked = true
      deckRadio.defaultChecked = false

      document.getElementById("cardsDiv").style.display = "none"
      document.getElementById("decksDiv").style.display = "block"
    }  
  }


  return (

    <div className = "Page">
      {/* Page Title */}
      <div className="switch-field">
        <input onChange = {() => {radioCheck()}} type="radio" id="cardsRadio" name="switch-one" value="yes" defaultChecked/>
        <label htmlFor="cardsRadio">Card Transactions</label>
        <input onChange = {() => {radioCheck()}} type="radio" id="decksRadio" name="switch-one" value="no" />
        <label htmlFor="decksRadio">Deck Transactions</label>
      </div>

      {/* Actual page content */}
      <div className = "pageContent">
        {/* User balances */}
        <div className="pageItem-transactions">

          <div id="cardsDiv">
            <AssetTable type={"cards"}/>
          </div>

          {/* Table for recent transactions */}
          <div id="decksDiv">
            <AssetTable type={"decks"}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;