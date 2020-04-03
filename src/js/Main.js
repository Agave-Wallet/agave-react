import React, { useEffect,useState } from 'react';
import LoginPage from './pages/LoginPage';
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
// import PrivateRoute from './utils/PrivateRoute'

function Main(){
  return(
    <div className ="Main">
      <div className="Main-Content">
        {/* Manage pages and page changes */}
        <HashRouter>
          <Route path="/" exact component={LoginPage}  to="/overview" />
          <Route path="/overview" exact component={Overview}   to=""/>
          <Route path="/send" exact component={Send}   to="" />
          <Route path="/transactions" exact component={Transactions}   to=""/>
          <Route path="/create" exact component={Create}   to=""/>
          <Route path="/manage" exact component={Manage}   to=""/>

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
