import React, { useEffect,useState, useCallback ,useRef} from 'react';
// import LoginPage from './pages/LoginPage';
import SideBar from './components/SideBar';
import ContentBar from './components/ContentBar'
import Overview from './pages/Overview';
import Send from './pages/Send';
import Transactions from './pages/Transactions';
import Create from './pages/Create';
import Manage from './pages/Manage';

import '../css/Main.css';
import {Route,HashRouter} from "react-router-dom";
import Provider from '../js/providers/chainz'


import '../css/LoginPage.css';
import LoginInput from '../js/components/LoginInput'
import {ReactComponent as Logo} from '../img/logo2.svg'
// import PrivateRoute from './utils/PrivateRoute'

function Main(){
  const [isLoggedIn, setLoggedIn] = useState(false);


  useEffect( ()=>{
    verifyLogin()
  })

  useEffect( () =>{
    if (isLoggedIn){
      const address = sessionStorage.getItem("address")
      const balance = sessionStorage.getItem("balance")
      const addrElem = document.getElementById("user-address")
      const balanceElem = document.getElementById("user-balance")
      addrElem.innerHTML = address
      balanceElem.innerHTML = balance + " PPC"
  }},[isLoggedIn]);

  const verifyLogin = useCallback( ()=>{
    const address = sessionStorage.getItem("address")
    if (address !== null){
      setLoggedIn(true)
    }
  },[isLoggedIn])

  return(
    <div className ="Main">
      <div className="Main-Content">
        {/* Manage pages and page changes */}
        <HashRouter>
          <Route path="/" exact component={Login}  isLoggedIn={isLoggedIn}/>
          <Route path="/overview" exact component={Overview}  isLoggedIn={isLoggedIn} />
          <Route path="/send" exact component={Send} isLoggedIn={isLoggedIn} />
          <Route path="/transactions" exact component={Transactions} isLoggedIn={isLoggedIn} />
          <Route path="/create" exact component={Create} isLoggedIn={isLoggedIn} />
          <Route path="/manage" exact component={Manage} isLoggedIn={isLoggedIn} />

          {/* <Route path = "/wherever" render={(props) => <Component {...props} isAuthed={true} /> */}
        </HashRouter>
        {/* Draw the sidebar */}
      <ContentBar/>
      <SideBar/>
    </div>
    </div>
        
    
  )
}

export default Main;


