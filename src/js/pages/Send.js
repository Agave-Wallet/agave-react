import React, {useEffect, useState} from 'react';
import '../../css/Page.css';
import Blockies from 'react-blockies';
import PasswordConfirm from '../components/PasswordConfirm'
import Protobuf from '../components/Protobuf';
import '../../css/Protobuf.css';
// import Chainz from '../js/providers/chainz'


function Send() {
  const [blockieVal, setBlockieVal] = useState("")
  const [modalState, setModalState] = useState(false)
  // Make sure fields have required content in them
  // make sure the address is valid
  // make sure an asset is selected
  // make sure the amount is valid (can't send too much, can't send negative, etc)
  // message is optional
  const [receivingAddress, setReceivingAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [asset, setAsset] = useState("")
  const [message, setMessage] = useState("")
  const [protobuf, setProtobuf] = useState(false)

  useEffect( ()=>{
    const modalDisplay = (modalState ? "grid" : "none")
    document.getElementById("password-modal").style.display = modalDisplay
    const formDisplay = (modalState ? "none" : "block")
    document.getElementById("send-form").style.display = formDisplay
  },[modalState])

  function getUnspent(){

  }

  return (
    <div className = "Page">
          {/* Actual page content */}
          <div className = "pageContent sendContent">
            {/* Transaction cards and such */}
            <div className="pageItem-sendTransactions">
              <div className="pageItem-sendTransactions__fields">
                <PasswordConfirm setModalState={setModalState}/>
                <form id="send-form">
                  {/* <Transaction /> */}
                  <input
                  required
                  id="receivingAddress"
                  type="text"
                  placeholder = "Receiving Address" 
                  onChange={ e => setReceivingAddress(e.target.value)}/>

                  {/* Amount form */}
                  <input
                  required
                  id="amount"
                  type="number"
                  placeholder = "0.0" 
                  onChange={ e => setAmount(e.target.value)}
                  min = "0" />

                  {/* Asset type */}
                  <select
                  required
                  id="asset"
                  onChange= { e => setAsset(e.target.value)}>

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
                  onChange= { e => setMessage(e.target.value)}
                  placeholder = "Message" />

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
                <Blockies seed={blockieVal} size={20} scale={6} color="#dfe" bgColor="#C06E5B" spotColor="#011627"/>
              
                <Protobuf 
                // hard pass send so it knows which page
                type = "send"
                setProtobuf = {setProtobuf}
                setModalState = {setModalState}
                protobuf = {protobuf}
                receivingAddress = {receivingAddress}
                amount = {amount}
                asset = {asset}
                message = {message}
                />

              </div>  
            </div>        
        </div>
      </div>
  );
}

export default Send;