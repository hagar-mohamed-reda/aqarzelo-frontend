import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IReqRegisterationStatus } from './IReqRegisterationStatus';
import { Auth } from '../../shared/auth';

@Injectable({
    providedIn: 'root'
  })

  export class RegisterationService {

    constructor(private http: HttpClient) { }

    public shareData:any;

    public getAll() : Observable<any> {
        return this.http.get(`registration-status?api_token=` + Auth.getApiToken());
    }

    public update(data): Observable<any> {
        return this.http.put(`registration-status/${data.id}?api_token=` + Auth.getApiToken(), data);
    }

    public create(data){
        return this.http.post(`registration-status?api_token=` + Auth.getApiToken(), data);
    }

    public delete(id){
      return this.http.delete(`registration-status/${id}?api_token=` + Auth.getApiToken());
    }

    public updateRequierdDocument(id, data){
      return this.http.post(`registration-status/document/${id}?api_token=` + Auth.getApiToken(), data);
    }

}
