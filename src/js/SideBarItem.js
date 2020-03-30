import React from "react";
import '../css/SideBar.css';
import Icons from '../img/sprite.svg';
import {HashRouter,NavLink} from "react-router-dom"

class SideBarItem extends React.Component{
    // constructor(props){
    //     super(props)
    // }s

    render(){   
    return (   
        <HashRouter>
        <NavLink exact to={this.props.href} activeClassName="SideBarItem active" onClick={this.props.onclick} className="SideBarItem"> <svg className="SideBarIcon"><use href={`${Icons}#icon-${this.props.icon}`} title={this.props.title}></use></svg>  </NavLink>
        </HashRouter>
        )
    };
}

export default SideBarItem;