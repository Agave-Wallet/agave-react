// import bitcore-lib 
const bitcore = require('bitcore-lib');
const Mnemonic = require('bitcore-mnemonic');

//////////////////////////////////////
// Add New Networks to bitcore-lib //
////////////////////////////////////

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

// We need to pass through network chosen by client
bitcore.Networks.defaultNetwork = bitcore.Networks.get('peercoin-testnet')


// We are setting these up so if peercoin network is chosen
const Transaction = bitcore.Transaction;
const Input = Transaction.Input
const Output = Transaction.Output

const _ = require('lodash')


// Overwrite the Transaction type used in Bitcore to support the Transaction Timestamp in Peercoin
// This will setup by default. To change this we can put it in a function and run it only if
// Peercoin is chosen.
// TODO
Transaction.prototype.toBuffer = function(writer){
    writer.writeUInt32LE(this.version)

    // Peercoin: if no timestamp present, take current time (in seonds)
    const timestamp = this.timestamp ? this.timestamp :new Date().getTime/1000;
    writer.writeUInt32LE(timestamp);
    
    
    writer.writeVarintNum(this.inputs.length);
    _.each(this.inputs, function(input){
        input.toBufferWriter(writer);
    });
    
    writer.writeVarintNum(this.outputs.length);
    _.each(this.inputs, function(input){
        input.toBufferWriter(writer);
    });

    writer.writeUInt32LE(this.nLockTime);
    return writer;
}

const checkArguments = function(condition, argumentName, message, docsPath){
    if (!condition){
        throw new bitcore.errors.InvalidArgument(argumentName,message,docsPath)
    }
}

Transaction.prototype.fromBufferReader = function(reader){
    checkArguments( !reader.finished() , "No transaction data received");
    let i, sizeTxIns, sizeTxOuts;

    this.version = reader.readUInt32LE();

    // Peercoin deserialize timestamp
    this.timestamp = reader.readUInt32LE();
    
    sizeTxIns = reader.readVarintNum();
    for (i=0; i < sizeTxIns;i++){
        const input = Input.fromBufferReader(reader);
        this.inputs.push(input);
    }
    sizeTxOuts = reader.readVarintNum();
    for (i=0;i <sizeTxOuts;i++){
        const output = Output.fromBufferReader(reader);
        this.outputs.push(output)
    }
    this.nLockTime = reader.readUInt32LE();
    return this;
}

function generateMnemonic(){
    mnemonic = new Mnemonic(Mnemonic.Words.ENGLISH);
    console.log(mnemonic.toString());
}

// Here we will pass through the mnemonic 
// do this before encrypting data into session storage
function getAddressFromMnemonic(mnemonic){
    const buffer = Buffer.from(mnemonic);
    const hash = bitcore.crypto.Hash.sha256(buffer);
    // bn is bitcore.crypto.BN is just a wrapper for the bignum library
    const bn = bitcore.crypto.BN.fromBuffer(hash);
    const address = new bitcore.PrivateKey(bn).toAddress();
    return address
}   

function getAddressFromWIF(wif){
   const address = new bitcore.PrivateKey(wif).toAddress();
   return address
}   

function createTransaction(privkey, utxo, receiveAddress, amount){
    const privateKey = new bitcore.PrivateKey(privkey);
    const transaction = new bitcore.Transaction()
    .from(utxo)
    .to(receiveAddress, amount)
    .sign(privkey);
}   

function signMessage(privateKey, message) {
    const Message = require('bitcore-message')

    const privkey = new bitcore.PrivateKey(privateKey)
    const msg = new Message(message);

    const signature = msg.sign(privkey)
}

// function verifyMessage(address, signature, message){
//     const Message = require('bitcore-message')
    
//     const address = address
//     const signature = signature
    
//     const verified = new Message(message).verify(address, signature)
// }


// Use this to put the PeerAssets ProtoBuf information into the Transaction
function createOpReturn(privateKey, utxo, oPReturnData) {
    const privkey = new bitcore.PrivateKey(privateKey)
    // const utxo = utxo

    const transaction = new bitcore.Transaction()
    .from(utxo)
    .addData(oPReturnData)
    .sign(privkey);
}

// pubKeyArray must be array 
// numberofRequiredSignatures is int
function createMultisigP2SHAddress(pubKeyArray, numberOfRequiredSignatures){
    const publicKeys = pubKeyArray;
    const requiredSignatures = numberOfRequiredSignatures
    
    const address = new bitcore.Address(publicKeys, requiredSignatures)
}

// Maybe not functioning
function spendFromMultisigP2SHAddress(privKeyArray, utxo, numberofRequiredSignatures, receiveAddress, amount){
    // var privateKeys = [
    //   new bitcore.PrivateKey('91avARGdfge8E4tZfYLoxeJ5sGBdNJQH4kvjJoQFacbgwmaKkrx'),
    //   new bitcore.PrivateKey('91avARGdfge8E4tZfYLoxeJ5sGBdNJQH4kvjJoQFacbgww7vXtT')
    // ];
    // TODO: Need to iterate through values in the array
    
    const privateKeys = privKeyArray

    const publicKeys = privateKeys.map(bitcore.PublicKey)

    // const utxo = utxo

    const transaction = new bitcore.Transaction()
    .from(utxo, publicKeys, numberOfRequiredSignatures)
    .to(receiveAddress, amount)
    .sign(privateKeys)
}





























// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3001;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(privateKey);
// });

module.exports = {
    generateMnemonic
}