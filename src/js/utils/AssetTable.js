import React, {useEffect, useMemo, useState} from 'react';
import {useTable, useFilters} from 'react-table'
import BlockBook from '../providers/blockbook'
// import Blockies from 'react-blockies'
import '../../css/Page.css'; 
import { isCompositeComponent } from 'react-dom/test-utils';

export default function AssetTable (props) {

// https://react-table.js.org/api/useTable
const [loading,setLoading ] = useState(true)
const [columns, setColumns ] = useState([]);
const [data, setData] = useState([])
const [txData, setTxData] = useState([])

    // const [type, setType] = useState(""); 
    
    // Set urls for getting data 
  const userAddress = sessionStorage.getItem("address") 
  const deckURL = "https://api.agavewallet.com/v1/transactions?address=" + userAddress + "&type=deck"
  // TODO remove me later
  const cardURL = "https://api.agavewallet.com/v1/transactions?address=mj9z4Lxkz2zBgSerWQqAHMELGYj83nWLhj&type=card"
 
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// SET COLUMNS /////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

    // Card/transaction table
    const userAssets = useMemo(
        () => [
            {Header: "Transactions", columns: [
                // Add date header when scott isnt lazy
                //{Header: "Date", accessor: "time"}
                {Header: "Asset", accessor: "asset"},
                {Header: "Type", accessor: "type"}, 
                {Header: "Amount", accessor: "amount"},
                {Header: "Receiver", accessor: "receiver"},
                {Header: "TXID", accessor: "txid"}
            ]}
        ]
    )

    // Set user decks table
    const userDecks = useMemo(
        () => [
            {Header: "Decks", columns: [
                // Transaction Date 
                {Header: "Name", accessor:"name"},
                {Header: "Issue Mode", accessor: "mode"},
                {Header: "Transaction ID", accessor: "txid"}
            ]}
        ]
    )

    const processPromise = ( async (query) =>{
        // Asyncronous Method to await response from fetch
        const promise = await fetch(query)
        const result = await promise.json()
        
        return result;
    })

    const getData = ( url ) =>{
        const promise = processPromise( url )
        promise.then( data =>{
            // Returned json goes to data
            if (data != null) {
                setData(data)
                setLoading(false)
            } else {
                console.log("Data is null")
            }  
        })
        // promise.catch(console.log("rejected"))
    }

    let finalData = []

    const getCardData = (url) => {
        let cardData = []

        const promise = processPromise( url )
        promise.then( info =>{

            // Returned json goes to data
            if (info != null) {
                 info.forEach( v => {
                     cardData.push({
                        //blocktime - TODO blocktime when scott isnt lazy
                        // blocktime: data.blocktime,
                        //asset
                        asset: v.deck_id,
                        //type - send receive
                        type: v.type,
                        //amount
                        amount: v.amount,
                        // receiving address
                        receiver: v.receiver,
                        //txid
                        txid: v.card_id
                        
                    })
                })
                 
            } else {
                 console.log("Data is null")            
            }
        }).then( info => {
        
            console.log("cardDATA", cardData)
            setData(data.concat(cardData))
        })
    }

    function getTransactions(){
        console.log("Getting transactions")
        const provider = new BlockBook("peercoin-testnet", sessionStorage.getItem("address"))
        provider.getFormatedTransactions().then( setTimeout( ()=>{
            setTxData([...txData, provider.transactionInfo])
        }, 1000)
        )}
    

    useEffect(()=>{
        if (loading){
            // If the URL contains assets, use asset headers
            if (props.type === "assets"){
                // setType("assets")
                console.log("assets")
                setColumns(userAssets);
                getData()
            } else if (props.type === "transactions") {
                console.log(props.type)
                setColumns(userAssets)
                getTransactions();
                getCardData(cardURL);
                // console.log("transactions data", data)
            } else if (props.type === "decks") {
                console.log("getting decks")
                setColumns(userDecks)
                getData(deckURL)
            } else {
                console.log("Invalid API call")
            }
        }
        // console.log("data", data)
    },[ ])

    useEffect( ()=>{
        txData.forEach( v =>{
            setData(data.concat(v))
        })
        console.log(txData)
    },[txData])


    // Create a state -- set to blank so we arent searching for anything to start
    const [filterInput, setFilterInput] = useState("");

    // Update the state when input changes
    const handleFilterChange = e => {
        const value = e.target.value || undefined;
        setFilter("name", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
        setFilterInput(value);
    };

    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups if your table have groupings
        rows, // rows for the table based on the data passed
        prepareRow, // Prepare the row (this function need to called for each row before getting the row props)
        setFilter 
    } = useTable({
        columns,
        data
      },
      // Search bar function
      useFilters 
      );

    return (
        <div className="transactionsPage__table">
            <input
                value={filterInput}
                onChange={handleFilterChange}
                placeholder={"Search name"}
            />

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
        </div>
    );
}


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