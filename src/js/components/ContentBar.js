import React, {useState, useEffect, useLayoutEffect} from 'react';
import Icons from '../../img/symbol-defs.svg';
import Blockies from 'react-blockies';
import '../../css/ContentBar.css';
import createCanvas from 'canvas'

// import SideBarItem from './SideBarItem'

function ContentBar(props){
    
      // Click identicon and copy to clipboard
    const copyAddress = () => {
      const range = document.createRange();
      const elem = document.getElementById("user-address")
      range.selectNode(elem)
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand("copy")
      window.getSelection().removeAllRanges();
      alert("Address copied!")
    }

    useLayoutEffect( ()=>{
      const identicon = document.getElementById("hashicon")
      if( !identicon.firstChild){
        identicon.appendChild(window.hashicon(sessionStorage.getItem('address',80)))
      }

    }, [])

    /* Manage the logout function */

    return (
      <div className="ContentBar">
        <div className="wrapper">
          <div className="one">
            <div className="UserLogo">
              <div className="blockie" id="hashicon" onClick={copyAddress}>
                {/* <Blockies seed={sessionStorage.getItem("address")} size={20} scale={6} color="#dfe" bgColor="#C06E5B" spotColor="#011627"/> */}
              </div>
              <div className = "container__user__address">
                <div className = "user_address">
                  <svg className="side-nav__link">
                  <use href={`${Icons}#icon-Address`} title="Address"></use>
                  </svg>
                  <div className="content-header">User Address </div>
                </div>
              </div>
              <div id="user-address" className="content-text">{sessionStorage.getItem("address")}</div>
            </div>
          </div>
          
          <div className="two bottomBorder">
            <div className="content-header">User Balance</div>
            <div className="content-text largeText" id="user-balance"></div>
          </div>

          <div className="three bottomBorder">
          <div className="content-header">Network</div>
          </div>

          <div className="four">
          <div className="content-header">Something here</div>
          </div>
        </div>
      </div>
    );
  }


export default ContentBar;
