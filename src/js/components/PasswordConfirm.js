import React from 'react';
import '../../css/Page.css';

function PasswordConfirm (props) {

    return (
        <div className = "modal" id="password-modal">
            <div className="modal-content" id="modal-password">
                <input
                type="password"
                placeholder="Password"
                required
                />
                <button id="modal-sign">Send Transaction</button>
                <button id="modal-cancel" onClick={ ()=> props.setModalState(false)}>Cancel</button>
            </div>
        </div>
    )
}

export default PasswordConfirm;