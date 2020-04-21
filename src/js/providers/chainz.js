
export default class Chainz {
    // Set class properties. API Key, URL Format, and Explorer Format
    api_key = '5aae7ab0624d'
    api_url_fmt = 'https://chainz.cryptoid.info/{net}/api.dws?key=' + this.api_key
    api_nokey_fmt = 'https://chainz.cryptoid.info/{net}/api.dws?'
    explorer_url = 'https://chainz.cryptoid.info/explorer/'
    // Example URLS
    // https://chainz.cryptoid.info/ppc-test/api.dws?key=5aae7ab0624d&q=unspent&active=moRgQhaLKKEd2quvMjr4dNh1LLrfsgxUSS
    // https://chainz.cryptoid.info/ppc-test/api.dws?key=5aae7ab0624d&q=unspent&active=mxhdrYvfXx4JAz2uoJ8jjuxMcedmjum97j
    
    networks = {
        "peercoin":"ppc",
        "peercoin-testnet": "ppc-test",
        "bitcoinCash":"bch",
        "bitcoinCash-testnet": "bch-test"
    }

    constructor(network_name, address) {
    // Take input and set class properties accordingly
        // Network address ( Public Address )
        this.address = address;
        // Set Network Name to be used in API url
        this.net = this.networks[network_name];
        // replace default API url with specific Network Name
        this.api_url = this.api_url_fmt.replace("{net}",this.net);
        // replace no key API url with specific Network Name
        this.api_nokey_fmt = this.api_nokey_fmt.replace("{net}",this.net);
    }

    async processPromise(query){
        // Asyncronous Method to await response from fetch
        let promise = await fetch(query,
            {referrerPolicy: "no-referrer",
            cache: "no-cache",
            credentials: "same-origin",})
        if (promise.status !== "ok"){
        }
        const result = promise.json()
        // if (typeof result === "string") {
        //     result = JSON.parse(result)
        // }

        return result
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

    getLastBlockPromise() {
        // Returns the last block
        // https://chainz.cryptoid.info/ppc-test/api.dws?q=getblockcount
        let query = this.api_url + "&q=getblockcount"
        console.log(query)
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
