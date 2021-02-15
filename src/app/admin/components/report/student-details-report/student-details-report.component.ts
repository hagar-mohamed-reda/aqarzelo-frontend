import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { exit } from 'process';
import { Payment } from 'src/app/account/models/payment';
import { ReportService } from 'src/app/account/services/report.service';
import { StudentAccountService } from 'src/app/account/services/student-account.service';
import { StudentServiceService } from 'src/app/account/services/student-service.service';
import { AppModule } from 'src/app/app.module';
import { Auth } from 'src/app/shared/auth';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';

@Component({
  selector: 'app-student-details-report',
  templateUrl: './student-details-report.component.html',
  styleUrls: ['./student-details-report.component.scss']
})
export class StudentDetailsReportComponent implements OnInit {

  doc: any = document;
  student: any = {};
  searchData: any = {};
  payments: any = {};
  selectedPayment: any = {};
  discountRequests: any = [];


  //
  public searchKey: string;
  public studentSearchDialogShow = false;
  public studentSearchDialogLoader = false;
  public isWait = false;
  public timeoutId;
  public students: any = [];

  //
  academicYearExpenses: any = [];


  constructor(
    private studentAcountService: StudentAccountService,
    private reportService: ReportService,
    private studentService: StudentServiceService) {
    this.student = {image: '/assets/img/avatar.png'};
  }

  ngOnInit() {
    this.loadAcadeimicYearExpenses();
  }


  //***********************************************
  //*** student search methods
  //***********************************************
  //
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
    if (student) {
      this.searchData.student_id = student.id;
      this.searchKey = student.name;
      this.loadStuentInfo(student.id);
      this.loadPayments();
      this.loadStudentDiscounts(student.id);
    }
    this.studentSearchDialogShow = false;
  }

  loadStuentInfo(id) {
    this.studentAcountService.getStudentAccount(id).subscribe((res: any) => {
      this.student = res;
    });
  }

  loadPayments() {
    this.reportService.get(this.searchData).subscribe((res) => {
      this.payments = res;
      this.prepareTotal(res);
    });
  }


  prepareTotal(res: any) {
    this.academicYearExpenses.forEach(element => {
      element.total = res['academic_year_expense'][element.id];
    });

  }
  //***********************************************
  //*** report option methods
  //***********************************************


  calculateReportHeight() {
    return window.innerHeight - 80;
  }

  print() {
    Helper.print();
  }

  exportExcel() {
    const filename = "تقرير طالب تفصيلى-"+new Date().toLocaleTimeString();
    this.doc.exportExcel(filename);
  }

  showDiscountRequestModal() {
    this.doc.jquery('#discountShowModal').modal('show');
  }

  showStudentServiceModal() {
    this.doc.jquery('#studentServices').modal('show');
  }

  showProfileModal() {
    this.doc.jquery('#profileModal').modal('show');
  }

  showPayment(element) {
    this.selectedPayment = element;
    this.doc.jquery('#paymentShowModal').modal('show');
  }

  printPayment() {
    Payment.viewReceipt(this.selectedPayment.id);
  }

  //***********************************************
  //*** report data method
  //***********************************************

  loadAcadeimicYearExpenses() {
    this.studentService.get().subscribe((res: any) => {
      this.academicYearExpenses = [];
      res.forEach(element => {
        if (element.is_academic_year_expense == 1) {
          this.academicYearExpenses.push(element);
        }
      });
    });
  }

  loadStudentDiscounts(studentId) {
    this.studentAcountService.getDiscountsRequests(studentId).subscribe((res: any) => {
       this.discountRequests = res;
    });
  }

  performDiscount(item) {
    if (item.value <= 0) {
      return Message.error(Helper.trans('enter valid value'));
    }
    this.studentAcountService.createDiscount(item).subscribe((res: any) => {
      if (res.status == 1) {
        Message.success(res.message);
        item.paid = 1;
      }
      else {
        Message.error(res.message);
      }
    });
  }

  removeDiscount(item) {
    this.doc.swal.confirm(Helper.trans('are you sure'), ()=>{
      this.studentAcountService.removeDiscountRequest(item.id).subscribe((res: any) => {
        if (res.status == 1) {
          Message.success(res.message);
          item.deleted = 1;
        }
        else {
          Message.error(res.message);
        }
      });
    });
  }
}
