import {
  Check,
  Crown,
} from "lucide-react";

import type { SubscriptionPlan } from "../../types/Subscription";

interface SubscriptionCardProps {
  plan: SubscriptionPlan;
  currentPlan: string;
  onChangePlan: (
    plan: SubscriptionPlan
  ) => void;
}

function SubscriptionCard({
  plan,
  currentPlan,
  onChangePlan,
}: SubscriptionCardProps) {
  const isCurrentPlan =
    plan.name === currentPlan;

  return (
    <div
      className={`
        relative
        flex
        flex-col
        rounded-2xl
        border
        bg-white
        p-6
        shadow-sm
        transition
        hover:-translate-y-1
        hover:shadow-md
        dark:bg-gray-900

        ${
          plan.popular
            ? "border-gray-900 dark:border-white"
            : "border-gray-200 dark:border-gray-800"
        }
      `}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-gray-900 px-4 py-1 text-xs font-medium text-white dark:bg-white dark:text-gray-900">
          <Crown size={13} />
          Most Popular
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {plan.name}
        </h2>

        <p className="mt-2 min-h-[40px] text-sm text-gray-500 dark:text-gray-400">
          {plan.description}
        </p>
      </div>

      <div className="mt-6">
        <span className="text-4xl font-bold text-gray-900 dark:text-white">
          ${plan.price}
        </span>

        <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
          /month
        </span>
      </div>

      <div className="mt-6 flex-1">
        <p className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
          What's included:
        </p>

        <ul className="space-y-3">
          {plan.features.map(
            (feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                  <Check size={13} />
                </span>

                <span>{feature}</span>
              </li>
            )
          )}
        </ul>
      </div>

      <button
        type="button"
        disabled={isCurrentPlan}
        onClick={() =>
          onChangePlan(plan)
        }
        className={`
          mt-8
          w-full
          rounded-xl
          px-4
          py-3
          text-sm
          font-semibold
          transition

          ${
            isCurrentPlan
              ? "cursor-not-allowed bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
              : "bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          }
        `}
      >
        {isCurrentPlan
          ? "Current Plan"
          : plan.price >
              (currentPlan === "Free"
                ? 0
                : currentPlan === "Pro"
                  ? 29
                  : 99)
            ? "Upgrade"
            : "Downgrade"}
      </button>
    </div>
  );
}

export default SubscriptionCard;