import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})

export class AuthService {

    apiUrlBase: string = environment.apiUrlBase + '/v1/api/users';
    apiUrlRegister: string = environment.apiUrlBase + environment.registerUrl;
    tokenUrl: string = environment.apiUrlBase + environment.getTokenUrl;
    jwtHelper: JwtHelperService = new JwtHelperService();

    constructor( private http: HttpClient, private router: Router ) { }

    insert(user: User): Observable<any> {
        return this.http.post(this.apiUrlRegister, user)
    }

    tryLogin(user: User): Observable<any> {
        return this.http.post(this.tokenUrl, user)
    }

    getUserById(id: string | null): Observable<any> {
        return this.http.get<any>(`${this.apiUrlBase}/${id}`);
    }

    logout(): void {
        localStorage.removeItem('access_token')
        localStorage.removeItem('user_id')
    }

    getToken(): string | null {
        return localStorage.getItem('access_token');
    }

    getUserId(): string | null {
        return localStorage.getItem('user_id');
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        if ( token ) {
            const expired = this.jwtHelper.isTokenExpired(token);
            return !expired;
        }
        return false;
    }

}
