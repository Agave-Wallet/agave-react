import React from 'react';
import '../../css/SideBar.css';
import SideBarItem from './SideBarItem'

class SideBar extends React.Component{

    /* Manage the logout function */
    logoutUser = () => {
      // Make sure you want to logout
      if (window.confirm("Are you sure you want to logout?")) {
        Object.keys(sessionStorage).forEach(k =>
          sessionStorage.removeItem(k)
        )
        // let content = document.getElementsByClassName("Content transitionIn")
        // content[0].className = "Content"
        window.location.hash = window.location.reload()
      } else {
        window.location.hash = "overview"
      }
    }
            
  render(){
    return (
      <div className="SideBar">
        <div className="ItemContainer">
        <SideBarItem href="overview" icon="Overview" title="Overview" id="overview"/>
        <SideBarItem href="send" icon="Send" title="Send" id="send"/>
        <SideBarItem href="transactions" icon="Transactions" title="Transactions" id="transactions"/>
        <SideBarItem href="create" icon="Add" title="Create" id="create"/>
        <SideBarItem href="" icon="Logout" onclick={this.logoutUser} title="Logout" id="logout"/>
        </div>
      </div>
    );
  }
}

export default SideBar;
