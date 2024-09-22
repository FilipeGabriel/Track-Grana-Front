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

    constructor( private http: HttpClient ) { }

    insert(user: User): Observable<any> {
        return this.http.post(this.apiUrlBase, user)
    }

}
