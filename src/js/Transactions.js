import React from 'react';
import AssetTable from './utils/AssetTable'
import '../css/Page.css';

function Transactions() {
 
  return (
    <div className = "Page">
      {/* Page Title */}
      <h1 className="pageTitle">Transactions</h1>
      {/* Actual page content */}
      <div className = "pageContent">
        {/* User balances */}
        <div className="pageItem-transactions">
          {/* Search Bar */}
          <input type="search" placeholder="Search for a way to help others"/>

          {/* Table for recent transactions */}
          <div>
            <table>
                <thead>
                    {/* {this.getHeader()} */}
                </thead>
                <tbody>
                    {/* {this.getRowsData()} */}
                </tbody>
            </table>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;