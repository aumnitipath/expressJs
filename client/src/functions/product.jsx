import axios from "axios";
import { url } from "../api/api.js";

export const remove = async (id) => await axios.delete(`${url}/product/${id}`);

export const create = async (data) => await axios.post(`${url}/product`, data);

export const getData = async () => {
  return await axios.get(`${url}/product`);
};

export const read = async (id) => {
  return await axios.get(`${url}/product/${id}`);
};

export const update = async (data, id) => {
  return await axios.put(`${url}/product/${id}`, data);
};
