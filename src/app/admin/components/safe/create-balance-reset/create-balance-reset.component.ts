import { Component, Input, OnInit } from '@angular/core';
import { Payment } from 'src/app/account/models/payment';
import { DiscountTypeService } from 'src/app/account/services/discount-type.service';
import { StudentAccountService } from 'src/app/account/services/student-account.service';
import { AppModule } from 'src/app/app.module';
import { Auth } from 'src/app/shared/auth';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-balance-reset',
  templateUrl: './create-balance-reset.component.html',
  styleUrls: ['./create-balance-reset.component.scss']
})
export class CreateBalanceResetComponent implements OnInit {

  doc: any = document;
  isSubmitted: boolean = false;
  item: any = {};
  user: any = Auth.user();

  @Input() safeObject: any;
  @Input() updateStudent: any;

  requiredField: any = [
    'date',
    'value'
  ];


  constructor(
    private studentAccountService: StudentAccountService) { }

  reset() {
    this.item = {
      date: new Date().toISOString().substring(0, 10),
      student_id: this.safeObject.id
    };
  }

  validate() {
    let valid = true;
    this.requiredField.forEach(element => {
      if (!this.item[element])
        valid = false;
    });

    return valid;
  }

  canCreateBalanceReset() {
    return this.safeObject.current_balance > 0;
  }

  sendResource() {
    if (!this.validate())
      return Message.error(Helper.trans('fill all data'));

    this.isSubmitted = true;
    this.item.student_id = this.safeObject.id;
    this.studentAccountService.createStudentBalanceReset(this.item).subscribe((res: any) => {
      if (res.status == 1) {
        Message.success(res.message);
        this.updateStudent();
        this.reset();
      }
      else
        Message.error(res.message);

      this.isSubmitted = false;
    });
  }

  ngOnInit() {
    this.reset();
  }

}
