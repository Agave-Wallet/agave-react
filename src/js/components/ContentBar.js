import React from 'react';
import Icons from '../../img/symbol-defs.svg';
import '../../css/ContentBar.css';
import {ReactComponent as Logo} from '../../img/logo_only.svg'

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

    return (
      <div className="ContentBar">
        <div className="wrapper">
          <div className="one">
            <div className="UserLogo">
              <div id="Content-Logo" className="LogoContent" onClick={copyAddress}>
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

          <div className="three bottomBorder">
            <div className="content-header">
              <svg className="side-nav__link" id="blockStatus">
                <use href={`${Icons}#icon-Network`} title="Network"></use>
              </svg>
              Network
            <div className="content-text" id="last-block">Last Block</div>
            <div className="content-text" id="last-blockTime">Last Block Time</div>
            <div className="content-text" id="userNetwork">User Network</div>
          </div>

        </div>
      </div>
      </div>
    );
  }


export default ContentBar;
