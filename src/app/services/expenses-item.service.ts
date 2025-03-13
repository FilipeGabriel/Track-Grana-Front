import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpensesItem } from '../models/expenses-item';

@Injectable({
  providedIn: 'root'
})

export class ExpensesItemService {

    apiUrlBaseTeste: string = 'assets/data/expenses-item.json';

    constructor(private http: HttpClient) {}

    getExpensesItem(): Observable<ExpensesItem[]> {
        return this.http.get<ExpensesItem[]>(this.apiUrlBaseTeste);
    }

    // insertExpenseItem(expensesItem: any): Observable<any> {

    // }

}
