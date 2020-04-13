import React, {useEffect, useMemo, useState} from 'react';
import {useTable, useFilters, useSortBy } from 'react-table'
import Icons from '../../img/symbol-defs.svg';
// import Blockies from 'react-blockies'
import '../../css/Page.css'; 
import '../../css/AssetTable.css';

export default function AssetTable (props) {

// https://react-table.js.org/api/useTable
const [loading,setLoading ] = useState(true)
const [columns, setColumns ] = useState([]);
const [data, setData] = useState([])

    // const [type, setType] = useState(""); 
    
    // Set urls for getting data 
  const userAddress = sessionStorage.getItem("address") 

  const balanceURL = "https://api.agavewallet.com/v1/balances?address=" + userAddress
  const deckURL = "https://api.agavewallet.com/v1/transactions?address=" + userAddress + "&type=deck"
  // TODO remove me later
  const cardURL = "https://api.agavewallet.com/v1/transactions?address=mj9z4Lxkz2zBgSerWQqAHMELGYj83nWLhj&type=card"
 
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// SET COLUMNS /////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

    // User balances header
    const userBalances = useMemo(
        () => [
            {Header: "Balances", columns: [
                // Deck ID
                {Header: "Asset", accessor: "asset"},
                {Header: "Amount", accessor: "amount"}
                // Amount
            ]}
        ], []
    )    

    // Card/transaction table
    const userCards = useMemo(
        () => [
            {Header: "Cards", columns: [
                // Add date header when scott isnt lazy
                //{Header: "Date", accessor: "time"}
                {Header: "Asset", accessor: "asset"},
                {Header: "Type", accessor: "type"}, 
                {Header: "Amount", accessor: "amount"},
                {Header: "Receiver", accessor: "receiver"},
                {Header: "TXID", accessor: "txid"}
            ]}
        ], []
    )

    // Set user decks table
    const userDecks = useMemo(
        () => [
            {Header: "Decks", columns: [
                // Transaction Date 
                {Header: "Name", accessor:"name"},
                {Header: "Issue Mode", accessor: "mode"},
                {Header: "Deck ID", accessor: "txid"}
            ]}
        ], []
    )

    const processPromise = ( async (query) =>{
        // Asyncronous Method to await response from fetch
        const promise = await fetch(query)
        const result = await promise.json()
        return result;
    })

    const getCards = (url) => {
        // Create empty array to store card data
        let cardData = []
        // Get a create promise
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
            setData(data.concat(cardData))
        })
        //promise.catch(console.log("getCards rejected"))
    }

    // Function to get user balances
    const getBalance = ( url ) =>{
        // Create an empty array for balance information
        let balanceData = [];
        // Get balance promise
        const promise = processPromise( url );
        promise.then( info =>{
            // Returned json goes to data
            if (info != null) {
                for ( const row in info ) {
                        // Sort returned json into readable format
                        balanceData.push({
                        //asset
                        asset: row,
                        //type - send receive
                        amount: info[row]
                    })
                }
            } else {
                console.log("Data is null")
            }  
        }).then( info => {
            // Then update state and change loading
            setData(balanceData)
            setLoading(false)
        })
        //promise.catch(console.log("getBalance rejected"))
    }

    // Function to get user data (generic)
    const getData = ( url ) =>{
        // Get data promise
        const promise = processPromise( url )
        promise.then( data =>{
            // Returned json goes to data
            if (data != null) {
                // Update data and loading state
                setData(data)
                setLoading(false)
            } else {
                console.log("Data is null")
            }  
        })
        //promise.catch(console.log("getData rejected"))
    }

    useEffect(()=>{
        if (loading){
                // Balance type 
            if (props.type === "balances"){
                setColumns(userBalances);
                getBalance(balanceURL)
            } else if (props.type === "cards") {
                // Card type
                setColumns(userCards)
                getCards(cardURL);
            } else if (props.type === "decks") {
                // Deck type
                setColumns(userDecks)
                getData(deckURL)
            } else {
                console.log("Invalid API call")
            }
        }
    },[ ])

    // Create a state -- set to blank so we arent searching for anything to start
    const [filterInput, setFilterInput] = useState("");

    // Update the state when input changes
    const handleFilterChange = e => {

        if (props.type === "decks") {
            const value = e.target.value || undefined;
            setFilter("name", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
            setFilterInput(value);
        } else if (props.type === "assets") {
            // asset search
        } else if (props.type === "cards") {
            // card search
        }        
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
      useFilters,
      useSortBy
      );

    return (
        <div className="transactionsPage__table">

            <div className="search-box">
                {/* Search Icon Div */}
                {/* <div className="search-icon">
                    <svg className="search-icon-img">
                      <use href={`${Icons}#icon-Search`} title="Search"></use>
                    </svg>
                </div> */}

                <input
                    className="search-input"
                    value={filterInput}
                    onChange={handleFilterChange}
                    placeholder={"Search name"}
                />

            </div>

            <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        className={
                            column.isSorted
                            ? column.isSortedDesc
                                ? "sort-desc"
                                : "sort-asc"
                            : ""
                        }
                        >
                        {column.render("Header")}
                        </th>
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