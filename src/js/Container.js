import React from 'react';
import Header from './Header';
import LoginPage from './LoginPage';
import SideBar from './SideBar';
import MainView from './MainView';
import '../css/Container.css';

function Container() {
  return (
    <div className="Container">
      {/* Content */}
      <div className="Content">
        <LoginPage/>
      {/* Header */}
      {/* <Header/> */}
        {/* SideBar */}
        <SideBar/>
        {/* MainView */}
        <MainView/>
      </div>
    </div>
  );
}

export default Container;
