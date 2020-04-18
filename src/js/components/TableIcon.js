import React from 'react';

function TableIcon (props) {

    return (
        <div className="iconText">
            <div>
                <img 
                    src={"https://raw.githubusercontent.com/Agave-Wallet/agave-icons/master/" + props.size + "/" + props.value + ".png"} 
                    onError={ (e) => {e.target.src = "https://raw.githubusercontent.com/Agave-Wallet/agave-icons/master/" + props.size + "/agave.png"}}/>    
            </div>  
            <div>
                {props.value}
            </div>  
        </div>
    )
    
}

export default TableIcon;