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

    insertContractItem(contractItem: ContractItem): Observable<any> {
        const body = {
            description: contractItem.description,
            itemValue: contractItem.itemValue,
            endDate: contractItem.endDate,
            spentTypeId: contractItem.spentTypeId,
            monthlyContractsId: contractItem.monthlyContractsId
        };
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http.post(`${this.apiUrlBase}`, body, { headers });
    }

}
