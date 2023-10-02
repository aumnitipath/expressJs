import axios from "axios";
import { url } from "../api/api.js";

// ส่งข้อมูลไปหลังบ้านด้วย method post

export const register = async (data) =>
  await axios.post(`${url}/register`, data);

export const login = async (data) => await axios.post(`${url}/login`, data);

export const currentUser = async (authtoken) =>
  await axios.post(
    `${url}/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
