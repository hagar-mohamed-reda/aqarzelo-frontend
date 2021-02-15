import { Component, OnInit } from '@angular/core';
import { exit } from 'process';
import { ReportService } from 'src/app/account/services/report.service';
import { Auth } from 'src/app/shared/auth';
import { Helper } from 'src/app/shared/helper';

@Component({
  selector: 'app-student-discount-report',
  templateUrl: './student-discount-report.component.html',
  styleUrls: ['./student-discount-report.component.scss']
})
export class StudentDiscountReportComponent implements OnInit {

  doc: any = document;
  searchData: any = {};
  response: any = {};
  isSubmitted = false;

  constructor(private reportService: ReportService) {
    this.response = {
      details: []
    };
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isSubmitted = true;
    this.reportService.getStudentDiscounts(this.searchData).subscribe((res) => {
      this.response = res;
      this.isSubmitted = false;
    });
  }

  print() {
    Helper.print();
  }

  exportExcel() {
    const filename = "تقرير اعفاءات الطلاب-"+new Date().toLocaleTimeString();
    this.doc.exportExcel(filename);
  }

  toggle(value) {
    this.searchData.type != value? this.searchData.type = value : this.searchData.type = 'all_installment';
  }

}
