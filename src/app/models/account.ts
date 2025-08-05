import { MonthlyContracts } from "./monthly-contracts";

export class Account {

    id: string;
    userName: string;
    name: string;
    cpf: string;
    telephone: string;
    birthDate: string;
    accountImage: string | ArrayBuffer | null;
    userId: string | null;
    monthlyContracts: MonthlyContracts;

}
