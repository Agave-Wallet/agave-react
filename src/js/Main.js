import React from 'react';
import LoginPage from './LoginPage';
import SideBar from './SideBar';
import Overview from './Overview';
import Send from './Send';
import Transactions from './Transactions';
import Create from './Create';
import Manage from './Manage';
import '../css/Main.css';
import {Route,NavLink,HashRouter} from "react-router-dom";

function Container() {
  
  return (
    <div className="Container">
      <div className="Content">
      <HashRouter>

        <Route path="/" exact component={LoginPage}/>
        <Route path="/overview" exact component={Overview}/>
        <Route path="/send" exact component={Send}/>
        <Route path="/transactions" exact component={Transactions}/>
        <Route path="/create" exact component={Create}/>
        <Route path="/manage" exact component={Manage}/>
      </HashRouter>
      <SideBar/>
      </div>
    </div>
  );
}

export default Container;
