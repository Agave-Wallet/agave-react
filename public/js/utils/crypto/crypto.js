'use strict'
const bitcore = require('bitcore-lib')
const Mnemonic = require('bitcore-mnemonic')
const network = 'peercoin-testnet'
const crypto = require('crypto');

// const _ = require("./peercoin")
// bitcore.Networks.defaultNetwork = bitcore.Networks.testnet


var Transaction = bitcore.Transaction;
var Input = Transaction.Input;
var Output = Transaction.Output;

var _ = require('lodash');

// Output.prototype.satoshis.toFixed(6)

bitcore.Networks.add({
    name: 'peercoin',
    alias: 'ppcoin',
    pubkeyhash: 0x37,
    privatekey: 0xb7,
    scripthash: 0x75,
    xpubkey: 0x0488b21e,
    xprivkey: 0x0488ade4,
  });

bitcore.Networks.add({
    name: 'peercoin-testnet',
    alias: 'ppcoin-test',
    pubkeyhash: 0x6f,
    privatekey: 0xef,
    scripthash: 0xc4,
    xpubkey: 0x043587cf,
    xprivkey: 0x04358394,
  });

bitcore.Networks.defaultNetwork = bitcore.Networks.get(network)

Transaction.prototype.toBufferWriter = function(writer) {
  writer.writeUInt32LE(this.version);

  // ppcoin: if no timestamp present, take current time (in seconds)
  var timestamp = this.timestamp ? this.timestamp : new Date().getTime()/1000;
  writer.writeUInt32LE(timestamp);

  writer.writeVarintNum(this.inputs.length);
  _.each(this.inputs, function(input) {
    input.toBufferWriter(writer);
  });
  writer.writeVarintNum(this.outputs.length);
  _.each(this.outputs, function(output) {
    output.toBufferWriter(writer);
  });
  writer.writeUInt32LE(this.nLockTime);
  return writer;
};

var checkArgument = function(condition, argumentName, message, docsPath) {
  if (!condition) {
    throw new bitcore.errors.InvalidArgument(argumentName, message, docsPath);
  }
};

Transaction.prototype.fromBufferReader = function(reader) {
  checkArgument(!reader.finished(), 'No transaction data received');
  var i, sizeTxIns, sizeTxOuts;

  this.version = reader.readUInt32LE();

  // ppcoin: deserialize timestamp
  this.timestamp = reader.readUInt32LE();

  sizeTxIns = reader.readVarintNum();
  for (i = 0; i < sizeTxIns; i++) {
    var input = Input.fromBufferReader(reader);
    this.inputs.push(input);
  }
  sizeTxOuts = reader.readVarintNum();
  for (i = 0; i < sizeTxOuts; i++) {
    this.outputs.push(Output.fromBufferReader(reader));
  }
  this.nLockTime = reader.readUInt32LE();
  return this;
};



exports.getMnemonic = function(){
    const mnemonic = new Mnemonic(Mnemonic.Words.ENGLISH);
    return mnemonic
}

exports.getMnemonicObject = function(mnemonicString){
    const mnemonic = new Mnemonic(mnemonicString,Mnemonic.Words.ENGLISH)
    return mnemonic
}

exports.getAddressMnemonic = function(mnemonic){
    // const buffer = Buffer.from(mnemonic);
    const hash = bitcore.crypto.Hash.sha256(mnemonic.toSeed())
    const bn = bitcore.crypto.BN.fromBuffer(hash)
    const address = new bitcore.PrivateKey(bn).toAddress()
    return address
}

exports.getAddressWIF = function(wif){
  const address = bitcore.PrivateKey.fromWIF(wif)
    return address.toWIF()
}

exports.getPrivateKeyToAddress = function(privkey){
    // takes in hex privkey string
    const privateKey = new bitcore.PrivateKey(privkey)
    return privateKey.toAddress()
}

