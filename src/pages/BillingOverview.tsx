
import { useEffect, useState } from "react";

import { getBillingOverview } from "../apis/billingApi";

import BillingOverviewComponent from "../components/overview/Overview";

import type { BillingOverview as BillingOverviewType } from "../types/Billing";

function BillingOverview() {
  const [billing, setBilling] =
    useState<BillingOverviewType | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchBilling = async () => {
      try {
        setLoading(true);
        setError("");

        const data =
          await getBillingOverview();

        setBilling(data);
      } catch (error) {
        console.error(
          "Failed to fetch billing data:",
          error
        );

        setError(
          "Unable to load billing information."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBilling();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900 dark:border-gray-700 dark:border-t-white" />

          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Loading billing information...
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

  if (!billing) {
    return null;
  }

  return (
    <BillingOverviewComponent
      billing={billing}
    />
  );
}

export default BillingOverview;

