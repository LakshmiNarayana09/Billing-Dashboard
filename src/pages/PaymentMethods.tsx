import { Plus, WalletCards } from "lucide-react";

import { useEffect, useState } from "react";

import {
  createPaymentMethod,
  deletePaymentMethod,
  getPaymentMethods,
  updatePaymentMethod,
} from "../apis/paymentApi";

import PaymentCard from "../components/payment/PaymentCard";
import AddPaymentMethodForm from "../components/payment/AddPaymentMethodForm";

import type { PaymentMethod } from "../types/Payment";

function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] =
    useState<PaymentMethod[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [showForm, setShowForm] =
    useState(false);

  useEffect(() => {
    const fetchPaymentMethods =
      async () => {
        try {
          setLoading(true);
          setError("");

          const data =
            await getPaymentMethods();

          setPaymentMethods(data);
        } catch (error) {
          console.error(
            "Failed to fetch payment methods:",
            error
          );

          setError(
            "Unable to load payment methods."
          );
        } finally {
          setLoading(false);
        }
      };

    fetchPaymentMethods();
  }, []);

  const handleAdd = async (
    paymentMethod: Omit<
      PaymentMethod,
      "id"
    >
  ) => {
    try {
      const newPaymentMethod =
        await createPaymentMethod(
          paymentMethod
        );

      setPaymentMethods(
        (current) => [
          ...current,
          newPaymentMethod,
        ]
      );

      setShowForm(false);
    } catch (error) {
      console.error(
        "Failed to add payment method:",
        error
      );

      alert(
        "Unable to add payment method."
      );
    }
  };

  const handleDelete = async (
    id: string
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this payment method?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await deletePaymentMethod(id);

      setPaymentMethods(
        (current) =>
          current.filter(
            (paymentMethod) =>
              paymentMethod.id !== id
          )
      );
    } catch (error) {
      console.error(
        "Failed to delete payment method:",
        error
      );

      alert(
        "Unable to delete payment method."
      );
    }
  };

  const handleSetDefault = async (
    id: string
  ) => {
    try {
      const currentDefault =
        paymentMethods.find(
          (paymentMethod) =>
            paymentMethod.isDefault
        );

      if (currentDefault) {
        await updatePaymentMethod(
          currentDefault.id,
          {
            isDefault: false,
          }
        );
      }

      await updatePaymentMethod(id, {
        isDefault: true,
      });

      setPaymentMethods(
        (current) =>
          current.map(
            (paymentMethod) => ({
              ...paymentMethod,
              isDefault:
                paymentMethod.id === id,
            })
          )
      );
    } catch (error) {
      console.error(
        "Failed to update default payment method:",
        error
      );

      alert(
        "Unable to update default payment method."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900 dark:border-gray-700 dark:border-t-white" />

          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Loading payment methods...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900 dark:bg-red-950">
        <p className="font-medium text-red-600 dark:text-red-400">
          {error}
        </p>

        <p className="mt-1 text-sm text-red-500 dark:text-red-400">
          Please make sure JSON Server is running.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Payment Methods
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your saved payment methods.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setShowForm(true)
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
        >
          <Plus size={18} />
          Add New Card
        </button>
      </div>

      {showForm && (
        <AddPaymentMethodForm
          onAdd={handleAdd}
          onCancel={() =>
            setShowForm(false)
          }
        />
      )}

      {paymentMethods.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-gray-700 dark:bg-gray-900">
          <WalletCards
            size={40}
            className="mx-auto text-gray-400"
          />

          <h2 className="mt-4 font-semibold text-gray-900 dark:text-white">
            No payment methods
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Add a card to manage your billing payments.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {paymentMethods.map(
            (paymentMethod) => (
              <PaymentCard
                key={paymentMethod.id}
                paymentMethod={
                  paymentMethod
                }
                onDelete={handleDelete}
                onSetDefault={
                  handleSetDefault
                }
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default PaymentMethods;