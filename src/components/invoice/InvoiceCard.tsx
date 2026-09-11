import {
  CheckCircle2,
  Clock3,
  Download,
  FileText,
} from "lucide-react";

import type { Invoice } from "../../types/Invoice";

interface InvoiceCardProps {
  invoice: Invoice;
  onDownload: (invoice: Invoice) => void;
}

function InvoiceCard({
  invoice,
  onDownload,
}: InvoiceCardProps) {
  const formattedDate =
    new Date(
      invoice.date
    ).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const isPaid =
    invoice.status === "Paid";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
            <FileText
              size={21}
              className="text-gray-700 dark:text-gray-200"
            />
          </div>

          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Invoice
            </p>

            <h3 className="font-semibold text-gray-900 dark:text-white">
              {invoice.invoiceNumber}
            </h3>
          </div>
        </div>

        {isPaid ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            <CheckCircle2 size={14} />
            Paid
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            <Clock3 size={14} />
            Pending
          </span>
        )}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 dark:border-gray-800">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Date
          </p>

          <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
            {formattedDate}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Amount
          </p>

          <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
            ${invoice.amount.toFixed(2)}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() =>
          onDownload(invoice)
        }
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        <Download size={17} />
        Download Invoice
      </button>
    </div>
  );
}

export default InvoiceCard;