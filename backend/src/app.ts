import express from 'express';
import dotenv from 'dotenv';
import dataBaseConnection from './config/database';
import cors from 'cors';

import { fetchTransactions, pollForNewBlocks } from './services/transaction';
import transactionController from './controllers/transactionController';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

dataBaseConnection();

app.use('/transactions', transactionController);

fetchTransactions().then(() => {
    pollForNewBlocks();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});