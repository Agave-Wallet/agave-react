import React from 'react';
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
          <input type="search" placeholder="Search for reasons to live..."/>

          {/* Table for recent transactions */}
          <table id="myTable">
            <tr className="header">
              <th>Date</th>
              <th>Transaction Type</th>
              <th>Asset Name</th>
              <th>Amount</th>
            </tr>
            <tr>
              <td>3/30/2020</td>
              <td>Received</td>
              <td>Will2Live</td>
              <td>400.00</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Transactions;