import React from 'react';
import '../css/Header.css';
import Sprite from '../img/sprite.svg';
import {ReactComponent as Logo} from '../img/logo2.svg'

function Header () {


  /* Generate identicon for user */
  

  return (
    <div className="Header">
      <div class="HeaderLeft">
      <Logo className="HeaderLogo"/>
      </div>
      <div className="HeaderRight">
      {/* Address */}
      {/* <span class="user-name" id="address">n49CCQFuncaXbtBoNm39gSP9dvRP2eFFSw</span> */}
      </div>
    </div>
  );
}

export default Header;
