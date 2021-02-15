import { Component, OnInit, SimpleChanges, OnChanges, Input } from '@angular/core';
import { Payment } from 'src/app/account/models/payment';
import { StudentAccountService } from 'src/app/account/services/student-account.service';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { AppModule } from '../../../../app.module';

@Component({
  selector: 'app-pay-refund',
  templateUrl: './pay-refund.component.html',
  styleUrls: ['./pay-refund.component.scss']
})
export class PayRefundComponent implements OnInit {

  public total = 0;
  public doc: any = AppModule.doc;
  public isSubmitted = false;

  @Input() payments: any[];
  @Input() updateStudent: any;

  constructor(private service: StudentAccountService) { }

  calculateTotal() {
    this.total = 0;
    this.payments.forEach(element => {
      this.total += element.value;
    });
  }

  prePayments(pays: any[]) {
    let prePays = [];
    pays.forEach(element => {
      let valid = true;
      if (element.model_type == 'service') {
        if (element.model_object) {
          if (element.model_object.is_refund != 1) {
            valid = false;
          }
        }
      }

      if (element.model_type == 'refund') {
        valid = false;
      }

      if (valid)
        prePays.push(element);
    });

    return prePays;
  }

  performRefund(payment) {
    this.doc.swal.confirm(Helper.trans('are you sure'), () => {
      let data = {
        payment_id: payment.id
      };
      this.isSubmitted = true;
      this.service.payRefund(data).subscribe((res: any)=>{
        if (res.status == 1) {
          Message.success(res.message);
          Payment.loadReceipts(res.data);
          this.updateStudent();
        } else {
          Message.error(res.message);
        }
        this.isSubmitted = false;
      });
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateTotal();
  }
}
