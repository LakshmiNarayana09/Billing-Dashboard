import {
  CreditCard,
  Trash2,
} from "lucide-react";

import type { PaymentMethod } from "../../types/Payment";

interface PaymentCardProps {
  paymentMethod: PaymentMethod;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
}

function PaymentCard({
  paymentMethod,
  onDelete,
  onSetDefault,
}: PaymentCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-start justify-between gap-4">
        
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
            <CreditCard
              size={24}
              className="text-gray-700 dark:text-gray-200"
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {paymentMethod.cardType}
              </h3>

              {paymentMethod.isDefault && (
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  Default
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              •••• •••• ••••{" "}
              {paymentMethod.last4}
            </p>
          </div>
        </div>

        
        <button
          type="button"
          onClick={() =>
            onDelete(paymentMethod.id)
          }
          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-red-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-red-400"
          title="Delete payment method"
        >
          <Trash2 size={18} />
        </button>
      </div>

      
      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Expiry date
          </p>

          <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
            {paymentMethod.expiry}
          </p>
        </div>

        {!paymentMethod.isDefault && (
          <button
            type="button"
            onClick={() =>
              onSetDefault(paymentMethod.id)
            }
            className="text-sm font-medium text-gray-700 underline underline-offset-4 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Set as default
          </button>
        )}
      </div>
    </div>
  );
}

export default PaymentCard;