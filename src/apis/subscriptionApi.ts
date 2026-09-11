import axiosInstance from "./axiosInstance";
import type { SubscriptionPlan } from "../types/Subscription";

export const getPlans =
  async (): Promise<SubscriptionPlan[]> => {
    const response =
      await axiosInstance.get<SubscriptionPlan[]>(
        "/plans"
      );

    return response.data;
  };