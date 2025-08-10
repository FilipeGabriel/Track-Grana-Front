export class ExpensesItem {

    id: number;
    description: string;
    installment: number | null;
    itemValue: number | null;
    spentTypeId: number | null;
    monthlyExpensesId: number;

    spentType?: { id: number };
}
