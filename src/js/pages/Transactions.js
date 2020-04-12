import React, { useState, useEffect } from 'react';
import {useTable, useFilters} from 'react-table';
import AssetTable from './../utils/AssetTable'
import '../../css/Page.css';
import '../../css/Components.css';
import BlockBook from '../providers/blockbook'

function Transactions() {

  // Set state for watching decks or transactions
  const [ transactionMode, setTransactionMode ] = useState("transactions")
  const [ data, setData ] = useState([])

  const transactionsURL = ""

  function radioCheck () {
    const transactionsRadio = document.getElementById("transactionsRadio")
    const deckRadio = document.getElementById("decksRadio")

    if (transactionsRadio.checked) {
      transactionsRadio.defaultChecked = false
      deckRadio.defaultChecked = true
      setTransactionMode("deck")
      document.getElementById("transactionsDiv").style.display = "block"
      document.getElementById("decksDiv").style.display = "none"
      
    } else {
      transactionsRadio.defaultChecked = true
      deckRadio.defaultChecked = false
      setTransactionMode("transactions")
      document.getElementById("transactionsDiv").style.display = "none"
      document.getElementById("decksDiv").style.display = "block"
    }  
  }


  return (

    <div className = "Page">
      {/* Page Title */}
      <h1 className="pageTitle">Transactions</h1>

      <div className="switch-field">
        <input onChange = {() => {radioCheck()}} type="radio" id="transactionsRadio" name="switch-one" value="yes" defaultChecked/>
        <label htmlFor="transactionsRadio">Transactions</label>
        <input onChange = {() => {radioCheck()}} type="radio" id="decksRadio" name="switch-one" value="no" />
        <label htmlFor="decksRadio">Decks</label>
      </div>

      {/* Actual page content */}
      <div className = "pageContent">
        {/* User balances */}
        <div className="pageItem-transactions">

          <div id="transactionsDiv">
            <AssetTable type={"transactions"}/>
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