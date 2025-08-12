import { Injectable } from '@angular/core';
import { SpentType } from '../models/spent-type';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SpentTypeService {

    accountId: number| null;

    apiUrlBase: string = environment.apiUrlBase + '/v1/api/spents-type';
    apiUrlBaseAll: string = environment.apiUrlBase + '/v1/api/spents-type/find-all';

    constructor(
        private http: HttpClient
    ) {}

    getAllSpentsType(): Observable<SpentType[]> {
        return this.http.get<SpentType[]>(`${this.apiUrlBaseAll}/${this.getAccountId()}`);
    }

    insertSpentType(description: string | null, color: string | null ): Observable<any> {

        const body = {
            name: description,
            color: color,
            accountId: this.getAccountId()
        };
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http.post(this.apiUrlBase, body, { headers });

    }

    updateSpentTypeNameColor(spentType: SpentType): Observable<SpentType> {
        const body = {
            name: spentType.name,
            color: spentType.color,
            paid: spentType.paid
        };
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http.put<SpentType>(`${this.apiUrlBase}/${spentType.id}`, body, { headers });
    }

    getAccountId() {
        const loggedUser = localStorage.getItem('logged_user');
        if (loggedUser) {
            const userObject = JSON.parse(loggedUser);
            this.accountId = userObject.account?.id;
            return this.accountId;
        } else {
            throw new Error('Account ID não encontrado.');
        }
    }

}
