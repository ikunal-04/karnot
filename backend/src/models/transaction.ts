import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    blockNumber: Number,
    transactionHash: String,
    type: String,
}, { timestamps: true });

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;