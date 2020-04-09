import React, {useState, useEffect, useLayoutEffect} from 'react';
import Icons from '../../img/symbol-defs.svg';
import Blockies from 'react-blockies';
import '../../css/ContentBar.css';
import createCanvas from 'canvas'
import {ReactComponent as Logo} from '../../img/logo2.svg'

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

    // useLayoutEffect( ()=>{
    //   const identicon = document.getElementById("hashicon")
    //   if( !identicon.firstChild){
    //     const params = {light:{ top:10, right:-8, left:-4, enabled: true}, size: 150}
    //     identicon.appendChild(window.hashicon(sessionStorage.getItem('address', params)))
    //   }

    // }, [])

    useEffect( ()=>{
      // document.getElementById("Logo").className += " glow"

    })

    /* Manage the logout function */

    return (
      <div className="ContentBar">action
        <div className="wrapper">
          <div className="one">
            <div className="UserLogo">
              <div id="Content-Logo" className="LogoContent transition spin" onClick={copyAddress}>
                <Logo/>
              </div>
              <div className = "container__user__address">
                <div className = "user_address">
                  <div className="content-header">
                    <svg className="side-nav__link">
                      <use href={`${Icons}#icon-Address`} title="Address"></use>
                    </svg>
                    {/* <Blockies seed={sessionStorage.getItem("address")} size={20} scale={6} color="#dfe" bgColor="#C06E5B" spotColor="#011627"/> */}
                    User Address  
                  </div>
                </div>
              </div>
              <div id="user-address" className="content-text">{sessionStorage.getItem("address")}</div>
            </div>
          </div>
          
          <div className="two bottomBorder">
            <div className="content-header">
              <svg className="side-nav__link">
                <use href={`${Icons}#icon-Network`} title="Address"></use>
              </svg>
              User Balance
            </div>
            <div className="content-text largeText" id="user-balance"></div>
          </div>

          
        </div>
      </div>

        //   {/* <div className="four">
        //   <div className="content-header">Something here</div>
        // </div> */}
    );
  }


export default ContentBar;
