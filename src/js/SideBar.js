import React from 'react';
import '../css/SideBar.css';
import SideBarItem from './SideBarItem'
import {ReactComponent as Logo} from '../img/logo2.svg'

function SideBar () {
    /* Manage the logout function */
    const logoutUser = () => {
      const sessionKeys = ["lockedKey", "address","network"]
      for (const k in sessionKeys.values){
      sessionStorage.removeItem(k)
      }
      window.location = ""
      console.log("I've found the log-out but nothing is happening yet")
    } 
  
  return (
    <div className="SideBar">
      <div className="ItemContainer">
      <SideBarItem href="overview" icon="pie_chart" title="Overview"/>
      <SideBarItem href="send" icon="send" title="Send"/>
      <SideBarItem href="transactions" icon="compare_arrows" title="Transactions"/>
      <SideBarItem href="manage" icon="account_balance_wallet" title="Manage"/>
      <SideBarItem href="" icon="logout" onclick={logoutUser} id="logout-key" title="Logout"/>
      </div>
    </div>
  );
}

export default SideBar;
