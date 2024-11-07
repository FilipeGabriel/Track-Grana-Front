import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

    apiUrlBase: string = 'assets/data/account.json';

    constructor(private http: HttpClient) {}

    getAccount(): Observable<Account> {
        return this.http.get<Account>(this.apiUrlBase);
    }

}
