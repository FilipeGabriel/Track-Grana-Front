import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice';

@Injectable({
  providedIn: 'root'
})

export class InvoiceService {

    apiUrlBase: string = 'assets/data/invoice.json'

    constructor(private http: HttpClient) {}

    getInvoices(): Observable<Invoice[]> {
        return this.http.get<Invoice[]>(this.apiUrlBase);
    }
}
