import React from 'react';
import Header from './Header';
import LoginPage from './LoginPage';
import SideBar from './components/SideBar';
import '../css/Container.css';
import {Route,Navlink, HashRouter} from "react-router-dom";

function Container() {


  return (
    <div className="Container">
      <div className="Content">
        <LoginPage/>
        <SideBar/>
      </div>
    </div>
  );
}

export default Container;
