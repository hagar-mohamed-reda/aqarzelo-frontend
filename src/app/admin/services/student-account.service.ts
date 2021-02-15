import { Auth } from './../../shared/auth';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentAccountService {

  constructor(private http: HttpClient) {
  }

  /**
   * get services from api
   *
   */
  public search(key: string) {
    return this.http.get('account/search_student?api_token=' + Auth.getApiToken()+"&key="+key);
  }

  /**
   * get services from api
   *
   */
  public getStudentAccount(studentId) {
    return this.http.get('account/get_student_account?api_token=' + Auth.getApiToken()+"&student_id="+studentId);
  }

  /**
   * update student installments
   *
   */
  public updateStudentInstallments(data: any) {
    return this.http.post('account/installment/update', data);
  }

  /**
   * update student installments
   *
   */
  public studentPay(data: any) {
    return this.http.post('account/pay', data);
  }

  /**
   * update student installments
   *
   */
  public sendNotes(data: any) {
    return this.http.post('account/write_notes', data);
  }

  /**
   * get available services for student
   *
   */
  public getAvailabeServices(studentId: number) {
    return this.http.get('account/get_available_services?api_token='+Auth.getApiToken()+'&student_id='+studentId);
  }

  /**
   * pay refund
   */
  public payRefund(data) {
    return this.http.post('account/pay-refund?api_token='+Auth.getApiToken(), data);
  }

  /**
   * pay refund
   */
  public payRemove(data) {
    return this.http.post('account/pay-remove?api_token='+Auth.getApiToken(), data);
  }

  /**
   * edit payment info
   */
  public editPayment(data) {
    return this.http.post('account/edit-payment?api_token='+Auth.getApiToken(), data);
  }

  /**
   * update student info
   */
  public updateStudentInfo(data) {
    return this.http.post('account/update_student_info?api_token='+Auth.getApiToken(), data);
  }

  /**
   * create discount request for the student
   */
  public createDiscountRequest(data) {
    return this.http.post('account/discount_requests/store?api_token='+Auth.getApiToken(), data);
  }

  /**
   * create discount request for the student
   */
  public createDiscount(data) {
    return this.http.post('account/discounts/store?api_token='+Auth.getApiToken(), data);
  }

  /**
   * get discount request for the student
   *
   * @param StudentId
   */
  public getDiscountsRequests(studentId) {
    return this.http.get('account/discount_requests?api_token='+Auth.getApiToken()+"&student_id="+studentId);
  }

  /**
   * remove discount request for the student
   *
   * @param StudentId
   */
  public removeDiscountRequest(id) {
    return this.http.post('account/discount_requests/delete/'+id+'?api_token='+Auth.getApiToken(), null);
  }

  /**
   * create balance reset for student
   *
   * @param data of balance reset
   */
  public createStudentBalanceReset(data) {
    return this.http.post('account/create_balance_reset?api_token='+Auth.getApiToken(), data);
  }
}
