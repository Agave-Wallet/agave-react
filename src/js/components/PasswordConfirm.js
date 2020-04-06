import React from 'react';
import '../../css/Page.css';

function PasswordConfirm (props) {

    return (
        <div className = "modal" id="password-modal">
            <div className="modal-content" id="modal-password">
                <input
                id="password-submit"
                type="password"
                placeholder="Password"
                required
                />
                
                { (props.type == "send") ?
                <div>
                <button id="modal-sign" onClick={ ()=> props.setSignTransactionSend(true)}>Send Transaction</button>
                <button id="modal-cancel" onClick={ ()=> props.setModalState(false)}>Cancel</button>
                </div>
                : (props.type == "create") ?
                <div>
                <button id="modal-sign" onClick={ ()=> props.setSignTransactionCreate(true)}>Send Transaction</button>
                <button id="modal-cancel" onClick={ ()=> props.setModalState(false)}>Cancel</button>
                </div>
                : null
                }
                
                
                <div id="signedTranasction"></div>
            </div>
        </div>
    )
}

export default PasswordConfirm;