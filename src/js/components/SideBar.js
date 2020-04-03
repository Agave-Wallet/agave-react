import React from 'react';
import '../../css/SideBar.css';
import SideBarItem from './SideBarItem'

class SideBar extends React.Component{
    constructor(props){
      super(props)
    }


    /* Manage the logout function */
    logoutUser = () => {
      // Make sure you want to logout
      if (window.confirm("Are you sure you want to logout?")) {
        Object.keys(sessionStorage).forEach(k =>
          sessionStorage.removeItem(k)
        )
        // let content = document.getElementsByClassName("Content transitionIn")
        // content[0].className = "Content"
        window.location.hash = ""
      } else {
        window.location.hash = "overview"
      }
    }
            
  render(){
    return (
      <div className="SideBar">
        <div className="ItemContainer">
        <SideBarItem href="overview" icon="pie_chart" title="Overview" id="overview"/>
        <SideBarItem href="send" icon="send" title="Send" id="send"/>
        <SideBarItem href="transactions" icon="compare_arrows" title="Transactions" id="transactions"/>
        <SideBarItem href="manage" icon="account_balance_wallet" title="Manage" id="manage"/>
        <SideBarItem href="create" icon="star" title="Create" id="create"/>
        <SideBarItem href="" icon="logout" onclick={this.logoutUser} title="Logout" id="logout"/>
        </div>
      </div>
    );
  }
}

export default SideBar;
