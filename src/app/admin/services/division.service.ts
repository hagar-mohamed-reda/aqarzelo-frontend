import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../../shared/auth';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  public static DIVISION_PREFIX = 'divisions';

  constructor(private http: HttpClient) {
  }

  /**
   * get academic_year_expenses from api
   *
   */
  public get() {
    return this.http.get('account/divisions?api_token=' + Auth.getApiToken());
  }
}