exports.getPrivateKeyFromMnemonic = function(mnemonic,wifBool){
    const hash = bitcore.crypto.Hash.sha256(mnemonic.toSeed())
    const bn = bitcore.crypto.BN.fromBuffer(hash)
    const privkey = bitcore.PrivateKey(bn)
    return (wifBool ? privkey.toWIF() : privkey )
}

exports.newTransaction = function(utxo, amount, sender, receiver, protobuf){
    console.log("utxo", utxo)
    console.log("amount", amount)
    console.log("sender", sender)
    console.log("receiver", receiver)
    console.log("protobuf", protobuf)
    var transaction = new bitcore.Transaction()
        .from(utxo)
        .to(receiver, amount)
        .change(sender)
        // .feePerKb(10000)
    if (protobuf !== null){
        transaction.addData(protobuf)
    }
        // .feePerKb(100000)
    return transaction
}

exports.signTransaction = function( transaction, privkey){
    return transaction.sign(privkey)
}

exports.verifyAddress = function(privkey, address){
    const publicKey = bitcore.PublicKey(privkey)
    const Address = new bitcore.Address(publicKey, bitcore.Networks.defaultNetwork)
    const isValid = (bitcore.Address.isValid(Address) && address === Address)
    return isValid
}

///////////////////////////////////////////////////////////
///////////////// CRYPT FUNCTIONS FOR SESSIONSTORAGE //////
//////////////////////////////////////////////////////////
exports.encryptData = function(key, data) {
    var cipher = crypto.createCipher('aes-256-cbc', key);
    var crypted = cipher.update(data, 'utf-8', 'hex');
    crypted += cipher.final('hex');

    return crypted
}
exports.decryptData = function(key, data) {
    var decipher = crypto.createDecipher('aes-256-cbc', key);
    var decrypted = decipher.update(data, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted
}

// module.exports(
//     getMnemonic,
//     getAddressMnemonic,
//     getAddressMnemonic,
//     getPrivateKeyFromMnemonic,
//     getPrivateKeyToWIF,
//     getPrivateKeyFromMnemonic,
//     newTransaction,
//     signTransaction,
//     verifyAddress,
//     encryptData,
//     decryptData
// )



// const mnemonic = getMnemonic()
// console.log("Mnemonic: " + mnemonic)
// const address = getAddressMnemonic(mnemonic)
// console.log("Address: " + address)
// const privkey = getPrivateKeyMnemonic(mnemonic)
// console.log(privkey)

// function newTransaction(utxo, amount, sender, receiver, protobuf){
//     var transaction = new bitcore.Transaction()
//         .from(utxo)
//         .to(receiver, amount)
//         .change(sender)
//         .addData(protobuf)
//         .feePerKb(10000)
//     return transaction
// }

// function signTransaction( transaction, privkey){
//     transaction.sign(privkey)
// }



// const pk = getPrivateKeyWIF("cUsw2DNHS7p5nTJ8X5ExRMVYyDr1TiS55v3yUhaDqfa3PBuXZXUK")

// var transaction = new bitcore.Transaction()
//     .from(utxo)
//     .fee(90000)
//     .to('mgsZyvJTiADaKmYAU7aNQGbYkn4bw4MJCj',10000)
//     .addData()
//     .sign(pk)
// console.log(transaction.verify())
// if (transaction.verify()){
//     console.log(transaction.serialize())

// }


// const utxo =   {
//     "txid": "95a9eb45f989afe4e8879c863a3c400fc1ddc3a30ca5bdd14a862eb1f842b8fe",
//     "outputIndex": 0,
//     "address": "mxhdrYvfXx4JAz2uoJ8jjuxMcedmjum97j",
//     "script": "76a914bc7f523b26c147d32283cf9ffe4df2255c936ce388ac",
//     "satoshis": 100000,
//   }

// const pa = require("./peerassets.js")
// const deck = pa.encodeDeckSpawn({name:"test"})
// console.log(deck)