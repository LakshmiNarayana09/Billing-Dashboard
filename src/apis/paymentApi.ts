import axiosInstance from "./axiosInstance";
import type { PaymentMethod } from "../types/Payment";

export const getPaymentMethods =
  async (): Promise<PaymentMethod[]> => {
    const response =
      await axiosInstance.get<PaymentMethod[]>(
        "/paymentMethods"
      );

    return response.data;
  };

export const createPaymentMethod = async (
  paymentMethod: Omit<PaymentMethod, "id">
): Promise<PaymentMethod> => {
  const response =
    await axiosInstance.post<PaymentMethod>(
      "/paymentMethods",
      paymentMethod
    );

  return response.data;
};

export const deletePaymentMethod = async (
  id: string
): Promise<void> => {
  await axiosInstance.delete(
    `/paymentMethods/${id}`
  );
};

export const updatePaymentMethod = async (
  id: string,
  paymentMethod: Partial<PaymentMethod>
): Promise<PaymentMethod> => {
  const response =
    await axiosInstance.patch<PaymentMethod>(
      `/paymentMethods/${id}`,
      paymentMethod
    );

  return response.data;
};