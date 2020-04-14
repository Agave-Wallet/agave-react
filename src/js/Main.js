import React, {useState, useEffect} from 'react'
import {Route,HashRouter} from "react-router-dom";

// Components
import SideBar from './components/SideBar';
import ContentBar from './components/ContentBar'
import LoginInput from '../js/components/LoginInput'

// Styling
import {ReactComponent as Logo} from '../img/logo_only.svg'
import '../css/Main.css';
import '../css/LoginPage.css';


// Pages
import Overview from './pages/Overview';
import Send from './pages/Send';
import Transactions from './pages/Transactions';
import Create from './pages/Create';

// Providers
import BlockBook from '../js/providers/blockbook'
import Chainz from '../js/providers/chainz'
import { isCompositeComponent } from 'react-dom/test-utils';

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
    const [userBalance, setUserBalance ] = useState(null)
    const [lastBlock, setLastBlock ] = useState("")

    const [userNetwork, setUserNetwork ] = useState("")
    const [lastBlockTime, setLastBlockTime ] = useState("")
    const [inSync, setInSync ] = useState(false)

    const [ ticker, setTicker ] = useState("")
    ///////////////////////////////////////////////////////////////////////////
    // This hook launches when isModal changes. Will re-render after it's done.
    //////////////////////////////////////////////////////////////////////////
    useEffect( () => {
        // Turn off box shadow
        // document.getElementsByClassName("Main").style.boxShadow = "";
        
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
            hideStatus()

            // console.log("isLoggedIn: userBalance", userBalance)
            // console.log("isLoggedIn: lastBlock", lastBlock)
            // console.log("isLoggedIn: lastBlockTime", lastBlockTime)
            // console.log("isLoggedIn: userNetwork", userNetwork)
            // console.log("isLoggedIn: inSync", inSync)

            if (userBalance === null){
                document.getElementById('user-balance').innerHTML = "Loading..."
            }else{
                document.getElementById('user-balance').innerHTML = userBalance + " " + ticker
            }
            if (lastBlock === null){
                document.getElementById('last-block').innerHTML = "Loading..."
                document.getElementById("blockStatus").style.fill = "red"
            } else {
                document.getElementById("last-block").innerHTML = "Last Block: " + lastBlock
                document.getElementById("blockStatus").style.fill = "lime"
            }
            if (lastBlockTime === null){
                document.getElementById('last-blockTime').innerHTML = "Loading..."
            } else {
                document.getElementById('last-blockTime').innerHTML = "Last Block Time: " + lastBlockTime
            }
            if (userNetwork === null){
                document.getElementById('userNetwork').innerHTML = "Loading..."
            } else {
                document.getElementById('userNetwork').innerHTML = "User Network: " + userNetwork
            }
            // console.log("Blockstatus", document.getElementById("blockStatus").attributes.fill)
            // console.log("inSync is false", inSync === false)
            if (inSync === false) {
                document.getElementById("blockStatus").attributes.fill = "red"
            } else {
                document.getElementById("blockStatus").attributes.fill = "lime";
            }
        }
    },[userBalance, lastBlock, lastBlockTime, userNetwork, inSync])


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
        setUserInfo( {address:address, lockedKey:lockedKey, network:network} )

    }

    const queryProvider=()=>{
        const chain = 'peercoin-testnet'

        if (chain === "peercoin-testnet"){
            setTicker("tPPC")
        } else if (chain === "peercoin") {
            setTicker("tPPC")
        } else if (chain === "bch"){
            setTicker("BCH")
        } else if (chain === "bch-test"){
            setTicker("tBCH")
        } else {
            setTicker("")
        }
        // Set our provider
        const apiProvider = new BlockBook(chain, address);
        // Get user balance
        let balanceState = apiProvider.getBalancePromise()
        balanceState.then(data => {
            if (data !== null) {
                sessionStorage.setItem("balance", data.balance)
                setUserBalance(data.balance)
            }
        })
        // Get last block
        let blockState = apiProvider.getChainInfoPromise()
        blockState.then(data => {
            if (data !== null) {
                // console.log("blockState: Last Block", data.blockbook.bestHeight)
                // console.log("blockState: Last Block Time", data.blockbook.lastBlockTime)
                // console.log("blockState: Network", data.blockbook.coin)
                // console.log("blockState: inSync", data.blockbook.inSync)
            
                setLastBlock(data.blockbook.bestHeight)
                const lastBlockTime = new Date(data.blockbook.lastBlockTime)
                setLastBlockTime(lastBlockTime.toLocaleString())
                setUserNetwork(data.blockbook.coin)
                setInSync(data.blockbook.inSync) // Returns boolean
            }
        })

        //let networkState = apiProvider.

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
    }, {});
    
    function getUnspent(){
        const apiProvider = new Chainz("peercoin-testnet", address)
        console.log(apiProvider.getFormatedUnspent())
        setUnspent(apiProvider.getFormatedUnspent())
    }
    
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
            const newTx = createTransaction(txInfoSend.amount, address, txInfoSend.receivingAddress, txInfoSend.data)
            setTransaction(newTx)
        }
    },[txInfoSend])

    useEffect( () =>{
        // console.log(txInfoCreate)
        if (Object.keys(txInfoCreate).length > 0){
            // Use state constants to fill out the createTransaction call
            // 0.01 is default Spam Preventative Fee for PeerAssets Transactions
            // Hard coded p2thAddress
            const p2thAddress = "miHhMLaMWubq4Wx6SdTEqZcUHEGp8RKMZt"
            const newTx = createTransaction( 10000, address, p2thAddress, txInfoCreate.data)
            setTransaction(newTx)

        }
    },[txInfoCreate])
    
    // Create a transaction
    function createTransaction( amount, sender, receiver, protobuf) {
        console.log("selectUnspent", selectUnspent(amount))
        let useUnspent = selectUnspent(amount)
        let transaction = new window.agave.newTransaction(useUnspent, amount, sender, receiver, protobuf)
        useUnspent = selectUnspent( amount + transaction.getFee() )
        console.log(transaction.inputs)
        transaction = new window.agave.newTransaction(useUnspent, amount, sender, receiver, protobuf)
        
        // if (transaction.getFee() + amount < sum(transaction.inputs.values))
            // If the amount you want to spend is less than the cost + fee, then 
        return transaction
    }

    function selectUnspent(amount){
         // Create new transaction
        let useUnspent = []
        let useAmount  = 0

        console.log("unspent", unspent)
         // Get unspent to spend
        unspent.forEach( u =>{
             // If the user does not have enough unspent, add another
            if (amount - useAmount >= 0){
                console.log(amount - useAmount)
                useUnspent.push(u)
                useAmount += u.satoshis
            }
        })
        return useUnspent
    }

    // Sign send transactions
    useEffect( ()=>{
        if (signTransactionSend && transaction !== false ){
            console.log(transaction.serialize())
            const signed = signTransaction(transaction)
            if (signed.verify()){
                // TODO: Unspent handling
                submitTransaction(signed.serialize())
            } else{
                console.log("Failed to construct Transaction")
            }

        } else {
            showStatus("Balance Insufficient!")
        }
    },[signTransactionSend])

    // Sign create transaction
    useEffect( ()=>{
        if (signTransactionCreate && transaction !== false){
            const signed = signTransaction(transaction)
            if (signed.verify()){
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
        console.log(signed)
        console.log(signed.serialize())
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

    // Expects a string
    function showStatus(status) {
        document.getElementById("showStatus").innerHTML = status
        document.getElementById("showStatus").style.visibility = "visible"
        document.getElementById("showStatus").style.border = "1px solid"
        setTimeout(hideStatus(), 5000)
    }

    function hideStatus() {
        document.getElementById("showStatus").style.visibility = "hidden"
        document.getElementById("showStatus").style.border = "0px none"
    }

    // Load loading animation
    function isLoading() {
        document.getElementsByClassName("loader").style.display = "block"
        document.getElementsByClassName("Page").style.display = "none"
    }

    function hideLoading() {
        document.getElementsByClassName("loader").style.display = "none"
        document.getElementsByClassName("Page").style.display = "block"
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
                <Route path="/send" exact render={ (props) => <Send setTxInfoSend={setTxInfoSend} unspent={unspent} setSignTransactionSend={setSignTransactionSend} address={address} /> }/>
                <Route path="/transactions" exact render={ () => <Transactions/> }/>
                <Route path="/create" exact render={ (props) => <Create setTxInfoCreate={setTxInfoCreate} txInfoCreate={txInfoCreate} setSignTransactionCreate={setSignTransactionCreate} /> } />
                {/* <Route path = "/wherever" render={(props) => <Component {...props} isAuthed={true} /> */}
                <ContentBar userInfo={userInfo}/>
                <SideBar/>
              </HashRouter>
                
                }
                <div className="showStatus" id="showStatus"></div>
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