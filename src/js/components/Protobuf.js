import React from 'react';
import '../../css/Protobuf.css';
import '../../css/Page.css'
import Icons from '../../img/symbol-defs.svg';

function Protobuf(props){

        return(
            <div>
                { props.type === "create" ? 
                    <Create {...props}/>
                : props.type === "send" ?
                    <Send {...props}/>
                : null
                }
            </div>
        )
    }

export default Protobuf;

// Create page card
function Create(props){
    return(
        <div className = "Card">
            {/* Deck Name div */}
            <div class="protobuf-title">Deck Name</div>
            <div className="protobuf-content">{props.name}</div>
            {/* Mode div */}
            <div className="protobuf-title">Issue Mode</div>
            <div className="protobuf-content">{props.mode}</div>
            {/* Decimale place  */}
            <div className="protobuf-title">Decimal Places</div>
            <div className="protobuf-content">{props.decimal}</div>
            {/* Asset Specific Data */}
            <div className="protobuf-title">Asset Specific Data</div>
            <div className="protobuf-content">{props.data}</div>
            <button id="createTransactionButton" className="button-sendTransaction" disabled onClick={()=>{props.setModalState(true)}}>Create Deck</button>
            {/* <button className="button-sendTransaction" onClick={()=>{props.setProtobuf(!props.protobuf)}}>Create Deck</button> */}
        </div>
    )
}

// Send page card
function Send(props){
    return(
        <div className = "Card">
            {/* Receiving Address */}
            <div className="protobuf-title">Receiving Address</div>
            <div className="protobuf-content">{props.receivingAddress}</div>
            {/* Decimal Places */}
            <div className="protobuf-title">Amount</div>
            <div className="protobuf-content">{props.amount}</div>
            {/* Network */}
            <div className="protobuf-title">Chosen Asset</div>
            <div className="protobuf-content">{props.asset}</div>

            <button id="sendTransactionButton" className="button-sendTransaction" disabled onClick={()=>{props.setModalState(true)} }>
                <svg className="SideBarIcon">
                    <use href={`${Icons}#icon-Sign`}>
                    </use>
                </svg> 

                Sign Transaction
            </button>
        </div>
    )
}