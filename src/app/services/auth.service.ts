import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})

export class AuthService {

    apiUrlBase: string = environment.apiUrlBase + '/v1/api/users';
    apiUrlRegister: string = environment.apiUrlBase + environment.registerUrl;
    tokenUrl: string = environment.apiUrlBase + environment.getTokenUrl;
    jwtHelper: JwtHelperService = new JwtHelperService();

    private userImageSubject = new BehaviorSubject<string | ArrayBuffer | null>(null);
    userImage$: Observable<string | ArrayBuffer | null> = this.userImageSubject.asObservable();

    constructor( private http: HttpClient ) { }

    insert(user: User): Observable<any> {
        return this.http.post(this.apiUrlRegister, user);
    }

    tryLogin(user: User): Observable<any> {
        return this.http.post(this.tokenUrl, user);
    }

    updatePassword(user: { password: string, newPassword: string }): Observable<any> {
        return this.http.put(`${this.apiUrlBase}/${this.getUserId()}`, user);
    }

    getUserById(): Observable<any> {
        return this.http.get<any>(`${this.apiUrlBase}/${this.getUserId()}`);
    }

    logout(): void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('logged_user');
        localStorage.removeItem('selected_year');
    }

    getToken(): string | null {
        return localStorage.getItem('access_token');
    }

    getUserId(): string | null {
        return localStorage.getItem('user_id');
    }

    getSelectedYear(): string | null {
        return localStorage.getItem('selected_year');
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        if ( token ) {
            const expired = this.jwtHelper.isTokenExpired(token);
            return !expired;
        }
        return false;
    }

    updateUserImage(newImageUrl: string | ArrayBuffer | null) {
        this.userImageSubject.next(newImageUrl);
    }

}
