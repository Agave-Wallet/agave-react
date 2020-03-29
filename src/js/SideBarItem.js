import React from "react";
import "../css/SideBarItem.css";
import Icons from '../img/sprite.svg';

function SideBarItem(props) {
    return (
        <a href={"#"+props.name} className = "SideBarItem">
            {/* Icon */}
            <svg className="SideBarIcon">
                <use href={`${Icons}#icon-${props.icon}`}></use>
            </svg>

            {/* Page Name */}
            <span>{props.name}</span>
        </a>
    )
}

export default SideBarItem;