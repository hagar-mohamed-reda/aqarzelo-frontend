import { Injectable } from '@angular/core';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { Auth } from '../../shared/auth';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public static STORE_SERVICE_PREFIX = 'store';

  constructor(private http: HttpClient) {
  }

  /**
   * get services from api
   *
   */
  public get() {
    return this.http.get('account/stores?api_token=' + Auth.getApiToken());
  }

  /**
   * store new service
   */
  public store(data: any) { 
    return this.http.post('account/stores/store' + '?api_token=' + Auth.getApiToken(), data);
  }

  /**
   * update service
   */
  public update(data: any) { 
    return this.http.post('account/stores/update/' + data.id + '?api_token=' + Auth.getApiToken(), data);
  }

  /**
   * remove service
   */
  public destroy(id) { 
    return this.http.post('account/stores/delete/' + id + '?api_token=' + Auth.getApiToken(), null);
  }
}
