import React from 'react';
import '../../css/Page.css';
// import setProviderData from '../Main'
import AssetTable from './../utils/AssetTable'

function Overview(props){
    const address = sessionStorage.getItem("address")
    const userAssetsURL = "https://api.agavewallet.com/v1/transactions?address="+ address +"&type=card"

    return(
      <div className = "Page">
        {/* Page Title */}
        <h1 className="pageTitle">Overview</h1>

        {/* Actual page content */}
        <div className = "pageContent">

          {/* Asset Table */}
          <div className="pageItem-assetTable">
            Assets Table
            <AssetTable url={userAssetsURL} />
          </div>

          {/* Recent Transactions */}
          <div className="pageItem-recentTransactions">
            Recent User Transactions
            {/* List 10-15 most recent transactions of the account */}
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
