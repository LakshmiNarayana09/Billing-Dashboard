
import { FileText, Search } from "lucide-react";

import { useEffect, useState } from "react";

import jsPDF from "jspdf";

import { getInvoices } from "../apis/invoiceApi";

import InvoiceCard from "../components/invoice/InvoiceCard";
import InvoiceTable from "../components/invoice/InvoiceTable";

import type { Invoice } from "../types/Invoice";

function Invoices() {
  const [invoices, setInvoices] =
    useState<Invoice[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    const fetchInvoices =
      async () => {
        try {
          setLoading(true);
          setError("");

          const data =
            await getInvoices();

          setInvoices(data);
        } catch (error) {
          console.error(
            "Failed to fetch invoices:",
            error
          );

          setError(
            "Unable to load invoices."
          );
        } finally {
          setLoading(false);
        }
      };

    fetchInvoices();
  }, []);

  const filteredInvoices =
    invoices.filter((invoice) =>
      invoice.invoiceNumber
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const handleDownload = (
    invoice: Invoice
  ) => {
    const pdf = new jsPDF();

    const formattedDate =
      new Date(
        invoice.date
      ).toLocaleDateString(
        "en-US",
        {
          month: "long",
          day: "numeric",
          year: "numeric",
        }
      );

    pdf.setFontSize(24);
    pdf.setFont(
      "helvetica",
      "bold"
    );

    pdf.text(
      "BillFlow",
      20,
      25
    );

    pdf.setFontSize(10);
    pdf.setFont(
      "helvetica",
      "normal"
    );

    pdf.text(
      "Billing Dashboard",
      20,
      32
    );

    pdf.setFontSize(22);
    pdf.setFont(
      "helvetica",
      "bold"
    );

    pdf.text(
      "INVOICE",
      150,
      25
    );

    pdf.setFontSize(11);
    pdf.setFont(
      "helvetica",
      "normal"
    );

    pdf.text(
      invoice.invoiceNumber,
      150,
      33
    );

    pdf.line(
      20,
      42,
      190,
      42
    );

    pdf.setFontSize(10);
    pdf.setFont(
      "helvetica",
      "normal"
    );

    pdf.text(
      "Invoice Date",
      20,
      58
    );

    pdf.setFont(
      "helvetica",
      "bold"
    );

    pdf.text(
      formattedDate,
      20,
      66
    );

    pdf.setFont(
      "helvetica",
      "normal"
    );

    pdf.text(
      "Payment Status",
      140,
      58
    );

    pdf.setFont(
      "helvetica",
      "bold"
    );

    pdf.text(
      invoice.status,
      140,
      66
    );

    pdf.setFont(
      "helvetica",
      "bold"
    );

    pdf.text(
      "Description",
      20,
      90
    );

    pdf.text(
      "Status",
      110,
      90
    );

    pdf.text(
      "Amount",
      160,
      90
    );

    pdf.line(
      20,
      95,
      190,
      95
    );

    pdf.setFont(
      "helvetica",
      "normal"
    );

    pdf.text(
      "Monthly Subscription",
      20,
      108
    );

    pdf.text(
      invoice.status,
      110,
      108
    );

    pdf.text(
      `$${invoice.amount.toFixed(2)}`,
      160,
      108
    );

    pdf.line(
      20,
      115,
      190,
      115
    );

    pdf.text(
      "Subtotal",
      130,
      135
    );

    pdf.text(
      `$${invoice.amount.toFixed(2)}`,
      170,
      135
    );

    pdf.text(
      "Tax",
      130,
      145
    );

    pdf.text(
      "$0.00",
      170,
      145
    );

    pdf.setFont(
      "helvetica",
      "bold"
    );

    pdf.text(
      "Total",
      130,
      160
    );

    pdf.text(
      `$${invoice.amount.toFixed(2)}`,
      170,
      160
    );

    pdf.setFont(
      "helvetica",
      "normal"
    );

    pdf.setFontSize(9);

    pdf.text(
      "Thank you for using BillFlow.",
      105,
      190,
      {
        align: "center",
      }
    );

    pdf.save(
      `${invoice.invoiceNumber}.pdf`
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900 dark:border-gray-700 dark:border-t-white" />

          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Loading invoices...
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
            Invoices
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View and download your billing invoices.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <FileText size={18} />

          <span>
            {invoices.length} invoice
            {invoices.length !== 1
              ? "s"
              : ""}
          </span>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value
            )
          }
          placeholder="Search invoice number..."
          className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white"
        />
      </div>

      {filteredInvoices.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-gray-700 dark:bg-gray-900">
          <FileText
            size={40}
            className="mx-auto text-gray-400"
          />

          <h2 className="mt-4 font-semibold text-gray-900 dark:text-white">
            No invoices found
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try searching with a different invoice number.
          </p>
        </div>
      ) : (
        <>
          <InvoiceTable
            invoices={filteredInvoices}
            onDownload={handleDownload}
          />

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredInvoices.map(
              (invoice) => (
                <InvoiceCard
                  key={invoice.id}
                  invoice={invoice}
                  onDownload={
                    handleDownload
                  }
                />
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Invoices;

