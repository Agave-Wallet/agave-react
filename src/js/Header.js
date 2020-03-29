import React from 'react';
import '../css/Header.css';
import Sprite from '../img/sprite.svg';

function Header () {

  /* Manage the logout function */
  const logoutUser = () => {
    const sessionKeys = ["lockedKey", "address","network"]
    for (const k in sessionKeys.values){
    sessionStorage.removeItem(k)
    }
    window.location = "/"
    console.log("I've found the log-out but nothing is happening yet")
  } 

  /* Generate identicon for user */
  

  return (
    <div className="Header">
      {/* Address */}
      {/* <span class="user-name" id="address">n49CCQFuncaXbtBoNm39gSP9dvRP2eFFSw</span> */}

      {/* Logout */}
      <div className="Logout" id="logout-key" onClick={logoutUser}>
        {/* Icon + Event Handler */ }
        <svg className="Logout-Icon">
            <use href={Sprite + "#icon-logout"}></use>
        </svg> 
      </div>
    </div>
  );
}

export default Header;
