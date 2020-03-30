import React from "react";
import '../css/SideBar.css';
import Icons from '../img/sprite.svg';

class SideBarItem extends React.Component{
    // constructor(props){
    //     super(props)
    // }

    render(){
        let a = <a href={"#"+this.props.href} title={this.props.title} id={this.props.id} className="SideBarItem" onClick={this.props.onclick}><svg className="SideBarIcon"><use href={`${Icons}#icon-${this.props.icon}`} title={this.props.title}></use></svg></a>
        
    return (   
            a
        )
    };
}

export default SideBarItem;