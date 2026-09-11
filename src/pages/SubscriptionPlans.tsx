import { useEffect, useState } from "react";

import SubscriptionCard from "../components/subscription/SubscriptionCard";

import { getPlans } from "../apis/subscriptionApi";

import type { SubscriptionPlan } from "../types/Subscription";

function SubscriptionPlans() {
  const [plans, setPlans] =
    useState<SubscriptionPlan[]>([]);

  const [currentPlan, setCurrentPlan] =
    useState("Pro");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        setError("");

        const data =
          await getPlans();

        setPlans(data);
      } catch (error) {
        console.error(
          "Failed to fetch plans:",
          error
        );

        setError(
          "Unable to load subscription plans."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleChangePlan = (
    plan: SubscriptionPlan
  ) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to ${
          plan.price >
          (currentPlan === "Free"
            ? 0
            : currentPlan === "Pro"
              ? 29
              : 99)
            ? "upgrade"
            : "downgrade"
        } to the ${plan.name} plan?`
      );

    if (!confirmed) {
      return;
    }

    setCurrentPlan(plan.name);

    window.alert(
      `Your plan has been changed to ${plan.name}.`
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900 dark:border-gray-700 dark:border-t-white" />

          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Loading subscription plans...
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
    <div className="space-y-8">
      
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          Subscription Plans
        </h1>

        <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-500 dark:text-gray-400 sm:text-base">
          Choose the plan that best fits your needs.
          Upgrade or downgrade whenever you want.
        </p>
      </div>

      <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Your current plan
        </p>

        <h2 className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
          {currentPlan}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {plans.map((plan) => (
          <SubscriptionCard
            key={plan.id}
            plan={plan}
            currentPlan={currentPlan}
            onChangePlan={handleChangePlan}
          />
        ))}
      </div>
    </div>
  );
}

export default SubscriptionPlans;