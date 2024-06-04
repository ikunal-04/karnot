import axios from "axios";
import Transaction from "../models/transaction";
import { get } from "http";

const API_URL = "https://free-rpc.nethermind.io/mainnet-juno";

const getLatestBlock = async (): Promise<number> => {
    const response = await axios.post(API_URL, {
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
    const response = await axios.post(API_URL, {
        jsonrpc: "2.0",
        method: "starknet_getBlockWithTxs",
        params: [
            {block_number: blockNumber}
        ],
        id: 1
    });
    // console.log("block with txs",response.data.result.transactions)
    return response.data.result.transactions;
}

const fetchTransactions = async () => {
    const latestBlock = await getLatestBlock();
    const firstBlock = latestBlock - 10;
    for(let i = firstBlock; i < latestBlock; i++) {
        const transactions: any[] = await getBlockWithTxs(i) as any[];
        // console.log("these are the transaction", transactions);
        transactions.forEach(async (tx: any) => {
            await Transaction.create({
                blockNumber: i,
                transactionHash: tx.transaction_hash,
                type: tx.type
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