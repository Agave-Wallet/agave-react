
export default class BlockBook {
    // Set class properties. API Key, URL Format, and Explorer Format//
    networks = {
        "peercoin":'https://blockbook.peercoin.net/api/',
        "peercoin-testnet": 'https://tblockbook.peercoin.net/api/',
        "bitcoinCash":"bch",
        "bitcoinCash-testnet": "bch-test"
    }

    constructor(network_name, address) {
    // Take input and set class properties accordingly
        // Network address ( Public Address )
        this.address = address;
        // Set Network Name to be used in API url
        this.api_url = this.networks[network_name];
        // Set network for normal transaction type
        this.network = network_name;
    }

    async processPromise(query){
        // Asyncronous Method to await response from fetch
        let promise = await fetch(query);
        let result = await promise.json();
        return result

    }

    async postRawTransaction(rawTransaction){
        // JSON.stringify( {tx: rawTransaction} )
        let query = this.api_url + "sendtx/"
        let promise = await fetch(query, {
                method: 'POST',
                body: rawTransaction,
                mode: "cors",
                headers: {
                    'Access-Control-Allow-Origin':'*'
                  }
            })

        const result = await promise.json() 
        console.log(result)
        return result
    }

    async getAddress(address){
        let query = this.api_url + "address/" + address
        return this.processPromise(query)
    }

    // working
    getBalancePromise() {
        // Returns a Promise Object for API query "getbalance"
        let query = this.api_url + "address/" + this.address
        return this.processPromise(query)
        }

    getUnspentPromise() {
        // Returns a Promise Object for API query "unspent"
        let query = this.api_url + "utxo/" + this.address
        return this.processPromise(query)
    }

    getChainInfoPromise(){
        // Returns a Promise Object for API query of general information
        let query = this.api_url
        return this.processPromise(query)
    }

    getTransactionsPromise(){
        // Returns a Promise object for transactions list
        let query = this.api_url + "address/" + this.address
        return this.processPromise(query)
    }

    getTransactionsInformationPromise(txid){
        // Returns information Promise object about a given transactions
        let query = this.api_url + "tx/" + txid
        return this.processPromise(query)
    }


    async getFormatedTransactions(){
        this.transactionInfo = []
        let transactions = new Promise( (resolve, reject)=>{
            let transactionInfo = []
            // TODO: handling when an account has no transactions
            this.getTransactionsPromise().then( data =>{
                data.transactions.forEach( v => {
                    let senders = {}
                    let receivers = {}

                    this.getTransactionsInformationPromise(v).then(data =>{
                        let send = false
                        let receive = false
                        let receivingAddress = ""
            
                        // Check if the my address is the sender
                        data.vin.forEach(v =>{
                            if (v.addresses[0] in senders){
                            senders[v.addresses[0]] += parseFloat(v.value)
                            } else{
                                senders[v.addresses[0]] = parseFloat(v.value)
                            }
                        })

                        // Check if my address is the receiver
                        data.vout.forEach( v => {
                            //vout[0].scriptPubKey.addresses
                            if ( v.scriptPubKey.addresses[0] in receivers){
                                receivers[v.scriptPubKey.addresses[0]] += parseFloat(v.value)
                            } else {
                                receivers[v.scriptPubKey.addresses[0]] = parseFloat(v.value)
                            }
                        })

                        // Check if I am in the sender array
                        if (Object.keys(senders).includes(this.address)) {
                            send = true
                            receivingAddress = data.vout[0].scriptPubKey.addresses[0]
                            // Also make sure I get my change back
                        }
                        if (Object.keys(receivers).includes(this.address)) {
                            receive = true   
                            // If I received then I am the receiving address
                            receivingAddress = this.address                                
                        }

                        if (send && receive){
                            senders[this.address] -= receivers[this.address]
                        } 

                        this.transactionInfo.push({
                            //blocktime - TODO blocktime when scott isnt lazy
                            // blocktime: data.blocktime,
                            //type - send receive
                            type: (send ? "send" : "receive"),
                            //amount
                            amount: (send ? senders[this.address]*-1 : receivers[this.address] ),
                            // receiving address
                            receiver: receivingAddress,
                            //txid
                            txid: data.txid,
                            //asset
                            asset: this.network
                        })
                    })
                })
                // console.log("transactionInfo", transactionInfo)
            })
        })
        return await  transactions
    }

    getFormatedUnspent(){
        // CHAINZ ID IS MESSED UP AND SPELLS tx_output_n as tx_ouput_n
        // CHAINZ also will send satoshis (1e8) rather than peertoshis (1e6)
        let result = []
        this.getUnspentPromise().then(data =>{
            console.log("getFormatedUnspent", data)
            data.forEach( v =>{
                console.log("v", v)
                result.push({
                    txid : v.txid,
                    outputIndex : v.vout,
                    // This was /100 before
                    satoshis : v.satoshis
                    // address : v.addr,
                    // script: v.script
                })

            })
        })
        // console.log("getFormatedUnspent", result)
        return result
    }


}
