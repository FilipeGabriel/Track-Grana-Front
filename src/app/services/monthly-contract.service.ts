import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MonthlyContract } from '../models/monthly-contract';
import { environment } from '../../environments/environment';
import { ContractItem } from '../models/contract-item';

@Injectable({
  providedIn: 'root'
})

export class MonthlyContractService {

    apiUrlBase: string = environment.apiUrlBase + '/v1/api/contract-items';

    constructor(private http: HttpClient) {}

    getContractItemById(itemId: number): Observable<ContractItem> {
        return this.http.get<ContractItem>(`${this.apiUrlBase}/${itemId}`);
    }

    insertContractItem(contractItem: ContractItem): Observable<any> {
        const body = {
            description: contractItem.description,
            itemValue: contractItem.itemValue,
            endDate: contractItem.endDate,
            spentTypeId: contractItem.spentTypeId,
            monthlyContractsId: contractItem.monthlyContractsId,
            invoiceId: contractItem.invoiceId
        };
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http.post(`${this.apiUrlBase}`, body, { headers });
    }

    updateContractItem(itemId: number, contractItem: ContractItem): Observable<any> {
        const body = {
            description: contractItem.description,
            itemValue: contractItem.itemValue,
            endDate: contractItem.endDate,
            spentTypeId: contractItem.spentTypeId,
        };
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http.put(`${this.apiUrlBase}/${itemId}`, body, { headers });
    }

    deleteContract(itemId: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrlBase}/${itemId}`);
    }

}
