import axios from "axios";
import { BaseURL } from "../constants/BaseURL";


export const login = async (email: string, password: string) =>{
    try {
        const response = await axios.post(`${BaseURL}/auth/login`, { email, password });
        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}