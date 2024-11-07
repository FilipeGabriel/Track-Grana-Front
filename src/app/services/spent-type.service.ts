import { Injectable } from '@angular/core';
import { SpentType } from '../models/spent-type';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpentTypeService {

    apiUrlBase: string = 'assets/data/spent-type.json';

    constructor(private http: HttpClient) {}

    getSpentTypes(): Observable<SpentType[]> {
      return this.http.get<SpentType[]>(this.apiUrlBase);
    }

}
