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
  selector: 'app-create-discount-request',
  templateUrl: './create-discount-request.component.html',
  styleUrls: ['./create-discount-request.component.scss']
})
export class CreateDiscountRequestComponent implements OnInit {

  doc: any = AppModule.doc;
  isSubmitted: boolean = false;
  item: any = {};
  discountTypes: any = [];

  @Input() safeObject: any;
  @Input() updateStudent: any;

  requiredField: any = [
    'discount_type_id',
    'reason',
    'student_affairs_notes'
  ];


  constructor(
    private studentAccountService: StudentAccountService,
    private discountTypeService: DiscountTypeService) { }

  reset() {
    this.item = {};
  }

  validate() {
    let valid = true;
    this.requiredField.forEach(element => {
      if (!this.item[element])
        valid = false;
    });

    return valid;
  }

  sendResource() {
    if (!this.validate())
      return Message.error(Helper.trans('fill all data'));

    this.isSubmitted = true;
    this.item.student_id = this.safeObject.id;
    this.studentAccountService.createDiscountRequest(this.item).subscribe((res: any) => {
      if (res.status == 1) {
        Message.success(res.message);
        this.viewReceipt(res.data);
        this.updateStudent();
        this.reset();
      }
      else
        Message.error(res.message);

      this.isSubmitted = false;
    });
  }

  viewReceipt(resource: any) {
    if (!resource)
      return;
    let url = environment.apiUrl + "/account/discount_requests/receipt/"+resource.id+"?api_token="+Auth.getApiToken();
    Helper.openWindow(url);
  }

  loadDiscountTypes() {
    this.discountTypeService.get().subscribe((res: any) => {
      this.discountTypes = res;
    });
  }

  printLastReceipt() {
    if (this.safeObject.last_discount_request)  {
      this.viewReceipt(this.safeObject.last_discount_request);
    }
  }

  ngOnInit() {
    this.loadDiscountTypes();
  }

}
