import React from 'react';
import '../css/SideBar.css';
import SideBarItem from './SideBarItem'

function SideBar () {
  return (
    <div className="SideBar">
      <SideBarItem className="Overview" icon="pie_chart"/>
      <SideBarItem className="Send" icon="send"/>
      <SideBarItem className="Transactions" icon="compare_arrows"/>
      <SideBarItem className="Manage" icon="account_balance_wallet"/>
    </div>
  );
}

export default SideBar;
