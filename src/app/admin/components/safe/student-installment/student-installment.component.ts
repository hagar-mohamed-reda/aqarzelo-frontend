import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { AppModule } from '../../../../app.module';

@Component({
  selector: 'app-student-installment',
  templateUrl: './student-installment.component.html',
  styleUrls: ['./student-installment.component.scss']
})
export class StudentInstallmentComponent implements OnInit, OnChanges {

  public total = 0;
  public doc: any = AppModule.doc;

  @Input() installments: any[];

  @Input() showStudentInstallment: boolean;
  constructor() { }

  calculateTotal() {
    this.total = 0;
    this.installments.forEach(element => {
      this.total += element.value;
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateTotal();
  }


}
