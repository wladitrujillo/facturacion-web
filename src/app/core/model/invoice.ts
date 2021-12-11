
import { Branch } from "./branch";
import { Customer } from "./customer";
import { InvoiceDetail } from "./invoice-detail";

export class Invoice {
  _id: string;
  branch: Branch | string;
  customer: Customer | string;
  secuence: Number;
  createdAt: Date;
  totalWithTax: Number;
  totalWithoutTax: Number;
  tax: Number;
  ice: Number;
  total: Number;
  detail: InvoiceDetail[];
}