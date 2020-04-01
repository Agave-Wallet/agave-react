import React from 'react';
import '../css/Page.css';
import CreateForm from './CreateForm'

class Create extends React.Component{
 // TODO: Person must have either multi or unflushable decks that they own for create cards to be available
    constructor(props){
      super(props)
    }

    render(){
      const assetType = document.getElementById('selectAssetType');
      // console.log(this.props.pageType)

      // const value = assetType.value;
      // console.log(value);
      return(

        // Get which page we use based on the value of this switch
        <div className = "Page">
          {/* Page Title */}
          <h1 className="pageTitle">Create Assets</h1>

          {/* Check switch state */}
          {/* <CreateForm page={this.state.page} /> */}
        </div>
      )
    }
} 

export default Create;
