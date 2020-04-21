import React, {useEffect, useState} from 'react';
import '../../css/Page.css';
import PasswordConfirm from '../components/PasswordConfirm'
import '../../css/Protobuf.css';


function Send(props) {
  // const [ blockieVal, setBlockieVal ] = useState("")
  
  const [ txInfo, setTxInfo ] = useState( {} )
  const [ signTransactionRequest, setSignTransactionRequest] = useState(false)
  const [ cardCreate, setCardCreate ] = useState(false)
  // const [ submitState, setSubmitState ] = useState(false)

  // Verify address was correct
  function verifyAddress(){
    // TODO bitcore address checking
    return txInfo.receivingAddress.length !== 34
  }

  // Verify acceptable amount was entered
  function verifyAmount(){
    // knowing the txid, get the balances from data
    console.log("txInfo.asset", txInfo.asset)
    if (txInfo.asset === "network") {
      // TODO distinguish by Peercoin or BCH
      console.log("Peercoin was selected")
      return txInfo.amount > 0.00000001
    }
    else if (cardCreate) {
      // If you are creating cards, the amount is okay
      return true
      }
    else{
      let amnt = 0
      data.forEach(v => {
      if (v.txid === txInfo.asset) {
        return txInfo.amount <= v.amount
      }
      })  
  }
}

  function verifyAsset(){
    if (document.getElementById('asset') !== "default") {
      return true
    } else {
      return false
    }
  }

  useEffect( ()=>{
    // const buttonMode = (!buttonState ? "disabled" : "active")
    // TODO: Make sure that an asset or network is selected
    if (cardCreate) {
      console.log("Card Creation Mode")
      if (txInfo.receivingAddress === window.sessionStorage.getItem("address")) {
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
        if (verifyAsset()){
          document.getElementById("asset-warning").innerHTML = "";
          disableButton = false;
        } else {
          document.getElementById("asset-warning").innerHTML = "Invalid Assest";
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
        if (verifyAsset()){
          document.getElementById("asset-warning").innerHTML = "";
          disableButton = false
        } else {
          document.getElementById("asset-warning").innerHTML = "Invalid Address";
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
    let target = 0.01 // default PeerAssets vout0 fee
    if (txInfo.asset != "network"){
      target = txInfo.amount
    }
    props.unspent.forEach( u =>{
        // If the user does not have enough unspent, add another
        if (useUnspentAmount < target){
            useUnspentAmount += u.satoshis
            useUnspents.push(u)
        }
    })
    // If you still do not have enough unspent
    if (useUnspentAmount >= txInfo.amount) {
      console.log(useUnspentAmount >= txInfo.amount)
    }
    props.setModalState(true)
    sendCard()
  }

  useEffect( ()=>{
    // Check and make sure this all works
      if ( Object.keys(txInfo).length > 0 ) {
        const modalDisplay = (props.modalState ? "grid" : "none");
        document.getElementById("password-modal").style.display = modalDisplay;
        const formDisplay = (props.modalState ? "none" : "block");
        document.getElementById("send-form").style.display = formDisplay;
        // if (props.modalState){
        //   // const sender = sessionStorage.getItem("address")
        // }
      }
  },[props.modalState]); // eslint-disable-line react-hooks/exhaustive-deps
     
  useEffect( ()=>{
    if ( Object.keys(txInfo).length > 0 ){
      console.log("sendPage txinfosend",txInfo)
      sendCard()
      props.setTxInfoSend({...txInfo})
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
      console.log("props.modalState", props.modalState)
      setTxInfo( {...txInfo, receivingAddress: window.sessionStorage.getItem("address")})
      props.setTxInfoSend({...props.txInfoSend, receivingAddress: window.sessionStorage.getItem("address") })
      setCardCreate(true)
      document.getElementById("receivingAddress").style.display = "none"
      document.getElementById("receivingAddress").value = txInfo.receivingAddress
      console.log("txInfo.receivingAddress", txInfo.receivingAddress)
    } else {
      console.log("Unchecked");
      setTxInfo( {...txInfo, receivingAddress: ""})
      setCardCreate(false)
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
                // console.log("row", )
                // Iterate through the name object to look for the matching name
                for ( const tx in info.names) {
                    // Look by tx id to find the matching name object.  If it exists, add the name to our list
                    if (info.names[tx].txid === row) {
                        // Sort returned json into readable format
                        // let amnt = info.balances
                        // console.log("amnt", amnt)
                        balanceData.push({
                            // txid
                            txid: info.names[tx].txid,
                            //asset
                            asset: info.names[tx].name,
                            // mode
                            mode: info.names[tx].mode,
                            // amount
                            // TODO: Make sure this updates when you have more than 0
                            amount: info.balances[row],
                            // decimals
                            decimals: info.names[tx].decimals
                        })
                    }                  
                } 
            }
            balanceData.push({
              txid: "network",
              asset: window.sessionStorage.getItem('network'),
              mode: "",
              amount: window.sessionStorage.getItem("balance"),
              // TODO check network specific decimals
              decimals: 6
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

  const userAddress = window.sessionStorage.getItem("address") 
  const network = window.sessionStorage.getItem("network")
  const balanceURL = "https://api.agavewallet.com/v1/balances?address=" + userAddress
  const deckURL = "https://api.agavewallet.com/v1/transactions?address=" + userAddress + "&type=deck"

  const [ data, setData ] = useState([])

  const spendableAssetsOptions = () => {
      console.log("spendableAssetsOptions Run")
      getBalance(balanceURL, deckURL);
  }

  // Get a list of sendable assets
  const optionList = data.map((item) => {
    if (item.amount > 0) {
      return <option id={item.asset} value={item.txid}>{item.asset}</option>
    } else {
      return
    }
  })

  // Create option list if we are in card mode
  const createOptionList = data.map((item) => {
    if (item.mode === "MULTI" || item.mode === "UNFLUSHABLE" || item.mode === "SINGLET") {
      return <option id={item.asset} value={item.txid}>{item.asset}</option>
    } else {
      return
    }
  })

  let [ protobuf, setProtobuf] = useState({})

  function sendCard(){
    if (document.readyState === 'complete'){
      window.protobuf.load("./js/utils/crypto/peerassets.proto").then( root =>{
      const cardMessage = root.lookupType("CardTransfer")
      // data
      let deci = 0
      data.forEach(a => {
        if (a.txid === txInfo.asset) {
          deci = a.decimals    
        }
      })
      
      if (txInfo.asset !== "network"){
        // TODO: add ASD field and support
        const payloadA = {version: 1, amount: [txInfo.amount], numberOfDecimals: deci, assetSpecificData: null}
        console.log("payloadA", payloadA)
        const message = cardMessage.fromObject(payloadA)
        const buffer = cardMessage.encode(message).finish()
        console.log(buffer) 
        let p2thAddress = window.agave.getPrivateKeyToAddress(txInfo.asset).toString()
        setTxInfo({...txInfo, data:buffer, p2thAddress: p2thAddress})
        props.setTxInfoSend({...props.txInfoSend, txInfo})
      }else{
        setTxInfo({...txInfo, data: null, p2thAddress: null})
        props.setTxInfoSend({...props.txInfoSend, txInfo})
      }
    })
  }}

  useEffect( ()=>{
  
  },[txInfo.asset])
  // useEffect( ()=>{
  //   console.log(txInfo)
  //   props.setTxInfoSend({...props.txInfoSend, txInfo})
  // },[txInfo])

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
                <PasswordConfirm type="send" setModalState={props.setModalState} setSignTransactionRequest={setSignTransactionRequest} txInfo={txInfo}/>
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
                    <option value="default" defaultValue>Select an Asset...</option>
                    {/* cardCreate */}
                    { cardCreate ? createOptionList : optionList }
                  </select>
                  <div id="asset-warning" className="warningMessage"></div>

                  {/* Ask for input to sign the transaction */}
                  {/* button-sendTransaction */}
                  <button 
                  className="button-sendTransaction" 
                  id="sendTransactionButton" 
                  onClick={()=>{checkUnspent()}}
                  >
                  Sign Transaction
                  </button>

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