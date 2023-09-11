
import bcrypt from "bcryptjs";
import { App_Secret } from "./config";
import { UserPayload } from "../interface/user.dto";


export const MOCK_API_URL = 'http://localhost:3010';

import axios from 'axios';


export const createUserInDB = (data: any) => {
    return axios.post(`${MOCK_API_URL}/users`, data).then(response => response.data);
};



export const option = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};


export const generateUserId = (length = 12) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        return Array.from({ length }).map(() => characters.charAt(Math.floor(Math.random() * characters.length))).join('');

}







export const GenerateOTP = () => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  const expiry = new Date();

  expiry.setTime(new Date().getTime() + 30 * 60 * 1000);
  return { otp, expiry };
};


export const findUserByEmail = (email:string) => {
    return axios.get(`${MOCK_API_URL}/users?email=${email}`).then(response => response.data[0]);
};