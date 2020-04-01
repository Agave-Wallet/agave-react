import React from 'react';
import LoginPage from './LoginPage';
import SideBar from './SideBar';
import Overview from './Overview';
import Send from './Send';
import Transactions from './Transactions';
import Create from './Create';
import Manage from './Manage';
import '../css/Main.css';
import {Route,HashRouter} from "react-router-dom";
import Provider from '../js/providers/chainz'
// import PrivateRoute from './utils/PrivateRoute'


class Main extends React.Component{

  constructor(props){
    super(props);
    this.state={pageType:"Deck"}
  }

  componentDidMount(){
    this.isAuthed()
  }
  
  isAuthed = () =>{
    this.setState( {isAuthed: sessionStorage.getItem("lockedKey") !== null})
  }

  // Change the page
  pageType = () => {
    // If the current page is Deck, change to card
    if (this.state.pageType === "Deck") {
      this.setState({ pageType: "Card"});
    } else {
      // If the current page is card, change to deck
      this.setState({ pageType: "Deck"});
    }  
  }

  handleClick = () => {
    this.pageType();
  }


  render(){
    return(
      <div className="Container">
        <div className="Content">
          <div className="ModeSwitch">
            {/* Has the mode switch */}
            <label className="switch">
              <input type="checkbox" id="togBtn" onClick={this.handleClick}/>
                  <div className="slider round">
                    <span className="off">Decks</span>
                    <span className="on">Cards</span>
                  </div>
            </label>
          </div>
          {/* Manage pages and page changes */}
          <HashRouter>
            <Route path="/" exact component={LoginPage} isAuthed={this.state.isAuthed} to="/overview"/>
            <Route path="/overview" exact component={Overview} isAuthed={this.state.isAuthed} pageType={this.state.pageType} to=""/>
            <Route path="/send" exact component={Send} isAuthed={this.state.isAuthed} pageType={this.state.pageType} to=""/>
            <Route path="/transactions" exact component={Transactions} isAuthed={this.state.isAuthed} pageType={this.state.pageType} to=""/>
            <Route path="/create" exact component={Create} isAuthed={this.state.isAuthed} pageType={this.state.pageType} to=""/>
            <Route path="/manage" exact component={Manage} isAuthed={this.state.isAuthed} pageType={this.state.pageType} to=""/>

            {/* <Route path = "/wherever" render={(props) => <Component {...props} isAuthed={true} /> */}
          </HashRouter>
          {/* Draw the sidebar */}
        <SideBar/>
      </div>
    </div>
    )
  }
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
