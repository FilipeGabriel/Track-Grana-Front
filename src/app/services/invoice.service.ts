import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

    constructor(private http: HttpClient) {}

    getInvoices(): Observable<Invoice[]> {
      return this.http.get<Invoice[]>('assets/data/invoice.json');
    }
}
