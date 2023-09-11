import axios from 'axios';
import { MOCK_API_URL } from './utility';
import { GenerateOTP } from '../utils/utility';
import { sendOTP } from '../utils/notificationService';


interface OTPRecord {
    otp: number;
    expiry: number;
    email: string;
}


export const initiateTransaction = async (senderEmail: any, recipientWalletID: any, amount: any) => {
    const otp = GenerateOTP();

    await axios.post(`${MOCK_API_URL}/otps`, {
        email: senderEmail,
        otp: otp,
        expiry: Date.now() + 15 * 60 * 1000 // 15 minutes expiry
    });

    await sendOTP(senderEmail, otp);

    return { message: "OTP sent to your email." };
};

export const executeTransaction = async (senderEmail: any, pin: any, otp: any, recipientWalletID: any, amount: number) => {
    // Validate pin and otp against the database
    const { data: user } = await axios.get(`${MOCK_API_URL}/users?email=${senderEmail}`);
    if (!user || user.pin !== pin) throw new Error("Invalid user or PIN.");

    const { data: otps } = await axios.get(`${MOCK_API_URL}/otps?email=${senderEmail}`);
    const validOtp = otps.find((val : OTPRecord)  => val.otp === otp && val.expiry > Date.now());
    if (!validOtp) throw new Error("Invalid or expired OTP.");

    const { data: senderWallet } = await axios.get(`${MOCK_API_URL}/wallets?email=${senderEmail}`);
    if (senderWallet.balance < amount) throw new Error("Insufficient funds.");

    await axios.patch(`${MOCK_API_URL}/wallets/${senderWallet.id}`, { balance: senderWallet.balance - amount });
    await axios.patch(`${MOCK_API_URL}/wallets/${recipientWalletID}`, { balance: recipientWalletID.balance + amount });

    return { message: "Transaction successful!" };
};
