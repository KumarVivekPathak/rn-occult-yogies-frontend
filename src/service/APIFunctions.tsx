import axios from "axios";
import { BaseURL } from "../constants/BaseURL";
import { useAuth } from "../context/AuthContext";


export const login = async (email: string, password: string) =>{
    try {
        const response = await axios.post(`${BaseURL}/auth/login`, { email, password });
        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}

export const getUserProfile = async (token: string | null) => {
    try {
        const response = await axios.get(`${BaseURL}/auth/user`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Get user profile failed:", error);
        throw error;
    }
}

export const updateUserProfile = async (
  token: string,
  body : {
    name : string;
    email : string;
    phone : string;
  } //body changes here 
) => {
  try {
    const response = await axios.post(
      `${BaseURL}/auth/update-profile`,
      body,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Update user profile failed:', error);
    throw error;
  }
};