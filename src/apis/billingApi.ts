import axiosInstance from "./axiosInstance";
import type { BillingOverview } from "../types/Billing";

export const getBillingOverview =
  async (): Promise<BillingOverview> => {
    const response = await axiosInstance.get<BillingOverview>(
      "/billing"
    );

    return response.data;
  };