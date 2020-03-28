import React from 'react';
import '../css/LoginPage.css';
import '../css/SideBar.css'
import LoginInput from './LoginInput'
import {ReactComponent as Logo} from '../img/logo2.svg'

function LoginPage() {

  const toggleModal = () =>{
    const modal = document.getElementById("login-modal")
    if (modal.style.display === "flex"){
      modal.style.display = "none"
      SlideIn("LoginMain-welcome")
    } else{
    modal.style.display="flex"
    SlideOut("LoginMain-welcome")  
    }
  }

  const getMnemonic = () => {
    const mnemonic = document.getElementById("mnemonic-select")
    mnemonic.value = window.getMnemonic()
  }
  
  const exitLogin = () =>{
    const element = document.getElementsByClassName("LoginPage")
    element[0].className = "hidden"
    const sideBar = document.getElementsByClassName("SideBar")
    sideBar[0].className = "SideBar--expand"
  }

  function SlideIn(el){
    var elem = document.getElementsByClassName(el)[0];
    elem.style.position = "relative"
    elem.style.transition = "left 0.5s linear 0s";
    elem.style.left = "0%";
}
function SlideOut(el){
    var elem = document.getElementsByClassName(el)[0];
    elem.style.position = "relative"
    elem.style.transition = "left 0.8s linear 0s";
    elem.style.left = "-400%";
}

  // function submitInformation () {

  //   const mnemonic = document.getElementById("mnemonic-select").value
  //   const safety_code = document.getElementById("password-select").value
  //   const address = Crypto.getAddress(mnemonic,"peercoinTestnet")
  //   const lockedKey = Crypto.encryptData( safety_code, Crypto.getWIF(mnemonic))
  //   sessionStorage.setItem("address",address)
  //   sessionStorage.setItem("lockedKey",lockedKey)
  //  }
  return (
    <div className="LoginPage">
      <div className="LoginMain">
        <div id="LoginMain-welcome" className="LoginMain-welcome">
        <div className="Logo" id="Logo">
        <Logo />
        </div>
        {/* This will make the login form visible */}
      <h1>welcome to agave</h1>
      <LoginInput value="login" type="button" onclick={toggleModal} id="Login-button"/>
      </div>
        <div className="modal" id="login-modal">
          <div className="modal-content animate">
            <h1>login</h1>
            <span onClick={toggleModal} className="close" title="Close">&times;</span>
            <LoginInput value="network" type="select" id="network-select" className="form-select"/>
            <LoginInput type="text" id="mnemonic-select" placeholder="12-Word Passphrase" className="form-text"/>
            <LoginInput type="password" id="password-select" placeholder="Temporary Password" className="form-text"/>
            <LoginInput value="generate" type="button" id="generate-submit" className="button--antiman" onclick={getMnemonic}/>
            <LoginInput value="submit" type="button" className="button--antiman" onclick={exitLogin} id="submit"/>
          </div>  
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
