import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class InvoiceService {

    accountId: number| null;

    apiUrlBaseTeste: string = 'assets/data/invoice.json'
    apiUrlBase: string = environment.apiUrlBase + '/v1/api/invoices';

    constructor(
        private toastr: ToastrService,
        private http: HttpClient
    ) {}

    getInvoices(): Observable<Invoice[]> {
        return this.http.get<Invoice[]>(this.apiUrlBaseTeste);
    }

    insertInvoice(month:number | null, year: number | null): Observable<any> {

        let monthYear: string | null;
        if(month != null) {
            monthYear = `01/${month < 10 ? '0' + month : month}/${year}`;
        } else {
            this.toastr.error('A data não pode ser nula');
            throw new Error('A data não pode ser nula');
        }

        const loggedUser = localStorage.getItem('logged_user');
        if (loggedUser) {
            const userObject = JSON.parse(loggedUser);
            this.accountId = userObject.account?.id;
            if (this.accountId) {
                const body = {
                    monthYear: monthYear,
                };

                const headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                });

                return this.http.post(`${this.apiUrlBase}/${this.accountId}`, body, { headers });
            } else {
                throw new Error('Account ID não encontrado.');
            }
        } else {
            throw new Error('Usuário não encontrado no localStorage.');
        }

    }

}
