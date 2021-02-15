import { StudentAccountService } from './../../../services/student-account.service';
import { Component, OnInit } from '@angular/core';
import { Payment } from '../../../models/payment';
import { Message } from '../../../../shared/message';
import { Auth } from '../../../../shared/auth';
import { Helper } from '../../../../shared/helper';
import { AppModule } from '../../../../app.module';
import { SafeMsgBuilder } from '../../../helpers/safe-msg-builder';
import { ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import { HashTable } from 'angular-hashtable';

@Component({
  selector: 'app-safe-index',
  templateUrl: './safe-index.component.html',
  styleUrls: ['./safe-index.component.scss']
})
export class SafeIndexComponent implements OnInit {

  // init document
  public doc: any = document;

  public safeObject: any = {};
  public payment: Payment;
  public searchKey: string;
  public studentSearchId;
  public availableServices: any;

  public studentSearchDialogShow = false;
  public studentSearchDialogLoader = false;
  public showStudentInstallment = false;
  public isWait = false;
  public timeoutId;
  public students: any = [];
  public isStudentSayed = false;
  public updateStudent: any;

  public selectedServices = new HashTable<any, any>();

  constructor(private studentAcountService: StudentAccountService, private route: ActivatedRoute) {
    this.init();
    this.initSafeObject();
    const id = this.route.snapshot.params['id'];
    if (id > 0) {
      this.loadStudentAccountInfo(id);
    }
  }

  init() {
    this.updateStudent = () => {
      this.updateStudentAction();
      this.selectedServices = new HashTable<any, any>();
    };
  }

  initSafeObject() {
    // set default image
    this.safeObject.image = '/assets/img/avatar.png';
    this.safeObject.notes = 'some notes here';
    this.safeObject.level = {};
    this.safeObject.case_constraint = {};
    this.safeObject.constraint_status = {};
    this.safeObject.paid_value = 0;
    this.safeObject.division = {};
  }

  searchInputEvent() {
    if (!this.searchKey)
      return;

    this.students = [];
    this.studentSearchDialogLoader = true;
    this.isWait = true;
    clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(() => {
       this.searchAboutStudent();
    }, 500);
  }

  searchAboutStudent() {
    this.studentAcountService.search(this.searchKey).subscribe((r) => {
        this.studentSearchDialogLoader = false;
        this.students = r;
        if (this.students.length > 0) {
          this.studentSearchDialogShow = true;
        }
    });
  }

  selectStudent(student) {
    this.studentSearchDialogShow = false;
    this.searchKey = student.name;
    this.studentSearchId = student.id;
    //
    this.loadStudentAccountInfo(student.id);
  }

  loadStudentAccountInfo(id) {
    if (!id)
      return Message.error('search about student first');
    this.studentAcountService.getStudentAccount(id).subscribe((r: any) => {
      if (this.safeObject.id != r.id)
        this.isStudentSayed = false;

      this.safeObject = r;
      this.buildSafeMsg();
      this.studentSearchId = this.safeObject.id;

      if (!this.safeObject.old_balance)
        this.safeObject.old_balance = 0;

      if (!this.safeObject.current_balance)
        this.safeObject.current_balance = 0;

      if (!this.safeObject.paid_value)
        this.safeObject.paid_value = 0;

      if (!this.safeObject.image)
        this.safeObject.image = '/assets/img/avatar.png';
      this.loadAvailableServices();

      this.alertForOldBalance();
    });
  }

  updateStudentAction() {
    if (this.safeObject)
      if (this.safeObject.id)
        this.loadStudentAccountInfo(this.safeObject.id);
  }

  /**
   * perform payment
   */
  performPay() {
    Message.confirm(Helper.trans('are_you_sure'), ()=>{
      this.payment = new Payment(this.safeObject, this.studentAcountService, ()=>{
        this.updateStudent();
      });
      return this.payment.pay();
    });
  }

  /**
   *  load available services for student
   */
  loadAvailableServices() {
    if(this.safeObject.id) {
      this.studentAcountService.getAvailabeServices(this.safeObject.id).subscribe((r) => {
        this.availableServices = r;
      });
    }
  }

  buildSafeMsg() {
    return;
    if (this.isStudentSayed)
      return;

    let builder = new SafeMsgBuilder();
    builder
      .setGender(this.safeObject.gender)
      .setName(this.safeObject.name)
      //.setCode(this.safeObject.code)
      .setLevel(this.safeObject.level? this.safeObject.level.name : null)
      .setDivision(this.safeObject.division? this.safeObject.division.name : null)
      .setOldBalance(this.safeObject.old_balance)
      .setCurrentBalance(this.safeObject.current_balance)
      .setPaidValue(this.safeObject.paid_value)
      .say();
    this.isStudentSayed = true;
  }

  getSelectedServices() {

  }

  alertForOldBalance() {
    if (this.safeObject.old_balance > 0) {
      let message = 'تنيه يوجد رسوم سابقه على الطالب بقيمة ' + this.safeObject.old_balance;
      this.doc.Swal.fire({title: message});
    }
  }

  ngOnInit() {
  }

}
