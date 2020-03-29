import React from "react";
import "../css/SideBar.css";
import Icons from '../img/sprite.svg';

class SideBarItem extends React.Component{
    // constructor(props){
    //     super(props)
    // }

    render(){
        let a = <a href={"#"+this.props.name} className = "SideBarItem"><svg className="SideBarIcon">
                <use href={`${Icons}#icon-${this.props.icon}`}></use></svg>
                <span>{this.props.name}</span></a>
        
    return (   
            a
        )
    };
}

export default SideBarItem;