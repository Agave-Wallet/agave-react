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
                
                { (props.type === "send") ?
                <div>
                    <button id="modal-sign" onClick={ ()=> props.setSignTransactionRequest(true)}>Send Transaction</button>
                    <button id="modal-cancel" onClick={ ()=> props.setModalState(false)}>Cancel</button>
                    
                    {/* Send review table */}
                    <div className="transactionReview">
                        <table>
                            <thead>
                                <tr>
                                    <th>Transaction Review</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Receiving Address review */}
                                <tr>
                                    <td>Receiving Address</td>
                                    <td>{props.txInfo.receivingAddress}</td>
                                </tr>
                                {/* Amount review */}
                                <tr>
                                    <td>Amount</td>
                                    <td>{props.txInfo.amount}</td>
                                </tr>
                                {/* Asset review */}
                                <tr>
                                    <td>Asset</td>
                                    <td>{props.txInfo.asset}</td>       
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                : (props.type === "create") ?
                <div>
                    <button id="modal-sign" onClick={ ()=> props.setSignTransactionCreate(true)}>Send Transaction</button>
                    <button id="modal-cancel" onClick={ ()=> props.setModalState(false)}>Cancel</button>
                
                    {/* Create review table */}
                    <div className="transactionReview">
                        <table>
                            <thead>
                                <tr>
                                    <th>Transaction Review</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Receiving Address review */}
                                <tr>
                                    <td>Name</td>
                                    <td>{props.protobuf.name}</td>
                                </tr>
                                {/* Mode review */}
                                <tr>
                                    <td>Mode</td>
                                    <td>{props.protobuf.mode}</td>
                                </tr>
                                {/* Decimal review */}
                                <tr>
                                    <td>Decimal</td>
                                    <td>{props.protobuf.decimal}</td>       
                                </tr>
                                {/* Data review */}
                                <tr>
                                    <td>Data</td>
                                    <td>{props.protobuf.data}</td>       
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                : null
                }
                
                <div id="signedTranasction"></div>
            </div>
        </div>
    )
}

export default PasswordConfirm;