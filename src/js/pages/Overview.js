import React from 'react';
import '../../css/Page.css';
// import setProviderData from '../Main'
import AssetTable from './../utils/AssetTable'

function Overview(props){

    return(
      <div className = "Page">
        {/* Page Title */}
        <h1 className="pageTitle">Overview</h1>

        {/* Actual page content */}
        <div className = "pageContent">

          {/* Asset Table */}
          <div className="pageItem-assetTable">
            Assets Table
          </div>

          {/* Recent Transactions */}
          <div className="pageItem-recentTransactions">
            {/* List 10-15 most recent transactions of the account */}
            {/* <AssetTable url="https://api.agavewallet.com/v1/transactions?address=mj9z4Lxkz2zBgSerWQqAHMELGYj83nWLhj&type=deck" /> */}
          </div>

          {/* Recent Created in Network */}
          <div className="pageItem-recentInNetwork">
            <div><h2>Recent Network Transactions</h2></div>
          <AssetTable url="https://api.agavewallet.com/v1/assets?limit=500"/>
          </div>

      </div>
    </div>
    )
  }

export default Overview;
