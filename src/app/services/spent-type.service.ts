import { Injectable } from '@angular/core';
import { SpentType } from '../models/spent-type';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SpentTypeService {

    accountId: number| null;

    apiUrlBaseTeste: string = 'assets/data/spent-type.json';
    apiUrlBase: string = environment.apiUrlBase + '/v1/api/spents-type';

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    getSpentTypes(): Observable<SpentType[]> {
        return this.http.get<SpentType[]>(this.apiUrlBaseTeste);
    }

    insertSpentType(description: string | null, color: string | null ): Observable<any> {

        const loggedUser = localStorage.getItem('logged_user');
        if (loggedUser) {
            const userObject = JSON.parse(loggedUser);
            this.accountId = userObject.account?.id;
            if (this.accountId) {
                const body = {
                    name: description,
                    color: color,
                    totalBankValue: 0.0,
                    accountId: this.accountId
                };

                const headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                });
                return this.http.post(this.apiUrlBase, body, { headers });
            } else {
                throw new Error('Account ID não encontrado.');
            }
        } else {
            throw new Error('Usuário não encontrado no localStorage.');
        }
    }

}
