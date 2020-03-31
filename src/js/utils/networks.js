const Network = {
    bitcoin: {
      messagePrefix: '\x18Bitcoin Signed Message:\n',
      bech32: 'bc',
      bip32: {
        public: 0x0488b21e,
        private: 0x0488ade4
      },
      pubKeyHash: 0x00,
      scriptHash: 0x05,
      wif: 0x80
    },
    bitcoinTestnet: {
      messagePrefix: '\x18Bitcoin Signed Message:\n',
      bech32: 'tb',
      bip32: {
        public: 0x043587cf,
        private: 0x04358394
      },
      pubKeyHash: 0x6f,
      scriptHash: 0xc4,
      wif: 0xef
    },
    peercoin:{
      messagePrefix: '\x19Peercoin Signed Message:\n',
      bech32: 'bc',
      bip32: {
        public: 0x043587cf,
        private: 0x04358394
      },
      pubKeyHash: 0x37,
      scriptHash: 0x75,
      wif: 0xb7
    },
    peercoinTestnet:{
      messagePrefix: '\x19Peercoin Signed Message:\n',
      bech32: 'tb',
      bip32: {
        public: 0x043587cf,
        private: 0x04358394
      },
      pubKeyHash: 0x6f,
      scriptHash: 0xc4,
      wif: 0xef
    },
  
  }

  export {Network}