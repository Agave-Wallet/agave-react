import React, {useEffect,useState} from 'react';
import Blockies from 'react-blockies'
import '../../css/Page.css'; 

function AssetTable(props){

    const [loading,setLoading] = useState(true)
    const [data, setData] = useState([])
    const [tableHeaders, setTableHeaders] = useState({})
    const [type, setType] = useState("")


    useEffect(()=>{
        if (loading){
            // If the URL contains assets, use asset headers
            if (props.url.includes("assets")){
                setType("assets")
                setTableHeaders({Name:"name"})

            }else{
                setType("transactions")
                setTableHeaders({Name:"name"})
            }
        }
        getAssetData()
        console.log(data)
    },[])

    const getAssetData = () =>{
        const promise = processPromise( props.url)
        promise.then( data =>{
          setData(data)
          setLoading(false)
        })
    }
    // Recent network deck creations or something
    // Held assets
    // Recent transactions by user {card and deck} < recent 10 and then you click and it takes you to the transactions page
    
    const processPromise = ( async (query) =>{
        // Asyncronous Method to await response from fetch
        const promise = await fetch(query)
        const result = await promise.json()
        return result;
    })
    
    const getHeader = () =>{
        // Return the array of expected headers
        if (Object.keys(tableHeaders).length > 0){
            const newKeys = Object.keys(tableHeaders);
            const keysArray = newKeys.map((key,index)=>{
                return <th key={index}>{key}</th>;
            })
            return keysArray;
    }
    }
    
    const getRowsData = () =>{
        if (Object.keys(data).length > 0){
            const ids = Object.keys(data)
            return ids.map( (key,index)=>{
                return <tr><RenderRow keys={Object.values(tableHeaders)} item={data[key]} /></tr>
            })
        }
        
    }
    
    return (
    <div>
        { loading ? 
        <div>Loading...</div>
        :
        <table>
            <thead className="bottomBorder">
                {getHeader()}
            </thead>
            <div className="table-body">
            <tbody>
                {getRowsData()}
            </tbody>
            </div>
        </table>
        }
    </div>
    
    );
    }

const RenderRow = (props) =>{
    // Render the actual row of data
    return props.keys.map((key, index)=>{
        // Return the actual row of data
        if (props.keys.includes(key)){
            return <td key={key}><Blockies seed={index} size={10} scale={6} color="#dfe" bgColor="#385a77" spotColor="#011627"/> {props.item[key]}</td>
        }
    })
}

export default AssetTable;