import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpensesItem } from '../models/expenses-item';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ExpensesItemService {

    apiUrlBase: string = environment.apiUrlBase + '/v1/api/expenses-items';

    constructor(private http: HttpClient) {}

    getExpenseItemById(itemId: number): Observable<ExpensesItem> {
        return this.http.get<ExpensesItem>(`${this.apiUrlBase}/${itemId}`);
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

    updateExpenseItem(itemId: number, expensesItem: ExpensesItem): Observable<any> {
        const body = {
            description: expensesItem.description,
            itemValue: expensesItem.itemValue,
            spentTypeId: expensesItem.spentTypeId,
        };
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http.put(`${this.apiUrlBase}/${itemId}`, body, { headers });
    }

    deleteExpense(itemId: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrlBase}/${itemId}`);
    }
}
