export class ContractItem {

    id: number;
    description: string;
    itemValue: number;
    endDate: string;
    spentTypeId: number;
    monthlyContractsId: number;
    invoiceId: number;

    spentType?: { id: number };
}