function Login(){
  const [ modalState, setModalState] = useState(false)
  const [ isLoading, setLoading] = useState(true)
  
  // adds event listen to switch the modal on/off on welcome screen (will remove listener on logout)

  useEffect( ()=>{
    const loginButton = document.getElementById("Login-button")
    const loginModal = document.getElementsByClassName("modal")[0]
    const loginPage = document.getElementsByClassName("LoginPage")[0]
    const loginSubmit = document.getElementById("Login-submit")
    loginButton.addEventListener('click',function(){
      openModal(loginModal)
      loginSubmit.addEventListener('click', function(){
        setLogin()
      })
    },false)
    loginPage.addEventListener('click',function(e){
      isModalClick(e)
    },false)
    }) 

  useEffect( () =>{
    console.log("state: " + modalState)
  },[modalState])

  useEffect( ()=>{
    if (!isLoading){
    const loginSubmit = document.getElementById("Login-submit")
    window.location.hash = "overview"
    loginSubmit.removeEventListener('click',function(){})
    }
  },[isLoading])

  const setLogin = useCallback( ()=>{
    console.log("setting login")
    const network = document.getElementById("network-select").value
    const mnemonic = document.getElementById("mnemonic-select").value
    const sessionKey = document.getElementById("password-select").value

    const address = window.getAddress(mnemonic, networks[network])
    const lockedKey = window.encryptData(sessionKey, mnemonic)

    sessionStorage.setItem("network", networks[network])
    sessionStorage.setItem("address", address)
    sessionStorage.setItem("lockedKey", lockedKey)
    setLoading(false)

  }, [isLoading])

  const openModal = useCallback( (elem) =>{
    elem.style.display = "flex"
    fadeOut("welcome")
    setModalState(true)
  }, [modalState])

  const closeModal = useCallback( (elem) =>{
    elem.style.display = "none"
    fadeIn("welcome")
    setModalState(false)
  },[modalState])

  const isModalClick = e => {
      if (e.target.id !== "Login-button" && e.target.id !== "login-submit"){
      const loginModal = document.getElementsByClassName("modal")[0]
      const paths = e.composedPath()
      let inModal = false
      for (let k=0;k <paths.length-1;k++){
        if ("modal" === paths[k].className){
          inModal = true}   
      }
    if (!inModal){
      closeModal(loginModal)
      }
    }
  }


  const getMnemonic = () => {
    const mnemonic = document.getElementById("mnemonic-select")
    mnemonic.value = window.getMnemonic()
  }

  const fadeIn = el =>{
    // Should probably change this to a CSS thing, you know, where you just add on to the current class...
    const elem = document.getElementsByClassName(el)[0];
    elem.style.transition = "opacity 0.6s linear 0s";
    elem.style.opacity = "100%";
  }

  const fadeOut = el =>{
    // Same comments from fadeIn
    const elem = document.getElementsByClassName(el)[0];
    elem.style.transition = "opacity 0.6s linear 0s";
    elem.style.opacity = "0%";
  }

    return(
      <div className="LoginPage">
        <div className="LoginMain">
          <div id="LoginMain-welcome" className="welcome">
            <div className="Logo" id="Logo">
              <Logo />
            </div>
            { /* This will make the login form visible */}
            <h1>Welcome to Agave</h1>
            <LoginInput value="login" type="button" id="Login-button"/>
        </div>
        <div className="modal" id="login-modal">
          <div className="modal-content" id="modal-content">
            <h1>Login</h1>
            <LoginInput id="network-select" value="network" type="select" className="form-select"/>
            <LoginInput id="mnemonic-select" type="text"  placeholder="12-Word Passphrase" className="form-text"/>
            <LoginInput id="generate-submit" value="generate new" type="button" onclick={getMnemonic}/>
            <LoginInput id="password-select" type="password" placeholder="Temporary Password" className="form-text"/>
            <LoginInput value="submit" type="button" id="Login-submit"/>
          </div>  
        </div>
        </div>
      </div>
    )
    }




const networks = {
  "Peercoin Testnet":"peercoinTestnet",
  "Peercoin":"peercoin",
  "Bitcoin Cash":"bitcoinCash",
  "Bitcoin Cash Testnet":"bitcoinCashTestnet" 
}









// Set user balance, get table information and check it every x seconds
export function setProviderData () {
  // Set user balance
  const address = sessionStorage.getItem("address");
  // Initialize the Provider class - TODO: Multi network input
  const apiProvider = new Provider.Chainz('peercoin-testnet', address);
  // Add set balance - Refresh this value every fifteen seconds
  const elem = document.getElementById("user-balances")
  let balance = apiProvider.getBalancePromise()
  console.log(balance)
  console.log("we are here")
  balance.then(data =>{
    elem.innerHTML = data
    console.log(data)
  })
  // Set unspent
  //setUnspent(apiProvider);
  }

// Will get the User's balance for the given Address
function setBalance(apiProvider){
  let state = apiProvider.getBalancePromise()
  const elem = document.getElementById("user-balances")
  state.then(data => {
    elem.innerHTML = data
    console.log(data)
  })
}

// Will get the User's available unspent transactions - This is used to created new transactions
function setUnspent(apiProvider){
  let state = apiProvider.getUnspentPromise()
  state.then(data => {
    console.log(data)
  })
}

// const isLoggedIn = () => {
//   const address = sessionStorage.getItem('address'); 
//   const lockedKey = sessionStorage.getItem('lockedKey');
//   if (address && lockedKey == lockedKey){
//       console.log(true)
//       // Add the address
//       // document.getElementById('address').innerHTML = address;
//       // document.getElementById("address").style.visibility = "visible"
//       // console.log(address)
//       // // Set the Identicon
//       // document.getElementById("address-identicon").setAttribute("data-jdenticon-value", address)
//       // document.getElementById("address-identicon").style.visibility = "visible"
//       return true;
//   } else{
//       return false;
//   }
// }