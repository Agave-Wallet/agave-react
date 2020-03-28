function getMnemonic(){
  const rng = window.crypto
  const val = rng.getRandomValues(new Uint8Array(16))
  return bip39.entropyToMnemonic(val)
}

async function encryptKey(mnemonic,password){
  const mnUtf8 = new TextEncoder().encode(mnemonic)
  const pwUtf8 = new TextEncoder().encode(password)
  const pwHash = await crypto.subtle.digest('SHA-256',pwUtf8);
  
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const alg = {name: "AES-GCM", iv:iv};
  let key = await crypto.subtle.importKey('raw',pwHash, alg, false, ['encrypt']);
  let buf =  await crypto.subtle.encrypt(alg,key,mnUtf8)

  return {iv: hexlify(iv), encBuffer: hexlify(buf)}
}

const decryptKey = async (password)=>{
  const pwUtf8 = new TextEncoder().encode(password)
  const pwHash = await crypto.subtle.digest('SHA-256',pwUtf8);
  const iv = unhexlify(sessionStorage.getItem("lockedKey-iv"))
  const alg = {name: "AES-GCM", iv:iv};
  const key = await crypto.subtle.importKey('raw',pwHash, alg, false, ['decrypt']);
  const data = unhexlify(sessionStorage.getItem("lockedKey-enc"))
  const ptBuffer = crypto.subtle.decrypt(alg,key,data)

  console.log(ptBuffer)
}


function storeKey(mnemonic,password){
  
  encryptKey(mnemonic,password).then(data=>{
    sessionStorage.setItem("lockedKey-iv", JSON.stringify(data))
    sessionStorage.setItem("lockedKey-enc", JSON.stringify(data.encBuffer.Int8Array))
  })
}


function hexlify(buffer){
  const hashArray = Array.from(new Uint8Array(buffer));
  const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('')
  return hashHex
}

function unhexlify(hex){
  var typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
    return parseInt(h, 16)
  }))
  return typedArray
}