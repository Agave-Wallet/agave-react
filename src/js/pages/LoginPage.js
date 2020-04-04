import React from 'react';
import '../../css/LoginPage.css';
import '../../css/Main.css'
import LoginInput from './../components/LoginInput'
import {ReactComponent as Logo} from '../../img/logo2.svg'

class LoginPage extends React.Component {

  componentDidMount(){
    window.addEventListener('click',this.loginClick,false)
  }
  componentWillUnmount(){
    window.removeEventListener('click',this.loginClick,false)
  }
  constructor(props){
    super(props)
    this.modalState = false
    this.state = {loading:true}
  }
  // adds event listen to switch the modal on/off on welcome screen (will remove listener on logout)
  
  loginClick = e =>{
    let target = "modal"
    if ( (e.target.id !== "Login-button") && this.modalState ){
      let paths = e.composedPath()
      let inModal = false
      for (let k = 0; k < paths.length-1;k++){
          if (target === paths[k].className){
            inModal = true
          }
      }
      if (!inModal){
        this.toggleModal()
      }
    }
  }

  toggleModal = () =>{
    const modal = document.getElementsByClassName("modal")[0]
    if (this.modalState){
      modal.style.display = "none"
      this.fadeIn("welcome")
    }
    else{
      modal.style.display = "flex"
      this.fadeOut("welcome")
    }
    this.modalState = !this.modalState
    }

  getMnemonic = () => {
    const mnemonic = document.getElementById("mnemonic-select")
    mnemonic.value = window.getMnemonic()
  }

  fadeIn = el =>{
    // Should probably change this to a CSS thing, you know, where you just add on to the current class...
    const elem = document.getElementsByClassName(el)[0];
    elem.style.transition = "opacity 0.6s linear 0s";
    elem.style.opacity = "100%";
  }

  fadeOut = el =>{
    // Same comments from fadeIn
    const elem = document.getElementsByClassName(el)[0];
    elem.style.transition = "opacity 0.6s linear 0s";
    elem.style.opacity = "0%";
  }

  render(){
  return (
    <div className="LoginPage">
      <div className="LoginMain">
        <div id="LoginMain-welcome" className="welcome">
        <div className="Logo" id="Logo">
          <Logo />
        </div>
        {/* This will make the login form visible */}
      <h1>Welcome to Agave</h1>
      <LoginInput value="login" type="button" onclick={this.toggleModal} id="Login-button"/>
      </div>
        <div className="modal" id="login-modal">
          <div className="modal-content" id="modal-content">
            <h1>Login</h1>
            <LoginInput id="network-select" value="network" type="select" className="form-select"/>
            <LoginInput id="mnemonic-select" type="text"  placeholder="12-Word Passphrase" className="form-text"/>
            <LoginInput id="generate-submit" value="generate new" type="button" onclick={this.getMnemonic}/>
            <LoginInput id="password-select" type="password" placeholder="Temporary Password" className="form-text"/>
            <LoginInput value="submit" type="button" id="submit"/>
          </div>  
        </div>
      </div>
    </div>
  );
}
}

export default LoginPage;