import React, {useEffect, useState} from 'react';
import '../../css/Page.css';
import PasswordConfirm from '../components/PasswordConfirm'
import '../../css/Protobuf.css';


function Send(props) {
  // const [ blockieVal, setBlockieVal ] = useState("")
  const [ modalState, setModalState ] = useState(false)
  const [ txInfo, setTxInfo ] = useState( {} )
  const [ signTransactionRequest, setSignTransactionRequest] = useState(false)
  const [ cardCreate, setCardCreate ] = useState(false)
  // const [ submitState, setSubmitState ] = useState(false)

  // Verify address was correct
  function verifyAddress(){
    // TODO bitcore address checking
    return (txInfo.receivingAddress.length !== 34 ? false : true)
  }

  // Verify acceptable amount was entered
  function verifyAmount(){
    return (txInfo.amount > 0.00000001 ? true : false)
  }

  useEffect( ()=>{
    // const buttonMode = (!buttonState ? "disabled" : "active")
    // TODO: Make sure that an asset or network is selected
    if (cardCreate) {
      console.log("Card Creation Mode")
      if (txInfo.receivingAddress === sessionStorage.getItem("address")) {
        // Disable button initially
        let disableButton = false
        // Make sure it has the right address
        // Amount validity
        if (verifyAmount()){
          document.getElementById("amount-warning").innerHTML = "";
          disableButton = false;
        }else{
          document.getElementById("amount-warning").innerHTML = "Invalid Amount";
          disableButton = true;
        }
        document.getElementById("sendTransactionButton").disabled = disableButton;
      }
    } else {
      if (txInfo.receivingAddress !== undefined && Object.keys(txInfo).length !== 0){
        // Disable button initially
        let disableButton = false
        // Check address validitiy
        if (verifyAddress()){ 
          document.getElementById("address-warning").innerHTML = "";
          disableButton = false;
        }else{
          document.getElementById("address-warning").innerHTML = "Invalid Address";
          disableButton = true;
        }
        // Amount validity
        if (verifyAmount()){
          document.getElementById("amount-warning").innerHTML = "";
          disableButton = false;
        }else{
          document.getElementById("amount-warning").innerHTML = "Invalid Amount";
          disableButton = true;
        }
        document.getElementById("sendTransactionButton").disabled = disableButton;
      }
    }
  },[txInfo.receivingAddress,txInfo.amount]) // eslint-disable-line react-hooks/exhaustive-deps

  function checkUnspent(){
    console.log('Checking Unspent')
    let useUnspents = []
    let useUnspentAmount  = 0
    // Get unspent to spend
    props.unspent.forEach( u =>{
        // If the user does not have enough unspent, add another
        if (useUnspentAmount < txInfo.amount){
            useUnspentAmount += u.satoshis
            useUnspents.push(u)
        }
    })
    // If you still do not have enough unspent
    if (useUnspentAmount >= txInfo.amount) {
      console.log(useUnspentAmount >= txInfo.amount)
      setModalState(true)
      props.setTxInfoSend(txInfo)
    }
  }


  useEffect( ()=>{
    // Check and make sure this all works

      if ( Object.keys(txInfo).length > 0 ) {
        const modalDisplay = (modalState ? "grid" : "none");
        document.getElementById("password-modal").style.display = modalDisplay;
        const formDisplay = (modalState ? "none" : "block");
        document.getElementById("send-form").style.display = formDisplay;
        if (modalState){
          // const sender = sessionStorage.getItem("address")
        }
      }
  },[modalState]); // eslint-disable-line react-hooks/exhaustive-deps
     
  useEffect( ()=>{
    if ( Object.keys(txInfo).length > 0 ){
      props.setSignTransactionSend(true)
    }
  },[signTransactionRequest]) // eslint-disable-line react-hooks/exhaustive-deps

  function cardCreateCheck() {
    // Find the card create input 
    const checkBox = document.getElementById("createInput")
    // document.getElementById("receivingAddress")
    // TODO run new logic for submit button
    if (checkBox.checked) {
      console.log("Checked");
      setCardCreate(true)
      setTxInfo( {...txInfo, receivingAddress: sessionStorage.getItem("address")})
      document.getElementById("receivingAddress").style.display = "none"
      document.getElementById("receivingAddress").value = txInfo.receivingAddress
      console.log("txInfo.receivingAddress", txInfo.receivingAddress)
    } else {
      console.log("Unchecked");
      setCardCreate(false)
      setTxInfo( {...txInfo, receivingAddress: ""})
      document.getElementById("receivingAddress").style.display = "inline-block"
      document.getElementById("receivingAddress").value = ""
      console.log("txInfo.receivingAddress", txInfo.receivingAddress)
      
    }
  }

  //////////////////////// Get spendable assets

  const processBalances = ( async (queryOne, queryTwo) =>{
    const balances = await fetch(queryOne)
    const names = await fetch(queryTwo)

    const balancesResult = await balances.json()
    const namesResult = await names.json()

    return {
        balances: balancesResult, 
        names: namesResult
    }
  })

  // Function to get user balances
  const getBalance = ( urlOne, urlTwo ) =>{
    // Create an empty array for balance information
    let balanceData = [];
    // Get balance promise
    const promise = processBalances( urlOne, urlTwo );
    promise.then( info =>{
        console.log("info", info)
        // Returned json goes to data
        if (info != null) {
            for ( const row in info.balances ) {
                // Iterate through the name object to look for the matching name
                for ( const tx in info.names) {
                    // Look by tx id to find the matching name object.  If it exists, add the name to our list
                    if (info.names[tx].txid === row) {
                        // Sort returned json into readable format
                        balanceData.push({
                            // txid
                            txid: info.names[tx].txid,
                            //asset
                            asset: info.names[tx].name,
                            // mode
                            mode: info.names[tx].mode
                        })
                    }                  
                } 
            }
            balanceData.push({
              txid: "network",
              asset: sessionStorage.getItem('network'),
              mode: ""
            })

        } else {
            console.log("Data is null")
        }  
        
    }).then( info => {
        // Then update state and change loading
        setData(balanceData)
        console.log("balanceData", balanceData)
    })
    //promise.catch(console.log("getBalance rejected"))
  }

  // Get our balance data once
  useEffect(()=>{
    spendableAssetsOptions();
  }, [])

  const userAddress = sessionStorage.getItem("address") 
  const network = sessionStorage.getItem("network")
  const balanceURL = "https://api.agavewallet.com/v1/balances?address=" + userAddress
  const deckURL = "https://api.agavewallet.com/v1/transactions?address=" + userAddress + "&type=deck"

  const [ data, setData ] = useState([])

  const spendableAssetsOptions = () => {
      console.log("spendableAssetsOptions Run")
      getBalance(balanceURL, deckURL);
  }

  // Get a list of sendable assets
  const optionList = data.map((item) => 
    <option value={item.txid}>{item.asset}</option>
  )

  // Create option list if we are in card mode
  const createOptionList = data.map((item) => {
    if (item.mode === "MULTI" || item.mode === "UNFLUSHABLE" || item.mode === "SINGLET") {
      return <option value={item.txid}>{item.asset}</option>
    }
    else {
      return
    }
  })

  return (
    <div className = "Page">
          {/* Actual page content */}
          <div className = "pageContent sendContent">
            {/* Transaction cards and such */}
            <div className="pageItem-sendTransactions">
              <div className="pageItem-sendTransactions__fields">
                {/* Page Title */}
                <h1 className="pageTitle">Send Assets</h1>
                {/* <PasswordConfirm setModalState={setModalState} signTransaction={signTransaction} transaction ={transaction}/> */}
                <PasswordConfirm type="send" setModalState={setModalState} setSignTransactionSend={props.setSignTransactionSend} txInfo={txInfo}/>
                <div id="send-form">
                  {/* <Transaction /> */}
                  <input
                  className="icon-Sign"
                  required
                  id="receivingAddress"
                  type="text"
                  min = "34"
                  max= "34"
                  placeholder = "Receiving Address" 
                  onChange={ e => setTxInfo( {...txInfo, receivingAddress: e.target.value})}/>
                  <div id="address-warning" className="warningMessage"></div>

                  {/* Amount form */}
                  <input
                  required
                  id="amount"
                  type="number"
                  placeholder = "0.0" 
                  onChange={ e => setTxInfo( {...txInfo, amount: e.target.valueAsNumber})}
                  min = "0" />
                  <div id="amount-warning" className="warningMessage"></div>

                  {/* Asset type */}
                  <select
                  required
                  id="asset"
                  onChange= { e => setTxInfo( { ...txInfo, asset: e.target.value })}>
                  {/* TODO: Iterate through availabe currencies to send */}
                    <option value="" defaultValue disabled>Select an Asset...</option>
                    {/* cardCreate */}
                    { cardCreate ? createOptionList : optionList }
                  </select>

                  {/* Ask for input to sign the transaction */}
                  {/* button-sendTransaction */}
                  <button className="button-sendTransaction" id="sendTransactionButton" onClick={()=>{checkUnspent()}}>Sign Transaction</button>

                  {/* Create input box */}
                  <div className="checkbox-container">
                    <label className="checkbox-label">
                      <input type="checkbox" id="createInput" onChange={() => {cardCreateCheck()}}/>
                      <span className="checkbox-custom"></span>
                    </label>
                    <div className="input-title">
                      Card Creation
                    </div>
                  </div>
                </div>
                
                {/* Ask for password on send and sign the transaction */}
              </div>
          </div>        
        </div>
      </div>
  );
}

export default Send;