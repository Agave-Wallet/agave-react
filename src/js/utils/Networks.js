export const bitcoinCash = {
  messagePrefix: '\x18Bitcoin Signed Message:\n',
  shortName: "BCH",
  bech32: 'bc',
  bip32: {
    public: 0x0488b21e,
    private: 0x0488ade4
  },
  pubKeyHash: 0x00,
  scriptHash: 0x05,
  wif: 0x80
}
export const bitcoinCashTestnet = {
  messagePrefix: '\x18Bitcoin Signed Message:\n',
  shortName: "tBCH",
  bech32: 'tb',
  bip32: {
    public: 0x043587cf,
    private: 0x04358394
  },
  pubKeyHash: 0x6f,
  scriptHash: 0xc4,
  wif: 0xef
}
export const peercoin = {
  messagePrefix: '\x19Peercoin Signed Message:\n',
  shortName: "PPC",
  bech32: 'bc',
  bip32: {
    public: 0x043587cf,
    private: 0x04358394
  },
  pubKeyHash: 0x37,
  scriptHash: 0x75,
  wif: 0xb7
}
export const peercoinTestnet = {
  messagePrefix: '\x19Peercoin Signed Message:\n',
  shortName: "tPPC",
  bech32: 'tb',
  bip32: {
    public: 0x043587cf,
    private: 0x04358394
  },
  pubKeyHash: 0x6f,
  scriptHash: 0xc4,
  wif: 0xef
}