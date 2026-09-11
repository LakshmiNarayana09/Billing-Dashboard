import axiosInstance from "./axiosInstance";
import type { Invoice } from "../types/Invoice";

export const getInvoices =
  async (): Promise<Invoice[]> => {
    const response =
      await axiosInstance.get<Invoice[]>(
        "/invoices"
      );

    return response.data;
  };