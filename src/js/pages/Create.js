import React from 'react';
import Card from '../components/Card';
import '../../css/Card.css'
import '../../css/Page.css';

class Create extends React.Component{
  static defaultProps = {

  }
 // TODO: Person must have either multi or unflushable decks that they own for create cards to be available
    constructor(props){
      super(props);
      // Deck Create: Name, Issue Mode, Decimal, Asset Specific Data
      // Card Create: (Requires checking mode decks), 
      this.state = {name:"",type:"",mode:"",decimal:""};
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt){
      this.setState({ [evt.target.name]: evt.target.value });
    }

  
    render(){
      console.log(this.props.pageType)

      return(

        <div className = "Page">
          {/* Page Title */}
          <h1 className="pageTitle">Create</h1>
          
          {/* Actual page content */}
          <div className = "pageContent">
            
            {/* Manage Asset Information */}
            <div className="pageItem-assetManageForm">
              Create Asset
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
                  <option value="None">None Issue Mode</option>
                  {/* Custom Issue Mode */}
                  {/* <option value="Custom Issue Mode">Customer Issue Mode</option> */}
                  <option value="Once">Once Issue Mode</option>
                  <option value="Multi">Multi Issue Mode</option>
                  <option value="Mono">Mono Issue Mode</option>
                  <option value="Singlet">Singlet Issue Mode</option>
                  <option value="Unflushable">Unflushable Issue Mode</option>
                  {/* Combined Issue Mode */}
                  {/* <option value="Combined">Combined Issue Mode</option> */}
                </select> 

                Decimal:
                <input
                  id="decimal"
                  type='number'
                  name='decimal'
                  min='0'
                  max='8'
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
      )
    }
} 

export default Create;
