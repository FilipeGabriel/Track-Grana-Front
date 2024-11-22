import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

    apiUrlBase: string = environment.apiUrlBase + '/v1/api/users';
    tokenUrl: string = environment.apiUrlBase + environment.getTokenUrl;

    constructor( private http: HttpClient ) { }

    insert(user: User): Observable<any> {
        return this.http.post(this.apiUrlBase, user)
    }

    tryLogin(user: User): Observable<any> {
        return this.http.post(this.tokenUrl, user)
    }

}
