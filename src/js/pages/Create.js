import React, {useState, useEffect} from 'react';
import Protobuf from '../components/Protobuf';
import '../../css/Protobuf.css'
import '../../css/Page.css';
import Blockies from 'react-blockies';
import PasswordConfirm from '../components/PasswordConfirm'

function Create(){
    const [blockieVal, setBlockieVal] = useState("")
    const [modalState, setModalState] = useState(false)
    // Make sure fields have required content in them
    // make sure the address is valid
    // make sure an issue mode type is selected
    // asset specific data is optional

    // TODO: Person must have either multi or unflushable decks that they own for create cards to be available
    const [name,setName] = useState("")
    const [mode, setMode] = useState("")
    const [decimal, setDecimal] = useState("")
    const [data, setData] = useState("")
    const [protobuf,setProtobuf] = useState(false)

    useEffect( () =>{
      console.log("Hook is working")
      createDeck()
    },[protobuf])

    useEffect( ()=>{
      const modalDisplay = (modalState ? "grid" : "none")
      document.getElementById("password-modal").style.display = modalDisplay
      const formDisplay = (modalState ? "none" : "block")
      document.getElementById("create-form").style.display = formDisplay
    },[modalState])

    function createDeck(){
      if (document.readyState === 'complete'){
        window.protobuf.load("./js/utils/crypto/peerassets.proto").then( root =>{
        const deckMessage = root.lookupType("DeckSpawn")
        const payload = {version: 1, name: name, issueMode:issueModes[mode], numberOfDecimals:decimal,assetSpecificData:data}
        const message = deckMessage.fromObject(payload)
        const buffer = deckMessage.encode(message).finish()
        console.log(buffer)
        console.log(deckMessage.decode(buffer))
      })
    }}

      return(
        <div className = "Page">
          {/* Actual page content */}
          <div className = "pageContent createContent">
            {/* Manage Asset Information */}
            <div className="pageItem-assetCreate">
              <div className="pageItem-assetCreate__fields">
              <PasswordConfirm setModalState={setModalState}/>
                <form id="create-form">
                  {/* Deck name input */}
                  <input 
                  required
                  id="name"
                  type='text' 
                  name='name'
                  value={name}
                  onChange = {e => setName(e.target.value)}
                  placeholder = "Deck Name"/>

                  {/* Issue mode select dropdown */}
                  <select value={mode} onChange={e => setMode(e.target.value)} name="mode">
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
                    value={decimal}
                    onChange={e => setDecimal(e.target.value)}
                    placeholder="Decimal" />

                  {/* Asset specific data */}
                  <input
                    optional
                    id="data"
                    type="text"
                    name="data"
                    value={data}
                    placeholder="Asset Specific Data:"
                    onChange={e => setData(e.target.value)} />
                  
                </form>
              </div>
            {/* Manage Asset Summary */}
            <div className="pageItem-assetCreate__identicon">
              {/* Page Title */}
              <h1 className="pageTitle">Create</h1>

              {/* Blockie */}
              <Blockies seed={blockieVal} size={20} scale={6} color="#dfe" bgColor="#C06E5B" spotColor="#011627"/>

              <Protobuf
              // hard pass create so it knows which page
              type = "create"
              setProtobuf = {setProtobuf}
              setModalState = {setModalState}
              protobuf = {protobuf}
              name ={name}
              mode = {mode}
              decimal = {decimal}
              data = {data}
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