import { MonthInvoice } from "./month-invoice";
import { MonthlyContracts } from "./monthly-contracts";
import { MonthlyExpenses } from "./monthly-expenses";
import { SpentType } from "./spent-type";

export class Invoice {

    id: number;
    totalInvoiceValue: number;
    totalPaid: boolean;
    monthInvoice: MonthInvoice;
    monthlyContracts: MonthlyContracts;
    monthlyExpenses: MonthlyExpenses;
    monthName: string
    spentTypes: SpentType[];

}
