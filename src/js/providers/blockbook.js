
export default class BlockBook {
    // Set class properties. API Key, URL Format, and Explorer Format
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
    }

    async processPromise(query){
        // Asyncronous Method to await response from fetch
        let promise = await fetch(query)
        let result = await promise.json()
        return result

    }

    async postRawTransaction(rawTransaction){
        // JSON.stringify( {tx: rawTransaction} )
        let query = this.api_url + "sendtx/"
        let promise = await fetch(query, {
                method: 'POST',
                body: rawTransaction
            })
        let result = await promise.json() 
        console.log(result)
        return result
    }

    async getAddress(address){
        let query = this.api_url + "/address/" + address
        return this.processPromise(query)
    }


    getBalancePromise() {
        // Returns a Promise Object for API query "getbalance"
        let query = this.api_url + "&q=getbalance&a=" + this.address
        return this.processPromise(query)
        }

    getUnspentPromise() {
        // Returns a Promise Object for API query "unspent"
        let query = this.api_url + "&q=unspent&active=" + this.address
        return this.processPromise(query)
    }

    // tx_output_n -> outputIndex
    // value -> satoshis
    // tx_hash -> txid
    // remove confirmations
    // addr -> address
    
    getFormatedUnspent(){
        // CHAINZ ID IS MESSED UP AND SPELLS tx_output_n as tx_ouput_n
        // CHAINZ also will send satoshis (1e8) rather than peertoshis (1e6)
        let result = []
        this.getUnspentPromise().then(data =>{
            data["unspent_outputs"].forEach( v =>{
                result.push({
                    txid : v.tx_hash,
                    outputIndex : v.tx_ouput_n,
                    satoshis : v.value/100,
                    address : v.addr,
                    script: v.script
                })

            })
        })
        return result
    }


}
