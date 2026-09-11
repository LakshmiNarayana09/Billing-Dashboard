import {
  CalendarDays,
  CreditCard,
  TrendingUp,
  Wallet,
} from "lucide-react";

interface BillingOverviewProps {
  billing: {
    currentPlan: string;
    monthlyUsage: number;
    usageLimit: number;
    totalAmount: number;
    nextBillingDate: string;
  };
}

function BillingOverview({
  billing,
}: BillingOverviewProps) {
  const usagePercentage =
    billing.usageLimit > 0
      ? Math.min(
          (billing.monthlyUsage /
            billing.usageLimit) *
            100,
          100
        )
      : 0;

  const formattedDate =
    new Date(
      billing.nextBillingDate
    ).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          Billing Overview
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Monitor your subscription, usage and billing information.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Current Plan
              </p>

              <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                {billing.currentPlan}
              </h2>
            </div>

            <div className="rounded-xl bg-gray-100 p-3 dark:bg-gray-800">
              <CreditCard
                size={22}
                className="text-gray-700 dark:text-gray-200"
              />
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            Your active subscription plan
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Monthly Usage
              </p>

              <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                {billing.monthlyUsage}
              </h2>
            </div>

            <div className="rounded-xl bg-gray-100 p-3 dark:bg-gray-800">
              <TrendingUp
                size={22}
                className="text-gray-700 dark:text-gray-200"
              />
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-2 flex justify-between text-xs">
              <span className="text-gray-500 dark:text-gray-400">
                Usage
              </span>

              <span className="font-medium text-gray-700 dark:text-gray-300">
                {Math.round(usagePercentage)}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-full rounded-full bg-gray-900 transition-all dark:bg-white"
                style={{
                  width: `${usagePercentage}%`,
                }}
              />
            </div>

            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {billing.monthlyUsage} /{" "}
              {billing.usageLimit} units
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Amount
              </p>

              <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                ${billing.totalAmount}
              </h2>
            </div>

            <div className="rounded-xl bg-gray-100 p-3 dark:bg-gray-800">
              <Wallet
                size={22}
                className="text-gray-700 dark:text-gray-200"
              />
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            Current monthly subscription cost
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Next Billing Date
              </p>

              <h2 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
                {formattedDate}
              </h2>
            </div>

            <div className="rounded-xl bg-gray-100 p-3 dark:bg-gray-800">
              <CalendarDays
                size={22}
                className="text-gray-700 dark:text-gray-200"
              />
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            Upcoming subscription renewal
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Usage Overview
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Track your monthly usage against your plan limit.
            </p>
          </div>

          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {billing.monthlyUsage} / {billing.usageLimit} units
          </span>
        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full rounded-full bg-gray-900 transition-all dark:bg-white"
            style={{
              width: `${usagePercentage}%`,
            }}
          />
        </div>

        <div className="mt-3 flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>0 units</span>

          <span>
            {Math.round(usagePercentage)}% used
          </span>

          <span>{billing.usageLimit} units</span>
        </div>
      </div>
    </div>
  );
}

export default BillingOverview;