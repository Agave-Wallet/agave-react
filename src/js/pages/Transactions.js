import React from 'react';
import {useTable, useFilters} from 'react-table';
import AssetTable from './../utils/AssetTable'
import '../../css/Page.css';

function Transactions() {

  const userAddress = sessionStorage.getItem("address")
 
  return (
    <div className = "Page">
      {/* Page Title */}
      <h1 className="pageTitle">Transactions</h1>
      {/* Actual page content */}
      <div className = "pageContent">
        {/* User balances */}
        <div className="pageItem-transactions">
          {/* Search Bar */}
         

          {/* Table for recent transactions */}
          <AssetTable url={"https://api.agavewallet.com/v1/transactions?address=" + userAddress + "&type=card"}/>

        </div>
      </div>
    </div>
  );
}

export default Transactions;