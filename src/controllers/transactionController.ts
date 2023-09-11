import { initiateTransaction, executeTransaction } from '../utils/transactionService';
import { Request, Response } from 'express';

interface TransactionRequestBody {
   
    walletID: string;
    amount: number;
    agentID: string;
}

export const startTransaction = async (req:Request, res:Response) => {
    try {
        const { agentID, walletID, amount,  } = req.body as TransactionRequestBody;

        const transactionData = await initiateTransaction(agentID, walletID, amount);

        res.json(transactionData); 
    } catch (error:any) {
        res.status(400).json({ error: error.message });
    }
};

export const completeTransaction = async (req:Request, res:Response) => {
    try {
        const { email, pin, otp, walletID, amount } = req.body;

        await executeTransaction(email, pin, otp, walletID, amount);

        res.json({ message: 'Transaction successful!' });
    } catch (error:any) {
        res.status(400).json({ error: error.message });
    }
};
