import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/account';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

    apiUrlBase: string = environment.apiUrlBase + '/v1/api/accounts';

    constructor(private http: HttpClient) {}

    getAccount(): Observable<Account> {
        return this.http.get<Account>(this.apiUrlBase);
    }

    insertAccount(account: Account): Observable<Account> {
        return this.http.post<Account>(this.apiUrlBase, account);
    }

}
