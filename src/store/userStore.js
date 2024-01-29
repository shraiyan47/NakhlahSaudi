import { API_URL } from "../../../lib/url";
import axios from "axios";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useUserStore = create(
  immer((set) => ({
    userLogin: async (values) => {
      const response = await axios.post(`${API_URL}`, {
        ...values,
      });
      return response;
    },
    userRegister: async (values) => {
      const response = await axios.post(`${API_URL}/register`, {
        ...values,
      });
      return response;
    },
  }))
);
