import React from 'react';
import '../css/Page.css';
import setProviderData from './Main'
import Chainz from '../js/providers/chainz'
import AssetTable from './utils/AssetTable'

class Overview extends React.Component{

    componentWillMount(){
      this.setUserData()
    }
    componentDidMount(){
      this.setProviderData()
    }


    constructor(props){
      super(props)
      this.state = {};
      this.pageType = this.props.pageType
    }

    setUserData = () =>{
      // Set user balance
      const address = sessionStorage.getItem("address");
      // SHould be address in the future, use default one with decks for now
      this.setState({address:"mj9z4Lxkz2zBgSerWQqAHMELGYj83nWLhj"})
      // Initialize the Provider class - TODO: Multi network input
      this.apiProvider = new Chainz('peercoin-testnet', address);
      this.url = "https://api.agavewallet.com/v1/transactions?address="+"mj9z4Lxkz2zBgSerWQqAHMELGYj83nWLhj"+"&type=deck"


    }

    setProviderData = () => {
      // Add set balance - Refresh this value every fifteen seconds
      const elem = document.getElementById("user-balances")
      // Set user address element
      const userElem = document.getElementById("user-address")
      userElem.innerHTML = this.state.address
      const balance = this.apiProvider.getBalancePromise()
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
              <div id = "user-address"></div>
              <div id = "user-balances"></div>
            </div>

            {/* Asset Table */}
            <div className="pageItem-assetTable">
              Assets Table

            </div>

            {/* Recent Transactions */}
            <div className="pageItem-recentTransactions">
              Recent Transactions
              {/* List 10-15 most recent transactions of the account */}
              <AssetTable url="https://api.agavewallet.com/v1/transactions?address=mj9z4Lxkz2zBgSerWQqAHMELGYj83nWLhj&type=deck" />
            </div>

            {/* Recent Created in Network */}
            <div className="pageItem-recentInNetwork">
              <div><h2>Recent Network Transactions</h2></div>
            <AssetTable url="https://api.agavewallet.com/v1/assets"/>
            </div>

        </div>
      </div>
      )
    }
} 

export default Overview;
