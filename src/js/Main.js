import React, {useState, useEffect} from 'react'
import {Route,HashRouter} from "react-router-dom";

// Components
import SideBar from './components/SideBar';
import ContentBar from './components/ContentBar'
import LoginInput from '../js/components/LoginInput'

// Styling
import {ReactComponent as Logo} from '../img/logo2.svg'
import '../css/Main.css';
import '../css/LoginPage.css';


// Pages
import Overview from './pages/Overview';
import Send from './pages/Send';
import Transactions from './pages/Transactions';
import Create from './pages/Create';

// Providers
import Chainz from '../js/providers/chainz'
import BlockBook from '../js/providers/blockbook'
// import { Blockbook } from 'blockbook-client'



function Main(){
    // Define state variables to be used
    // Check current sessionStorage to see if user data is set (This helps when page is refreshed)
    const address = sessionStorage.getItem("address")
    const sessionLoggedIn =  !(address === null || address === undefined) 

    // isLoggedIn will be set to true or false depending if the sessionStorage has the address stored
    const [isLoggedIn,setLoggedIn] = useState(sessionLoggedIn)
    // Used to toggle the state of the Modal
    const [isModal,setModal] = useState(false)
    // Update user info such as Address, lockedKey, and Network
    const [userInfo, setUserInfo] = useState({})
    // Set Mnemonic Seed in sessionStorage
    const [mnemonicSeed, setMnemonic] = useState({})

    // We need to separate userBalance because it's async and waits on response to be processed
    const [userBalance, setUserBalance] = useState(null)
    ///////////////////////////////////////////////////////////////////////////
    // This hook launches when isModal changes. Will re-render after it's done.
    //////////////////////////////////////////////////////////////////////////
    useEffect( () => {
        // if user is not logged in, load login form
        if (!isLoggedIn){
        // Will alternate between welcome screen and login form    
            const welcomeDisplay = (isModal ? "none" : "relative")
            document.getElementById("LoginMain-welcome").style.display = welcomeDisplay
            const modalDisplay = (isModal ? "block" : "none")
            document.getElementById("login-modal").style.display = modalDisplay
        }
    }, [isModal])

    //////////////////////////////////////////////////////////////////////////////
    // This hook launches when isLoggedIn changes. Will re-render after it's done.
    //////////////////////////////////////////////////////////////////////////
    useEffect( () =>{
        if (isLoggedIn){
            // On initial Load
            queryProvider();
            // Repeat query every X seconds
            setInterval(()=>{
                queryProvider();
                console.log('setTimeoutworking from main')              
                
            },10000)
            
        }
    },[isLoggedIn])

    /////////////////////////////////////////////////////////////////////////////
    // This Hook launches when userInfo changes. Will re-render after it's done.
   /////////////////////////////////////////////////////////////////////////////
    useEffect( ()=>{
        // Check length of current userInfo state, if > 0 then add to sessionStorage
        if (Object.keys(userInfo).length){
            sessionStorage.setItem("address", userInfo.address)
            sessionStorage.setItem("lockedKey",userInfo.lockedKey)
            sessionStorage.setItem("network",userInfo.network)
        }
        if (userInfo.address && userInfo.lockedKey && userInfo.network){
            setLoggedIn(true)
        }
            // divs = {"user-address":"address",}
    },[userInfo])

    //////////////////////////////////////////////////////////////////////////
    // This hook re-renders when userBalance changes ////////////////////////
    //////////////////////////////////////////////////////////////////////////
    useEffect( ()=>{

        if (isLoggedIn){
            if (userBalance === null){
                document.getElementById('user-balance').innerHTML = "Loading..."
            }else{
                document.getElementById('user-balance').innerHTML = userBalance + " PPC"
            }
        }
    },[userBalance])


    // if (isLoggedIn){
    // setInterval(()=>{
    //     console.log("set interval working")
    //     queryProvider();
    // },10000)
    // Grab the user's input and update the userInfo state. This will launch the associate useEffect Hook.
    const setLoginInfo = () => {
        const mnemonic = document.getElementById("mnemonic-select").value
        const password = document.getElementById("password-select").value
        const network = document.getElementById("network-select").value

        const mnemonicObject = window.agave.getMnemonicObject(mnemonic)
        const address = window.agave.getAddressMnemonic(mnemonicObject)
        const lockedKey = window.agave.encryptData(password, mnemonic)
        console.log(mnemonic)
        setUserInfo( {address:address, lockedKey:lockedKey, network:network} )
    }

    const queryProvider=()=>{
        const apiProvider = new Chainz('peercoin-testnet', address);
        let state = apiProvider.getBalancePromise()
        state.then(data => {
            if (data !== null) {
                sessionStorage.setItem("balance", data)
                setUserBalance(data)
            }
        })
    }

    const getMnemonic = () => {
        const mnemonic = document.getElementById("mnemonic-select")
        const newMnemonic = window.agave.getMnemonic()
        setMnemonic(newMnemonic.toString())
        mnemonic.value = newMnemonic.toString()
    }

    ///////////////////////////////////////////////////////////////
    ////////////////// Get unspent ( UTXOS ) //////////////////////
    ////////////////////////////////////////////////////////////// 
    const [unspent, setUnspent] = useState([])

    // Run a single time lmao 5head
    useEffect( ()=> {
        getUnspent();
        console.log("getUnspent Ran", unspent)
    }, {});
    
    function getUnspent(){
        const apiProvider = new Chainz("peercoin-testnet", address)
        setUnspent(apiProvider.getFormatedUnspent())
        console.log(apiProvider.getFormatedUnspent())
    }
    
    /////////////////////////////////////////////////////////////////
    /////////////Blockie ///////////////////
    ////////////////////////////////////////////////////////////// 
    // TODO
    const [blockieVal, setBlockieVal] = useState("")

    /////////////////////////////////////////////////////////////////
    /////////////Construct and Sign Tranasction ///////////////////
    ////////////////////////////////////////////////////////////// 
    // General transaction things
    const [transaction, setTransaction] = useState()
    // Send transaction
    const [txInfoSend, setTxInfoSend] = useState({})
    const [signTransactionSend,setSignTransactionSend] = useState(false)
    // Create Deck
    const [txInfoCreate, setTxInfoCreate] = useState({})
    const [signTransactionCreate,setSignTransactionCreate] = useState(false)
    
    // Protobuf
    const [protobuf, setProtobuf] = useState(false)

    useEffect( () =>{
        if (Object.keys(txInfoSend).length > 0){
            // Use state constants to fill out the createTransaction call
            const newTx = createTransaction(unspent, txInfoSend.amount, address, txInfoSend.receivingAddress, txInfoSend.data)
            console.log(newTx)
            setTransaction(newTx)
        }
    },[txInfoSend])

    useEffect( () =>{
        console.log(txInfoCreate)
        if (Object.keys(txInfoCreate).length > 0){
            // Use state constants to fill out the createTransaction call
            // 0.01 is default Spam Preventative Fee for PeerAssets Transactions
            // Hard coded p2thAddress
            const p2thAddress = "miHhMLaMWubq4Wx6SdTEqZcUHEGp8RKMZt"
            const newTx = createTransaction(unspent, 10000, address, p2thAddress, txInfoCreate.data)
            console.log(newTx)
            setTransaction(newTx)
        }
    },[txInfoCreate])
    
    // Create a transaction
    function createTransaction(unspent, amount, sender, receiver, protobuf) {
        // Create new transaction
        const transaction = new window.agave.newTransaction(unspent, amount, sender, receiver, protobuf)
        return transaction
    }

    useEffect( ()=>{
        if (signTransactionSend){
            const signed = signTransaction(transaction)
            if (signed.verify()){
                console.log(signed.serialize())
                submitTransaction(signed.serialize())
            } else{
                console.log("Failed to construct Transaction")
            }

        }
    },[signTransactionSend])

    useEffect( ()=>{
        if (signTransactionCreate){
            const signed = signTransaction(transaction)
            if (signed.verify()){
                console.log(signed.serialize())
                submitTransaction(signed.serialize())

            } else{
                console.log("Failed to construct Transaction")
            }

        }
    },[signTransactionCreate])

    function signTransaction(transaction){
        // Get password/privkey for signing transaction
        const password = document.getElementById("password-submit").value
        const lockedKey = sessionStorage.getItem("lockedKey")
        const mnemonic = window.agave.decryptData(password,lockedKey)
        const mnemonicObject =  window.agave.getMnemonicObject(mnemonic)
        const privkey = window.agave.getPrivateKeyFromMnemonic(mnemonicObject,false)
        const signed =  window.agave.signTransaction(transaction, privkey)
        return signed
    }


    // const blockbook = new Blockbook({nodes:[ 'tblockbook.peercoin.net']})

    function submitTransaction(rawTransaction){
        const apiProvider = new BlockBook('peercoin-testnet',address)
        let promise = apiProvider.postRawTransaction(rawTransaction)
        promise.then(data =>{
            console.log(data)
            return data.result
        })
        // const result = await blockbook.sendTx(rawTransaction)
        // console.log(result)
    }

    //////////////////////////////////////////////////////////////////////////
    // Construct the return /////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    return(
        <div className="Main">
            <div className="Main-Content">
                {/* Conditionally load the login paged based on if user is logged in */}
                { !isLoggedIn ?
                <div className="LoginPage">
                    <div className="LoginMain">
                        <div id="LoginMain-welcome" className="welcome">
                            <div className="Logo" id="Logo">
                                <Logo />
                            </div>
                            <h1>Welcome to Agave</h1>
                            <LoginInput value="login" type="button" id="Login-button" onclick={()=>{setModal(true)}}/>
                        </div>
                    <div className="modal" id="login-modal">
                        <div className="modal-content" id="modal-content">
                            <h1>Login</h1>
                            <LoginInput id="network-select" value="network" type="select" className="form-select"/>
                            <LoginInput id="mnemonic-select" type="text"  placeholder="12-Word Passphrase" className="form-text"/>
                            <LoginInput id="generate-submit" value="generate new" type="button" onclick={getMnemonic}/>
                            <LoginInput id="password-select" type="password" placeholder="Temporary Password" className="form-text"/>
                            <LoginInput value="submit" type="button" onclick={setLoginInfo} id="Login-submit"/>
                        </div>  
                    </div>
                    </div>
                </div>
                : 
                <HashRouter>
                <Route path="/" exact render={Overview}/>
                <Route path="/overview" exact render={ () => <Overview address={address}/> }/>
                <Route path="/send" exact render={ (props) => <Send setTxInfoSend={setTxInfoSend} setSignTransactionSend={setSignTransactionSend} address={address} /> }/>
                <Route path="/transactions" exact render={ () => <Transactions/> }/>
                <Route path="/create" exact render={ (props) => <Create setTxInfoCreate={setTxInfoCreate} setSignTransactionCreate={setSignTransactionCreate} /> } />
                {/* <Route path = "/wherever" render={(props) => <Component {...props} isAuthed={true} /> */}
                <ContentBar userInfo={userInfo}/>
                <SideBar/>
              </HashRouter>
                
                }
            </div>
        </div>
    )


}

export default Main;

//////////////////////////////////////////////////////////////////////////
// Helper Functions and Constants ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
const networks = {
    "Peercoin Testnet":"peercoinTestnet",
    "Peercoin":"peercoin",
    "Bitcoin Cash":"bitcoinCash",
    "Bitcoin Cash Testnet":"bitcoinCashTestnet" 
  }