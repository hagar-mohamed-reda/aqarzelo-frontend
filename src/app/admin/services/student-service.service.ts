import { Auth } from './../../shared/auth';
import { environment } from './../../../environments/environment';
import { IService } from './../models/iservice';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cache } from 'src/app/shared/cache';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  public static STUDENT_SERVICE_PREFIX = 'student_services';

  constructor(private http: HttpClient) {
  }

  /**
   * get services from api
   *
   */
  public get() {
    return this.http.get('account/services?api_token=' + Auth.getApiToken());
  }

  /**
   * store new service
   */
  public store(data: any) {
    // remove old cache
    Cache.remove(StudentServiceService.STUDENT_SERVICE_PREFIX);
    return this.http.post('account/services/store' + '?api_token=' + Auth.getApiToken(), data);
  }

  /**
   * update service
   */
  public update(data: any) {
    // remove old cache
    Cache.remove(StudentServiceService.STUDENT_SERVICE_PREFIX);
    return this.http.post('account/services/update/' + data.id + '?api_token=' + Auth.getApiToken(), data);
  }

  /**
   * remove service
   */
  public destroy(id) {
    // remove old cache
    Cache.remove(StudentServiceService.STUDENT_SERVICE_PREFIX);
    return this.http.post('account/services/delete/' + id + '?api_token=' + Auth.getApiToken(), null);
  }

}
