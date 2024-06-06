import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    status: String,
    blockNumber: Number,
    transactionHash: String,
    type: String,
    age: String
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;