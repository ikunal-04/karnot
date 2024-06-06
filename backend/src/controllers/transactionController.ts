import { Router } from 'express';
import Transaction from '../models/transaction';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    const query = type ? { type } : {};
    const transactions = await Transaction.find(query).limit(1000);
    // console.log(transactions);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
