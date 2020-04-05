
// const bitcore = require('bitcore-lib')
// require('./peercoin')
const bitcore = require('bitcore-lib')
const Mnemonic = require('bitcore-mnemonic')
const network = 'peercoin-testnet'
const _ = require("./peercoin")
bitcore.Networks.defaultNetwork = bitcore.Networks.get(network)

function getMnemonic(){
    const mnemonic = new Mnemonic(Mnemonic.Words.ENGLISH);
    return mnemonic.toString()
}

function getAddressMnemonic(mnemonic){
    const buffer = Buffer.from(mnemonic);
    const hash = bitcore.crypto.Hash.sha256(buffer)
    const bn = bitcore.crypto.BN.fromBuffer(hash)
    const address = new bitcore.PrivateKey(bn).toAddress()
    return address
}

function getAddressWIF(wif){
    const address = new bitcore.PrivateKey(wif).toAddress()
    return address
}

function getPrivateKeyMnemonic(mnemonic){
    const buffer = Buffer.from(mnemonic);
    const hash = bitcore.crypto.Hash.sha256(buffer)
    const bn = bitcore.crypto.BN.fromBuffer(hash)
    return bitcore.PrivateKey(bn)
    
}

function getPrivateKeyWIF(wif){
    return bitcore.PrivateKey(wif)
}

function createTransaction(utxo,prikey){
    const transaction = new bitcore.Transasction()
    .from(utxo)
    .fee()
    .to(address, amount)
    .sign(privkey)
    if (transaction.verify()){
        return transaction.serialize()
    }
}

function createDeck(name,decimals,issue_mode,asset_specific_data){
    
}

// const mnemonic = getMnemonic()
// console.log("Mnemonic: " + mnemonic)
// const address = getAddressMnemonic(mnemonic)
// console.log("Address: " + address)
// const privkey = getPrivateKeyMnemonic(mnemonic)
// console.log(privkey)

// const utxo =   {
//     "txid": "95a9eb45f989afe4e8879c863a3c400fc1ddc3a30ca5bdd14a862eb1f842b8fe",
//     "outputIndex": 0,
//     "address": "mxhdrYvfXx4JAz2uoJ8jjuxMcedmjum97j",
//     "script": "76a914bc7f523b26c147d32283cf9ffe4df2255c936ce388ac",
//     "satoshis": 100000,
//   }

// const pk = getPrivateKeyWIF("cUsw2DNHS7p5nTJ8X5ExRMVYyDr1TiS55v3yUhaDqfa3PBuXZXUK")

// var transaction = new bitcore.Transaction()
//     .from(utxo)
//     .fee(90000)
//     .to('mgsZyvJTiADaKmYAU7aNQGbYkn4bw4MJCj',10000)
//     .sign(pk)
// console.log(transaction.verify())
// if (transaction.verify()){
//     console.log(transaction.serialize())

// }



// const pa = require("./peerassets.js")
// const deck = pa.encodeDeckSpawn({name:"test"})
// console.log(deck)