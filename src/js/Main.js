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
            console.log("User is Logged In")
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
    },[userBalance])

    // Grab the user's input and update the userInfo state. This will launch the associate useEffect Hook.
    const setLoginInfo = () => {
        const mnemonic = document.getElementById("mnemonic-select").value
        const password = document.getElementById("password-select").value
        const network = document.getElementById("network-select").value

        const address = window.getAddress(mnemonic, networks[network])
        const lockedKey = window.encryptData(password, mnemonic)

        // Query the provider for account balance and set it in sessionStorage
        const apiProvider = new Chainz('peercoin-testnet', address);
        let state = apiProvider.getBalancePromise()
        state.then(data => {
            if (data !== null){
            sessionStorage.setItem("balance",data)
            setUserBalance(data)
            }
        })

        setUserInfo( {address:address, lockedKey:lockedKey, network:network} )
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
                <Route path="/" exact component={Overview}/>
                <Route path="/overview" exact component={ () => <Overview/> }/>
                <Route path="/send" exact component={Send}/>
                <Route path="/transactions" exact component={Transactions} />
                <Route path="/create" exact component={Create} />
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

const getMnemonic = () => {
    const mnemonic = document.getElementById("mnemonic-select")
    mnemonic.value = window.getMnemonic()
}