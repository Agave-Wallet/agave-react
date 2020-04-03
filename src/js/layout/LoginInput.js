import React from 'react';
import * as Network from '../utils/Networks';

class LoginInput extends React.Component{
    constructor(props){
        super(props);
    }

    Networks = {
        "Peercoin Testnet": Network.peercoinTestnet,
        "Peercoin": Network.peercoin,
        "Bitcoin Cash": Network.bitcoinCash,
        "Bitcoin Cash Testnet": Network.bitcoinCashTestnet
    }
    toggleModal = () =>{
        console.log("toggle")
    }

    render(){
        let element = null
        const choices = []

        const createSelectOptions = () =>{
            Object.keys(this.Networks).forEach(function(key){
               choices.push(<option key={key} value={key}>{key}</option>)
            })
        }
        if (this.props.type=== "select"){
            createSelectOptions()
            element = <select className={this.props.class} id={this.props.id}>{choices}</select>
        }
        else if(this.props.type === ("button" || "submit")){
            element = <button id={this.props.id} value={this.props.value} className={this.props.class} onClick={this.props.onclick}>{this.props.value}</button>
        }
        else{
            element = <input id={this.props.id} onClick={this.props.onclick} type={this.props.type} placeholder={this.props.placeholder} value={this.props.value} className={this.props.class}></input>
        }
    
    return(
        element
    )
    };
}

export default LoginInput