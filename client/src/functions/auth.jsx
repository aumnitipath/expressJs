import axios from "axios";
import { url } from "../api/api.js";

export const register = async (data) =>
  await axios.post(`${url}/register`, data);

export const login = async (data) => await axios.post(`${url}/login`, data);
