import React from 'react';
import '../../css/Page.css';
// import setProviderData from '../Main'
import AssetTable from './../utils/AssetTable'
import '../../css/AssetTable.css'
import Icons from '../../img/symbol-defs.svg';


function Overview(props){
    const address = sessionStorage.getItem("address")

    return(
      <div className = "Page">
        {/* Page Title */}
        <h1 className="pageTitle">Overview</h1>

        {/* Actual page content */}
        <div className = "pageContent">

          {/* Asset Table */}
          <div className="pageItem-assetTable">
            Assets Table
            <AssetTable type={"balances"} />
          </div>

          {/* Recent Created in Network */}
          {/* <div className="pageItem-recentInNetwork">
            <div><h2>Recent Network Transactions</h2></div>
          <AssetTable url="https://api.agavewallet.com/v1/assets?limit=500"/>
          </div> */}

      </div>
    </div>
    )
  }

export default Overview;
