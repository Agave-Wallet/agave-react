import React from "react";
import "../css/SideBar.css";
import Icons from '../img/sprite.svg';

class SideBarItem extends React.Component{
    // constructor(props){
    //     super(props)
    // }

    render(){
        let a = <a href={"#"+this.props.href} id={this.props.id} className="SideBarItem" onclick={this.props.onclick}><svg className="SideBarIcon" >
                <use href={`${Icons}#icon-${this.props.icon}`}></use></svg></a>
        
    return (   
            a
        )
    };
}

export default SideBarItem;