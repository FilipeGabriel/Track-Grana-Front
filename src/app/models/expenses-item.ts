export class ExpensesItem {

    description: string;
    installment: number | null;
    itemValue: number | null;
    spentTypeId: number | null;
    monthlyExpensesId: number;

    // Propriedade opcional (apenas para facilitar a conversão)
    spentType?: { id: number };
}
