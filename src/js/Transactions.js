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
            <tr class="header">
              <th>Name</th>
              <th>Country</th>
            </tr>
            <tr>
              <td>Alfreds Futterkiste</td>
              <td>Germany</td>
            </tr>
            <tr>
              <td>Berglunds snabbkop</td>
              <td>Sweden</td>
            </tr>
            <tr>
              <td>Island Trading</td>
              <td>UK</td>
            </tr>
            <tr>
              <td>Koniglich Essen</td>
              <td>Germany</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Transactions;