import React, {useEffect, useState} from 'react';
import '../../css/Page.css';
import Blockies from 'react-blockies';
import PasswordConfirm from '../components/PasswordConfirm'
import Protobuf from '../components/Protobuf';
import '../../css/Protobuf.css';
import Chainz from '../providers/chainz'


function Send(props) {
  const [ blockieVal, setBlockieVal ] = useState("")
  const [ modalState, setModalState ] = useState(false)
  const [ txInfo, setTxInfo ] = useState( {} )
  const [ signTransactionRequest, setSignTransactionRequest] = useState(false)
  const [ submitState, setSubmitState ] = useState(false)

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
    if (txInfo.receivingAddress != undefined && Object.keys(txInfo).length !== 0){
      // Check address validitiy
      let disableButton = false
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
  },[txInfo.receivingAddress,txInfo.amount])

  useEffect( ()=>{
    if ( Object.keys(txInfo).length > 0) {
      const modalDisplay = (modalState ? "grid" : "none");
      document.getElementById("password-modal").style.display = modalDisplay;
      const formDisplay = (modalState ? "none" : "block");
      document.getElementById("send-form").style.display = formDisplay;
      if (modalState){
        const sender = sessionStorage.getItem("address")
        props.setTxInfoSend(txInfo)
      }
    }
  },[modalState]);
     
  useEffect( ()=>{
    if ( Object.keys(txInfo).length >0){
      props.setSignTransactionSend(true)
    }
  },[signTransactionRequest])


  return (
    <div className = "Page">
          {/* Actual page content */}
          <div className = "pageContent sendContent">
            {/* Transaction cards and such */}
            <div className="pageItem-sendTransactions">
              <div className="pageItem-sendTransactions__fields">
              {/* <PasswordConfirm setModalState={setModalState} signTransaction={signTransaction} transaction ={transaction}/> */}
                <PasswordConfirm type="send" setModalState={setModalState} setSignTransactionSend={props.setSignTransactionSend}/>
                <form id="send-form">
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
                  <div id="address-warning" class="warningMessage"></div>

                  {/* Amount form */}
                  <input
                  required
                  id="amount"
                  type="number"
                  placeholder = "0.0" 
                  onChange={ e => setTxInfo( {...txInfo, amount: e.target.valueAsNumber})}
                  min = "0" />
                  <div id="amount-warning" class="warningMessage"></div>

                  {/* Asset type */}
                  <select
                  required
                  id="asset"
                  onChange= { e => setTxInfo( { ...txInfo, asset: e.target.value })}>

                  {/* TODO: Iterate through availabe currencies to send */}
                    <option value="" selected disabled>Select an Asset...</option>
                    <option>Peercoin</option>
                    <option>ScamCoin</option>
                    <option>XD</option>
                  </select>

                  {/* Ask for input to sign the transaction */}
                  {/* <button onClick={()=>{setModalState(true)}}>Send</button> */}
                </form>
                
                {/* Ask for password on send and sign the transaction */}
              </div>

              <div className="pageItem-sendTransactions__identicon">
                {/* Page Title */}
                <h1 className="pageTitle">Send</h1>
                {/* This needs to take input from the receiving address */}
                {/* { e => setBlockieVal(e.target.value)} */}
                <Blockies seed={txInfo.receivingAddress} size={20} scale={6} />
              
                <Protobuf 
                // hard pass send so it knows which page
                type = "send"
                // setProtobuf = {setProtobuf}
                setModalState = {setModalState}
                // protobuf = {protobuf}
                receivingAddress = {txInfo.receivingAddress}
                amount = {txInfo.amount}
                asset = {txInfo.asset}
                // transaction = {transaction}
                />

              </div>  
            </div>        
        </div>
      </div>
  );
}

export default Send;