import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpensesItem } from '../models/expenses-item';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ExpensesItemService {

    apiUrlBaseTeste: string = 'assets/data/expenses-item.json';
    apiUrlBase: string = environment.apiUrlBase + '/v1/api/expenses-items';

    constructor(private http: HttpClient) {}

    getExpensesItem(): Observable<ExpensesItem[]> {
        return this.http.get<ExpensesItem[]>(this.apiUrlBaseTeste);
    }

    insertExpenseItem(expensesItem: ExpensesItem): Observable<any> {
        const body = {
            description: expensesItem.description,
            installment: expensesItem.installment,
            itemValue: expensesItem.itemValue,
            spentTypeId: expensesItem.spentTypeId,
            monthlyExpensesId: expensesItem.monthlyExpensesId
        };
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http.post(`${this.apiUrlBase}`, body, { headers });
    }
}
