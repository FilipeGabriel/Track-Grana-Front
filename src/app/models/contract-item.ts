export class ContractItem {

    description: string;
    itemValue: number;
    endDate: string;
    spentTypeId: number;
    monthlyContractsId: number;

    spentType?: { id: number };
}
