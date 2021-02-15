import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from 'src/app/shared/auth';

@Injectable({
  providedIn: 'root'
})
export class AccountSettingService {

  constructor(private http: HttpClient) {
  }

  /**
   * get academic_year_expenses from api
   *
   */
  public get() {
    return this.http.get('account/get_settings?api_token='+Auth.getApiToken());
  }

  /**
   * store new service
   */
  public update(data) {
    // remove old cache
    return this.http.post('account/update_setting' + '?api_token=' + Auth.getApiToken(), data);
  }
}
