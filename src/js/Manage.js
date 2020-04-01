import React from 'react';
import Card from './Card';

import '../css/Card.css'
import '../css/Page.css';


class Manage extends React.Component{
  static defaultProps ={

  }
constructor(props){
  super(props);
  this.state = {name:"",type:"",mode:"",decimal:""};
  this.handleChange = this.handleChange.bind(this);
}
handleChange(evt){
  this.setState({ [evt.target.name]: evt.target.value });
}
render(){

  return (
    <div className = "Page">
      {/* Page Title */}
      <h1 className="pageTitle">Manage</h1>
      
      {/* Actual page content */}
      <div className = "pageContent">
        
        {/* Manage Asset Information */}
        <div className="pageItem-assetManageForm">
          Manage Asset
          <form>

            <label htmlfor="name">Name: </label>
            <input 
            id="name"
            type='text' 
            name='name'
            value={this.state.name}
            onChange = {this.handleChange}
            placeholder = "Name"/>


            Deck or Card:
          <select value={this.state.type} onChange={this.handleChange} name="type">
              <option value="Deck">Deck</option>
              <option value="Card">Card</option>
            </select>


            Issue Mode:
          <select value={this.state.mode} onChange={this.handleChange} name="mode">
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select> 
            Decimal:
            <input
              id="decimal"
              type='text'
              name='decimal'
              value={this.state.decimal}
              onChange={this.handleChange}
              placeholder="Decimal" />      
              
            

            
          </form>
        </div>

        {/* Manage Asset Summary */}
        <div className="pageItem-assetManageSummary">
          <h3>Manage Asset Summary</h3>
          <Card 
          name ={this.state.name}
          deckName = {this.state.type}
          mode = {this.state.mode}
          decimal = {this.state.decimal}
          />
        </div>
  
      </div>
    </div>
  );
}
 
}

export default Manage;