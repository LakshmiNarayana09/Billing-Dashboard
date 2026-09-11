import {
  useState,
  type FormEvent,
} from "react";

interface AddPaymentMethodFormProps {
  onAdd: (paymentMethod: {
    cardType: string;
    last4: string;
    expiry: string;
    isDefault: boolean;
  }) => void;
  onCancel: () => void;
}

function AddPaymentMethodForm({
  onAdd,
  onCancel,
}: AddPaymentMethodFormProps) {
  const [cardType, setCardType] =
    useState("Visa");

  const [cardNumber, setCardNumber] =
    useState("");

  const [expiry, setExpiry] =
    useState("");

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const cleanedCardNumber =
      cardNumber.replace(/\s/g, "");

    if (cleanedCardNumber.length < 4) {
      return;
    }

    onAdd({
      cardType,
      last4:
        cleanedCardNumber.slice(-4),
      expiry,
      isDefault: false,
    });

    setCardNumber("");
    setExpiry("");
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Add New Card
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Add a payment method to your account.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label
            htmlFor="cardType"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Card Type
          </label>

          <select
            id="cardType"
            value={cardType}
            onChange={(event) =>
              setCardType(event.target.value)
            }
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:focus:border-white"
          >
            <option value="Visa">
              Visa
            </option>

            <option value="Mastercard">
              Mastercard
            </option>

            <option value="American Express">
              American Express
            </option>
          </select>
        </div>

        <div>
          <label
            htmlFor="cardNumber"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Card Number
          </label>

          <input
            id="cardNumber"
            type="text"
            inputMode="numeric"
            maxLength={19}
            value={cardNumber}
            onChange={(event) =>
              setCardNumber(
                event.target.value
              )
            }
            placeholder="4242 4242 4242 4242"
            required
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder:text-gray-600 dark:focus:border-white"
          />
        </div>

        <div>
          <label
            htmlFor="expiry"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Expiry Date
          </label>

          <input
            id="expiry"
            type="text"
            maxLength={5}
            value={expiry}
            onChange={(event) =>
              setExpiry(
                event.target.value
              )
            }
            placeholder="MM/YY"
            required
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder:text-gray-600 dark:focus:border-white"
          />
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            Add Card
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPaymentMethodForm;