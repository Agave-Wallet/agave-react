
export default class Chainz {
    // Set class properties. API Key, URL Format, and Explorer Format
    api_key = '5aae7ab0624d'
    api_url_fmt = 'https://chainz.cryptoid.info/{net}/api.dws?key=' + this.api_key
    explorer_url = 'https://chainz.cryptoid.info/explorer/'
    // Example URLS
    // https://chainz.cryptoid.info/ppc-test/api.dws?key=5aae7ab0624d&q=unspent&active=moRgQhaLKKEd2quvMjr4dNh1LLrfsgxUSS
    // https://chainz.cryptoid.info/ppc-test/api.dws?key=5aae7ab0624d&q=getbalance&a=moRgQhaLKKEd2quvMjr4dNh1LLrfsgxUSS
    
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
    }

    async processPromise(query){
        // Asyncronous Method to await response from fetch
        let promise = await fetch(query)
        let result = await promise.json()
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

}
