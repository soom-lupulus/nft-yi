// import nftMarketplace from '../../contract/artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'
import nftMarketplace from './NFTMarketplace.json'

export const nftMarketplaceAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
export const nftMarketplaceAbi = nftMarketplace.abi
/**
 * @link https://ethereum.org/en/developers/docs/apis/json-rpc/
 * @docs https://eips.ethereum.org/EIPS/eip-1102
 * @docs https://eips.ethereum.org/EIPS/eip-1193
 * @docs https://eips.ethereum.org/EIPS/eip-1474
 */
export const ETHEREUM_METHODS = {
    REQUEST_ACCOUNTS: 'eth_requestAccounts',
    WALLET_REVOKEPERMISSIONS: 'wallet_revokePermissions',
    ACCOUNTS: 'eth_accounts',
    BLOCK_NUMBER: 'eth_blockNumber',
    CALL: 'eth_call',
    COIN_BASE: 'eth_coinbase',
    ESTIMATE_GAS: 'eth_estimateGas',
    GAS_PRICE: 'eth_gasPrice',
    GET_BALANCE: 'eth_getBalance',
    GET_BLOCK_BY_HASH: 'eth_getBlockByHash',
    GET_BLOCK_TRANSACTIONCOUNT_BY_HASH: 'eth_getBlockTransactionCountByHash',
    GET_BLOCK_BY_NUMBER: 'eth_getBlockByNumber',
    GET_BLOCK_TRANSACTIONCOUNT_BY_NUMBER: 'eth_getBlockTransactionCountByNumber',
    GET_CODE: 'eth_getCode',
    GET_FILTER_CHANGES: 'eth_getFilterChanges',
    GET_FILTER_LOGS: 'eth_getFilterLogs',
    GET_LOGS: 'eth_getLogs',
    GET_STORAGE_AT: 'eth_getStorageAt',
    GET_TRANSACTION_BY_BLOCKHASH_AND_INDEX: 'eth_getTransactionByBlockHashAndIndex',
    GET_TRANSACTION_BY_BLOCKNUMBER_AND_INDEX: 'eth_getTransactionByBlockNumberAndIndex',
    GET_TRANSACTION_BY_HASH: 'eth_getTransactionByHash',
    GET_TRANSACTIONCOUNT: 'eth_getTransactionCount',
    GET_TRANSACTIONRECEIPT: 'eth_getTransactionReceipt',
    GET_UNCLE_BY_BLOCKHASH_AND_INDEX: 'eth_getUncleByBlockHashAndIndex',
    GET_UNCLE_BY_BLOCKNUMBER_AND_INDEX: 'eth_getUncleByBlockNumberAndIndex',
    GET_UNCLECOUNT_BY_BLOCKHASH: 'eth_getUncleCountByBlockHash',
    GET_UNCLECOUNT_BY_BLOCKNUMBER: 'eth_getUncleCountByBlockNumber',
    GET_WORK: 'eth_getWork',
    HASHRATE: 'eth_hashrate',
    MINING: 'eth_mining',
    NEWBLOCKFILTER: 'eth_newBlockFilter',
    NEWFILTER: 'eth_newFilter',
    NEWPENDING_TRANSACTIONFILTER: 'eth_newPendingTransactionFilter',
    PROTOCOL_VERSION: 'eth_protocolVersion',
    SEND_RAW_TRANSACTION: 'eth_sendRawTransaction',
    SEND_TRANSACTION: 'eth_sendTransaction',
    SIGN: 'eth_sign',
    SIGN_TRANSACTION: 'eth_signTransaction',
    SIGN_TYPEDDATA: 'eth_signTypedData',
    SUBMIT_HASHRATE: 'eth_submitHashrate',
    SUBMIT_WORK: 'eth_submitWork',
    SYNCING: 'eth_syncing',
    UNINSTALL_FILTER: 'eth_uninstallFilter',
    WEB3_CLIENTVERSION: 'web3_clientVersion',
    WEB3_SHA3: 'web3_sha3',
    NET_LISTENING: 'net_listening',
    NET_PEERCOUNT: 'net_peerCount',
    NET_VERSION: 'net_version',
}
