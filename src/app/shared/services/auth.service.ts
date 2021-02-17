import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  public static USER_PRFIX = 'user';
  public static API_TOKEN_PRFIX = 'api_token';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }
  public userStatus$ = new Subject<boolean>();

  public notifySubscribers(status: boolean) {
    this.userStatus$.next(status);
  }

  login(userLogin: any)  {
    let form = new FormData;
    form.append('phone', userLogin.phone);
    form.append('password', userLogin.password);
    return this.http.post('admin/sign', form);
  }

  confirmEmail(confirmEmail: { code: string }) {
    return this.http.post('admin/confirmEmail', confirmEmail);
  }

  isAuth() {
    return localStorage.getItem('AdminToken') !== null;
  }

  logOut() {
    this.removeAdminLoalStorage();
  }

  setAdminLoalStorage(AdminUser: any): void {
    localStorage.setItem('AdminToken', AdminUser.token);
    localStorage.setItem('AdminEmail', AdminUser.email);
    localStorage.setItem('AdminRole', AdminUser.role);
    localStorage.setItem('AdminName', AdminUser.name);
  }
  removeAdminLoalStorage(): void {
    localStorage.removeItem('AdminToken');
    localStorage.removeItem('AdminEmail');
    localStorage.removeItem('AdminRole');
    localStorage.removeItem('AdminName');
  }
  getToken(): string {
    return localStorage.getItem('AdminToken');
  }
}
