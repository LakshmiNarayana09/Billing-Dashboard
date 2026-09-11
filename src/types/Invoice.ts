export type InvoiceStatus = "Paid" | "Pending";

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  amount: number;
  status: InvoiceStatus;
}