import React from 'react';
import '../css/Page.css';

class Create extends React.Component{
    render(){
      return(
        <div className = "Page">
          {/* Page Title */}
          <h1 className="pageTitle">Create</h1>

          {/* Actual page content */}
          <div className = "pageContent">
            
            {/* User balances */}
            <div className="pageItem-userBalances">
              User Balances
            </div>

            {/* Asset Table */}
            <div className="pageItem-assetTable">
              Assets Table
            </div>

            {/* Recent Transactions */}
            <div className="pageItem-recentTransactions">
              Recent Transactions
            </div>

            {/* Recent Created in Network */}
            <div className="pageItem-recentInNetwork">
              Recently Created In Network
            </div>

        </div>
      </div>
      )
    }
} 

export default Create;
