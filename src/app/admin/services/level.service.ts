import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../../shared/auth';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  public static LEVEL_PREFIX = 'levels';

  constructor(private http: HttpClient) {
  }

  /**
   * get academic_year_expenses from api
   *
   */
  public get() {
    return this.http.get('account/levels?api_token=' + Auth.getApiToken());
  }
}
