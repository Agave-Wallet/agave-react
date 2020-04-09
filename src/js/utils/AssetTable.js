import React, {useEffect, useMemo, useState} from 'react';
import {useTable} from 'react-table'
// import Blockies from 'react-blockies'
import '../../css/Page.css'; 

export default function AssetTable (props) {
    // https://react-table.js.org/api/useTable
    const [data, setData ] = useState([]);
    const [loading,setLoading ] = useState(true)
    const [columns, setColumns ] = useState([]);
    const [type, setType] = useState("");

    // Cannot be used inside callback
    // Set asset headers
    const assetsCol = useMemo(
        () => [
            {Header: "Assets", columns: [
                {Header: "Tx", accessor: "txid"}, 
                {Header: "Name", accessor: "name"}
        ]},
            ]
    );    

    // Set transaction header
    const transactionsCol = useMemo(
        () => [
            {Header: "Transactions", columns: [
                {Header: "Tx", accessor: "txid"}, 
                {Header: "Name", accessor: "name"},
                {Header: "Issue Mode", accessor: "issue_mode"}
        ]},
            ]
    ); 

    // Set user transaction table
    const userTransactionsCol = useMemo(
        () => [
            {Header: "User Transactions", columns: [
                // Transaction Date 
                {Header: "Block Height", accessor:"block_height"},
                // {Header: "Confirmations", accessor: ""},
                {Header: "Deck Id", accessor: "deck_id"},
                {Header: "Type", accessor: "type"},
                {Header: "Amount", accessor: "amount"}
            ]}
        ]
    )

    useEffect(()=>{
        if (loading){
            // If the URL contains assets, use asset headers
            if (props.url.includes("assets")){
                setType("assets")
                // update column state
                console.log("assets API call")
                // Update column status
                setColumns(assetsCol);
            }else{
                setType("transactions")

                // Give appropriate headers 
                if (props.url.includes("decks")) {
                    setColumns(transactionsCol);
                } else {
                    //  means it returned cards
                    setColumns(userTransactionsCol);
                }
                // update column state
                console.log("transactions API call")
            }
        }
        getAssetData()
        console.log(data)
    },[])


    const processPromise = ( async (query) =>{
        // Asyncronous Method to await response from fetch
        const promise = await fetch(query)
        const result = await promise.json()
        
        return result;
    })

    // Get our data
    const getAssetData = () =>{
        
        const promise = processPromise( props.url)
        promise.then( data =>{
            // Returned json goes to data
            if (data != null) {
                console.log("Data is not null")
                setData(data)
                setLoading(false)
            } else {
                console.log("Data is null")
            }
            
            
        })
        promise.catch(console.log("rejected"))
    }

    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups if your table have groupings
        rows, // rows for the table based on the data passed
        prepareRow // Prepare the row (this function need to called for each row before getting the row props)
      } = useTable({
        columns,
        data
      });

    return (
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
                prepareRow(row);
                return (
                <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                    })}
                </tr>
                );
            })}
            </tbody>
        </table>
    );
}
   // Use the state and functions returned from useTable to build your UI
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//   } = useTable({
//     columns,
//     data,
//   }) 


// userAssetsURL passed down as prop






// function AssetTable(props){

//     const [loading,setLoading] = useState(true)
//     const [data, setData] = useState([])
//     const [tableHeaders, setTableHeaders] = useState({})
//     const [type, setType] = useState("")


//     useEffect(()=>{
//         if (loading){
//             // If the URL contains assets, use asset headers
//             if (props.url.includes("assets")){
//                 setType("assets")
//                 setTableHeaders({Name:"name"})

//             }else{
//                 setType("transactions")
//                 setTableHeaders({Name:"name"})
//             }
//         }
//         getAssetData()
//         console.log(data)
//     },[])

//     const getAssetData = () =>{
//         const promise = processPromise( props.url)
//         promise.then( data =>{
//           setData(data)
//           setLoading(false)
//         })
//     }
//     // Recent network deck creations or something
//     // Held assets
//     // Recent transactions by user {card and deck} < recent 10 and then you click and it takes you to the transactions page
    
//     const processPromise = ( async (query) =>{
//         // Asyncronous Method to await response from fetch
//         const promise = await fetch(query)
//         const result = await promise.json()
//         return result;
//     })
    
//     const getHeader = () =>{
//         // Return the array of expected headers
//         if (Object.keys(tableHeaders).length > 0){
//             const newKeys = Object.keys(tableHeaders);
//             const keysArray = newKeys.map((key,index)=>{
//                 return <th key={index}>{key}</th>;
//             })
//             return keysArray;
//     }
//     }
    
//     const getRowsData = () =>{
//         if (Object.keys(data).length > 0){
//             const ids = Object.keys(data)
//             return ids.map( (key,index)=>{
//                 return <tr><RenderRow keys={Object.values(tableHeaders)} item={data[key]} /></tr>
//             })
//         }
        
//     }
    
//     return (
//     <div>
//         { loading ? 
//         <div>Loading...</div>
//         :
//         <table>
//             <thead className="bottomBorder">
//                 {getHeader()}
//             </thead>
//             <div className="table-body">
//             <tbody>
//                 {getRowsData()}
//             </tbody>
//             </div>
//         </table>
//         }
//     </div>
    
//     );
//     }

// const RenderRow = (props) =>{
//     // Render the actual row of data
//     return props.keys.map((key, index)=>{
//         // Return the actual row of data
//         if (props.keys.includes(key)){
//             return <td key={key}><Blockies seed={index} size={10} scale={6} color="#dfe" bgColor="#385a77" spotColor="#011627"/> {props.item[key]}</td>
//         }
//     })
// }

// export default AssetTable;