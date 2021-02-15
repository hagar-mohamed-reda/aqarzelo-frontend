import { Component, OnInit, Input } from '@angular/core';
import { AppModule } from '../../../../app.module';
import { Auth } from '../../../../shared/auth';
import { Message } from '../../../../shared/message';
import { Helper } from '../../../../shared/helper';
import { DiscountTypeService } from 'src/app/account/services/discount-type.service';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-daily-form',
  templateUrl: './daily-form.component.html',
  styleUrls: ['./daily-form.component.scss']
})
export class DailyFormComponent implements OnInit {


  public doc: any = AppModule.doc;

  public isSubmitted = false;

  @Input() updateResources: any;
  @Input() updateMode: any = false;
  @Input() item: any = {};

  helper: any = Helper;
  banks: any = [];
  stores: any = [];


  constructor(private globalService: GlobalService) {
    this.reset();
  }

  reset() {
    if (this.updateMode)
      return;
    this.item = {
      value: 0
    };
  }

  validate() {
    let valid = true;
    if (!Helper.validator(this.item, ['date', 'type', 'value']))
      valid = false;

    if (this.item == 'bank' && !this.item.bank_id)
      valid = false;
    if (this.item == 'store' && !this.item.store_id)
      valid = false;

    return valid;
  }

  ngOnInit() {
    this.globalService.get('account/banks').subscribe((res) => {
      this.banks = res;
    });
    this.globalService.get('account/stores').subscribe((res) => {
      this.stores = res;
    });
  }

  sendResource() {
    console.log(this.item);
    if (this.updateMode)
      this.updateResource();
    else
      this.addResource();
  }

  addResource() {
    if (!this.validate())
      return Message.error('please fill all data');

    this.isSubmitted = true;
    this.globalService.store("account/dailys/store", Helper.toFormData(this.item)).subscribe((res) => {
      const r: any = res;
      if (r.status == 1) {
        Message.success(r.message);
      }
      else
        Message.error(r.message);

      if (r.status == 1) {
        this.reset();
        this.updateResources();
      }

      this.isSubmitted = false;
    });
  }

  updateResource() {
    if (!this.validate())
      return Message.error('please fill all data');

    this.isSubmitted = true;
    this.globalService.update("account/dailys/update/"+this.item.id, Helper.toFormData(this.item)).subscribe((res) => {
      const r: any = res;
      if (r.status == 1) {
        Message.success(r.message);
      }
      else
        Message.error(r.message);

      if (r.status == 1) {
        this.updateResources();
      }

      this.isSubmitted = false;
    });
  }
}
