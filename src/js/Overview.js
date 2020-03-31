import React from 'react';
import '../css/Page.css';
import setProviderData from './Main'
import Chainz from '../js/providers/chainz'

class Overview extends React.Component{
    
    componentDidMount(){
       this.setProviderData()
    }

    constructor(props){
      super(props)
      this.state = {}
    }

    setProviderData = () => {
      // Set user balance
      const address = sessionStorage.getItem("address");
      // Initialize the Provider class - TODO: Multi network input
      const apiProvider = new Chainz('peercoin-testnet', address);
      // Add set balance - Refresh this value every fifteen seconds
      const elem = document.getElementById("user-balances")
      let balance = apiProvider.getBalancePromise()
      balance.then(data =>{
        elem.innerHTML = data
      })
      // Set unspent
      //setUnspent(apiProvider);
      }



    render(){
      
      return(
        <div className = "Page">
          {/* Page Title */}
          <h1 className="pageTitle">Overview</h1>

          {/* Actual page content */}
          <div className = "pageContent">
            
            {/* User balances */}
            <div className="pageItem-userBalances">
              User Balances:
              <div id = "user-balances"></div>
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

export default Overview;
