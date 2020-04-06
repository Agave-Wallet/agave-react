import React, {useState, useEffect} from 'react';
import Protobuf from '../components/Protobuf';
import Icons from '../../img/symbol-defs.svg';
import '../../css/Protobuf.css'
import '../../css/Page.css';
import Blockies from 'react-blockies';
import PasswordConfirm from '../components/PasswordConfirm'

function Create(props){
    const [ blockieVal, setBlockieVal ] = useState("")
    const [ modalState, setModalState ] = useState(false)
    const [ protobuf, setProtobuf ] = useState( { name:"",mode:"",decimal:0,data:""} )
    // TODO: Person must have either multi or unflushable decks that they own for create cards to be available
    // const [unspent, setUnspent] = useState([])
  

    // useEffect( () =>{
    //   console.log("Hook is working")
    //   createDeck()
    // },[protobuf])

    useEffect( ()=>{
      console.log(protobuf)
    },[protobuf])

    useEffect( ()=>{
      const modalDisplay = (modalState ? "grid" : "none")
      document.getElementById("password-modal").style.display = modalDisplay
      const formDisplay = (modalState ? "none" : "block")
      document.getElementById("create-form").style.display = formDisplay
      createDeck()
    },[modalState])

    function createDeck(){
      if (document.readyState === 'complete'){
        window.protobuf.load("./js/utils/crypto/peerassets.proto").then( root =>{
        const deckMessage = root.lookupType("DeckSpawn")
        const payload = {version: 1, name: protobuf.name, issueMode:issueModes[protobuf.mode], numberOfDecimals:protobuf.decimal,assetSpecificData: protobuf.data}
        const message = deckMessage.fromObject(payload)
        const buffer = deckMessage.encode(message).finish()
        console.log(buffer)
        props.setTxInfoCreate({data:buffer})

      })
    }}

      return(
        <div className = "Page">
          {/* Actual page content */}
          <div className = "pageContent createContent">
            {/* Manage Asset Information */}
            <div className="pageItem-assetCreate">
              <div className="pageItem-assetCreate__fields">
              <PasswordConfirm type="create" setModalState={setModalState} setSignTransactionCreate={props.setSignTransactionCreate}/>
                <form id="create-form">
                  {/* Deck name input */}
                  
                  <div className="nameInput">        
                    
                    {/* <svg className="icon">
                      <use href={`${Icons}#icon-Address`} title="Address">
                      </use>
                    </svg>  */}

                    <input 
                    required
                    id="name"
                    type='text' 
                    name='name'
                    value={protobuf.name}
                    onChange = {e => setProtobuf( {...protobuf, name: e.target.value} )}
                    placeholder = "Deck Name"/>
                    
                  </div>

                  {/* Issue mode select dropdown */}
                  <select value={protobuf.mode} onChange={e => setProtobuf( {...protobuf, mode: e.target.value} )} name="mode">
                    <option value="" selected disabled>Select an Option</option>                     
                    <option value="None">None Issue Mode</option>
                    {/* Custom Issue Mode */}
                    {/* <option value="Custom Issue Mode">Customer Issue Mode</option> */}
                    <option value="Once">Once Issue Mode</option>
                    <option value="Multi">Multi Issue Mode</option>
                    <option value="Mono">Mono Issue Mode</option>
                    <option value="Singlet">Singlet Issue Mode</option>
                    <option value="Unflushable">Unflushable Issue Mode</option>
                    {/* Combined Issue Mode */}
                    {/* <option value="Combined">Combined Issue Mode</option> */}
                  </select> 

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

                  {/* Asset specific data */}
                  <input
                    optional
                    id="data"
                    type="text"
                    name="data"
                    value={protobuf.data}
                    placeholder="Asset Specific Data:"
                    onChange={e => setProtobuf( { ...protobuf,data: e.target.value} )} />
                  
                </form>
              </div>
            {/* Manage Asset Summary */}
            <div className="pageItem-assetCreate__identicon">
              {/* Page Title */}
              <h1 className="pageTitle">Create</h1>

              {/* Blockie */}
              <Blockies seed={protobuf.name} size={20} scale={6}/>

              <Protobuf
              // hard pass create so it knows which page
              type = "create"
              // setProtobuf = {setProtobuf}
              setModalState = {setModalState}
              // protobuf = {protobuf}
              name ={protobuf.name}
              mode = {protobuf.mode}
              decimal = {protobuf.decimal}
              data = {protobuf.data}
              />
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