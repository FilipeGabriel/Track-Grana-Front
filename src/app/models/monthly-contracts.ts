import { Account } from "./account";
import { ContractItem } from "./contract-item";

export class MonthlyContracts {

    id: number;
    totalMonthlyContractsValue: number;
    contractItems: ContractItem[];
    account: Account;

}
