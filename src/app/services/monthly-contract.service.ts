import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MonthlyContract } from '../models/monthly-contract';

@Injectable({
  providedIn: 'root'
})

export class MonthlyContractService {

    apiUrlBase: string = 'assets/data/monthly-contract.json';

    constructor(private http: HttpClient) {}

    getMonthlyContracts(): Observable<MonthlyContract[]> {
        return this.http.get<MonthlyContract[]>(this.apiUrlBase);
    }

}
