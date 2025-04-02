import { Invoice } from "./invoice";

export class SpentType {

    id: string | number;
    name: string;
    color: string;
    paid: boolean;
    userId: string | null;
    invoices: Invoice[];
    totalValue: number; // chat

}
