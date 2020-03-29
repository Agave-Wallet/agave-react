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
      <SideBarItem href="overview" icon="pie_chart"/>
      <SideBarItem href="send" icon="send"/>
      <SideBarItem href="transactions" icon="compare_arrows"/>
      <SideBarItem href="manage" icon="account_balance_wallet"/>
      <SideBarItem href="" icon="logout" onclick={logoutUser} id="logout-key"/>
    </div>
  );
}

export default SideBar;
