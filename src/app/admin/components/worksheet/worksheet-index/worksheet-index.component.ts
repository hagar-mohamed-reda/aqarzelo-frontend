import { Component, OnInit } from '@angular/core';
import { Helper } from 'src/app/shared/helper';

@Component({
  selector: 'app-worksheet-index',
  templateUrl: './worksheet-index.component.html',
  styleUrls: ['./worksheet-index.component.scss']
})
export class WorksheetIndexComponent implements OnInit {

  doc: any = document;
  constructor() { }

  ngOnInit() {
  }


  excel() {
    this.doc.exportExcel();
  }

  print() {
    this.doc.printJs();
  }

}
