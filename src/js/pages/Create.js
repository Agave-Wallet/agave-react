import React, {useState, useEffect} from 'react';
// import Icons from '../../img/symbol-defs.svg';
import '../../css/Protobuf.css'
import '../../css/Page.css';
import PasswordConfirm from '../components/PasswordConfirm'

function Create(props){
    // const [ blockieVal, setBlockieVal ] = useState("")
    const [ modalState, setModalState ] = useState(false)
    const [ protobuf, setProtobuf ] = useState( { name:"",mode:"",decimal:0,data:""} )
    // TODO: Person must have either multi or unflushable decks that they own for create cards to be available
    // const [unspent, setUnspent] = useState([])

    useEffect( ()=>{
      console.log(protobuf)
    },[protobuf])

    useEffect( ()=>{
      const modalDisplay = (modalState ? "grid" : "none")
      document.getElementById("password-modal").style.display = modalDisplay
      const formDisplay = (modalState ? "none" : "block")
      document.getElementById("create-form").style.display = formDisplay
      if (modalState){
        createDeck()
      }
    },[modalState])

    function createDeck(){
      if (document.readyState === 'complete'){
        window.protobuf.load("./js/utils/crypto/peerassets.proto").then( root =>{
        const deckMessage = root.lookupType("DeckSpawn")
        const payloadA = {version: 1, name: protobuf.name, issueMode:issueModes[protobuf.mode], numberOfDecimals:protobuf.decimal,assetSpecificData: protobuf.data}
        const message = deckMessage.fromObject(payloadA)
        const buffer = deckMessage.encode(message).finish()
        console.log(buffer) 
        props.setTxInfoCreate({data:buffer})
      })
    }}
  
  // TODO: should be made global probably
  // Verify acceptable name was entered
  function verifyName(){
    return (protobuf.name.length > 0 ? true : false)
  }

  // Verify acceptable mode was entered
  function verifyMode(){
    return (protobuf.mode.length > 0 ? true : false)
  }

  // Verify acceptable decimals are set
  function verifyDecimal(){
    return (protobuf.decimal >= 0 && protobuf.decimal <= 8 ? true : false)
  }


    // Button enable software
    useEffect( ()=> {
      // Make sure name, issue mode, and decimals are set
      // but finding these is weird champ now
      if (protobuf.name.length !== 0 && protobuf.mode.length !== 0 && protobuf.decimal >= 0 && protobuf.decimal <= 8) {
        let disableButton = false

        if (verifyName()){
          // add warning
          document.getElementById("name-warning").innerHTML = "";
          disableButton = false;
        } else {
          document.getElementById("name-warning").innerHTML = "Invalid Name"
          disableButton = true;
        }

        if (verifyMode()){
          // add warning
          document.getElementById("mode-warning").innerHTML = "";
          disableButton = false;
        } else {
          document.getElementsByTagName("mode-warning").innerHTML = "Invalid Mode";
          disableButton = true
        }

        if (verifyDecimal()){
          // add warning
          document.getElementById("decimal-warning").innerHTML = "";
          disableButton = false;
        } else {
          document.getElementById("decimal-warning").innerHTML = "Invalid Decimals"
          disableButton = true;
        }
        document.getElementById("createTransactionButton").disabled = disableButton
      }
    }, [protobuf] )
    
      return(
        <div className = "Page">
          {/* Actual page content */}
          <div className = "pageContent">
            {/* Manage Asset Information */}
            <div className="pageItem-assetCreate">
              <div className="pageItem-assetCreate__fields">
                <h1 className="pageTitle">Create Decks</h1>

                <PasswordConfirm type="create" setModalState={setModalState} setSignTransactionCreate={props.setSignTransactionCreate} protobuf={protobuf}/>
              
                <div id="create-form">
                  {/* Deck name input */}  
                        
                  <input 
                  required
                  id="name"
                  type='text' 
                  name='name'
                  value={protobuf.name}
                  onChange = {e => setProtobuf( {...protobuf, name: e.target.value} )}
                  placeholder = "Deck Name"/>
                  <div id="name-warning" className="warningMessage"></div>

                  {/* Issue mode select dropdown */}
                  <select value={protobuf.mode} onChange={e => setProtobuf( {...protobuf, mode: e.target.value} )} name="mode">
                    <option value="" defaultValue  disabled>Select an Option</option>                     
                    <option value="None">None Issue Mode</option>
                    {/* Custom Issue Mode */}
                    {/* <option value="Custom Issue Mode">Custom Issue Mode</option> */}
                    <option value="Once">Once Issue Mode</option>
                    <option value="Multi">Multi Issue Mode</option>
                    <option value="Mono">Mono Issue Mode</option>
                    <option value="Singlet">Singlet Issue Mode</option>
                    <option value="Unflushable">Unflushable Issue Mode</option>
                    {/* Combined Issue Mode */}
                    {/* <option value="Combined">Combined Issue Mode</option> */}
                  </select> 
                  <div id="mode-warning" className="warningMessage"></div>

                  {/* Decimal place input */}
                  <input
                    required
                    id="decimal"
                    type='number'
                    name='decimal'
                    min='0'
                    max='8'
                    value={protobuf.decimal}
                    onChange={e => setProtobuf( {...protobuf, decimal: e.target.value })}
                    placeholder="Decimal" />
                    <div id="decimal-warning" className="warningMessage"></div>

                  {/* Asset specific data */}
                  <input
                    id="data"
                    type="text"
                    name="data"
                    value={protobuf.data}
                    placeholder="Asset Specific Data:"
                    onChange={e => setProtobuf( { ...protobuf,data: e.target.value} )} />

                  <button id="createTransactionButton" className="button-sendTransaction" onClick={()=>{setModalState(true)}}>Create Deck</button>
                  </div>
              </div>
          </div>
        </div>
      </div>
      )
    }


export default Create;


// Helper functions and constants

const issueModes = {
  "None": 0,
  "Once": 2,
  "Multi": 4,
  "Mono": 8,
  "Singlet": 10,
  "Unflushable":16
}