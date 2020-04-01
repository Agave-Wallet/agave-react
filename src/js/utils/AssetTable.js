import React from 'react';

export default class AssetTable extends React.Component {
 
    componentDidMount(){
        this.getAssetData()
    }
    componentDidUpdate(){
    }

    constructor(props){
    super(props);
    this.state = {loading: true, data:[],headers:[]}
    }
    getAssetData = () =>{
        const promise = this.processPromise(this.props.url)
        promise.then( data =>{
          this.setState({data,loading:false})
        })
    }
    // Recent network deck creations or something
    // Held assets
    // Recent transactions by user {card and deck} < recent 10 and then you click and it takes you to the transactions page

    setHeaders = type =>{
        // If we are making an assets call
        if (type === "assets"){
            this.setState({headers:{"Name":"name"}})
        }
        // If we are making a transactions call
        if (type === "transactions"){
            // this.setState({headers:{})
        }
    }

    getRequestType = () =>{
        // If the URL contains assets, use asset headers
        if ( this.props.url.includes("assets") ){
            // Set headers to the assets dict of headers
            this.setHeaders("assets")
        }
        // If the URL contains transactions, use transactions headers
        if( this.props.url.includes("transactions")){
            // Set headers to the transactions dict of headers
            this.setHeaders("transactions")
        }
    }

    async processPromise(query){
        // Asyncronous Method to await response from fetch
        const promise = await fetch(query)
        const result = await promise.json()
        this.getRequestType()
        return result;
    }
    
    getHeader = () =>{
        // Return the array of expected headers
        const keys = this.state.headers;
        const newKeys = Object.keys(keys);
        const keysArray = newKeys.map((key,index)=>{
            return <th key={index}>{key}</th>;
        })
        return keysArray;
    }
    
    getRowsData = () =>{
        const items = this.state.data;
        const ids = Object.keys(this.state.data);
        return ids.map( (key,index)=>{
            return <tr><RenderRow keys={Object.values(this.state.headers)} item={items[key]} /></tr>
        })
        
    }
    
    render() {
        if (this.state.loading){
            return 'Loading...'
        }
    return (
    <div>
        <table>
            <thead>
                {this.getHeader()}
            </thead>
            <tbody>
                {this.getRowsData()}
            </tbody>
        </table>
    </div>
    
    );
    }
   }

const RenderRow = (props) =>{
    // Render the actual row of data
    return props.keys.map((key, index)=>{
        // Return the actual row of data
        if (props.keys.includes(key)){
            return <td key={key}>{props.item[key]}</td>
        }
    })
}