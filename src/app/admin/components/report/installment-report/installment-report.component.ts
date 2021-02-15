import { Component, OnInit } from '@angular/core';
import { exit } from 'process';
import { ReportService } from 'src/app/account/services/report.service';
import { Auth } from 'src/app/shared/auth';
import { Helper } from 'src/app/shared/helper';

@Component({
  selector: 'app-installment-report',
  templateUrl: './installment-report.component.html',
  styleUrls: ['./installment-report.component.scss']
})
export class InstallmentReportComponent implements OnInit {

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
    this.reportService.getStudentInstallment(this.searchData).subscribe((res) => {
      this.response = res;
      this.isSubmitted = false;
    });
  }

  print() {
    Helper.print();
  }

  exportExcel() {
    const filename = "تقرير اقساط الطلاب-"+new Date().toLocaleTimeString();
    this.doc.exportExcel(filename);
  }

  toggle(value) {
    this.searchData.type != value? this.searchData.type = value : this.searchData.type = 'all_installment';
  }

}
