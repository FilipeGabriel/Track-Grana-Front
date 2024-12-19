import { Account } from "./account";

export class UserComplete {
    email: string;
    password: string;
    registrationDate: string;
    account: Account;

    constructor(email: string, registrationDate: string, account: Account) {
        this.email = email;
        this.registrationDate = registrationDate;
        this.account = account;
    }
}
