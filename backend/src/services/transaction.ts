import axios from "axios";
import Transaction from "../models/transaction";
// import { get } from "http";

const API_URL = "https://free-rpc.nethermind.io/mainnet-juno";
const TIMEOUT = 10000;

let status: string = "";
let timestamps: any = "";

function calculateAge(unixTimestamp: any) {
    const createdDate: any = new Date(unixTimestamp * 1000);
    const now: any = new Date();
    const diff = now - createdDate;
  
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return `${seconds} seconds ago`;
    }
  }

  const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: TIMEOUT,
  });

const getLatestBlock = async (): Promise<number> => {
    const response = await axiosInstance.post(API_URL, {
        jsonrpc: "2.0",
        method: "starknet_blockNumber",
        params: [],
        id: 1
    });
    // console.log(response.data.result)
    return response.data.result;
}

const getBlockWithTxs = async (blockNumber: number): Promise<object> => {
    // console.log("blockNumber",blockNumber)
    const response = await axiosInstance.post(API_URL, {
        jsonrpc: "2.0",
        method: "starknet_getBlockWithTxs",
        params: [
            {block_number: blockNumber}
        ],
        id: 1
    });
    // console.log("block with txs",response.data.result.status)
    status = response.data.result.status;
    timestamps = response.data.result.timestamp;
    return response.data.result.transactions;
}

const fetchTransactions = async () => {
    const latestBlock = await getLatestBlock();
    const firstBlock = latestBlock - 10;
    for(let i = firstBlock; i < latestBlock; i++) {
        const transactions: any[] = await getBlockWithTxs(i) as any[];
        // console.log("these are the transaction", transactions);
        transactions.forEach(async (tx: any) => {
            // console.log("tx",tx.status);
            
            await Transaction.create({
                status: status,
                blockNumber: i,
                transactionHash: tx.transaction_hash,
                type: tx.type,
                age: calculateAge(timestamps)
            });
        });
    }
}

const pollForNewBlocks = async () => {
    setInterval(async () => {
      await fetchTransactions();
    }, 30000);
};

export { fetchTransactions, pollForNewBlocks };