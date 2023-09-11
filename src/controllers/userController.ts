import axios from "axios";
import { MOCK_API_URL,  } from "../utils/utility";
import { Request, Response } from "express";
import { validateUserCreation, validateUserLogin } from '../utils/validation'
import { createUserInDB, findUserByEmail } from '../utils/utility';
import { GenerateOTP, generateUserId, } from "../utils/utility";



export const createUser = async (req:Request, res:Response) => {
    try {
        const { email, phone, pin } = req.body;

        validateUserCreation({ email, phone, pin });

        const agentID = generateUserId()
        
        const defaultUserData = {
            id: '', 
            agentID: agentID,
            role: 'user', 
            otp: GenerateOTP 
        };

        const userData = { ...defaultUserData, email, phone, pin };
        
        const savedUser = await createUserInDB(userData);
        

        res.status(201).json(savedUser);
    } catch (error:any) {
        res.status(400).json({ error: error.message ,
         });
    }
};




export const getUser = (req:Request, res:Response) => {

}


export const getUserTransactions = async (req:Request, res: Response) => {
    const userID = req.params.id;
    const transactions = await axios.get(`${MOCK_API_URL}/transactions?senderId=${userID}`);
    res.json(transactions.data);
};


export const loginUser = async (req:Request, res:Response) => {
    try {
        const { email, pin } = req.body;

        validateUserLogin({ email, pin });

        const User = await findUserByEmail(email);

        if (!User) {
            throw new Error('User not found.');
        }

        
        if (User.pin !== pin  || User.email !== email) {
            throw new Error('Invalid PIN.');
        }

       
        res.json({ message: "Login successful!" });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};




