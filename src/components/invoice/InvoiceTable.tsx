import {
  CheckCircle2,
  Clock3,
  Download,
  FileText,
} from "lucide-react";

import type { Invoice } from "../../types/Invoice";

interface InvoiceTableProps {
  invoices: Invoice[];
  onDownload: (invoice: Invoice) => void;
}

function InvoiceTable({
  invoices,
  onDownload,
}: InvoiceTableProps) {
  return (
    <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 md:block">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Invoice
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Date
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Amount
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Status
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice) => {
              const formattedDate =
                new Date(
                  invoice.date
                ).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }
                );

              const isPaid =
                invoice.status === "Paid";

              return (
                <tr
                  key={invoice.id}
                  className="border-b border-gray-100 last:border-0 dark:border-gray-800"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                        <FileText
                          size={18}
                          className="text-gray-700 dark:text-gray-200"
                        />
                      </div>

                      <span className="font-medium text-gray-900 dark:text-white">
                        {
                          invoice.invoiceNumber
                        }
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-sm text-gray-600 dark:text-gray-300">
                    {formattedDate}
                  </td>

                  <td className="px-6 py-5 text-sm font-semibold text-gray-900 dark:text-white">
                    ${invoice.amount.toFixed(2)}
                  </td>

                  <td className="px-6 py-5">
                    {isPaid ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        <CheckCircle2
                          size={14}
                        />
                        Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        <Clock3
                          size={14}
                        />
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-5 text-right">
                    <button
                      type="button"
                      onClick={() =>
                        onDownload(invoice)
                      }
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      <Download
                        size={16}
                      />
                      Download
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InvoiceTable;