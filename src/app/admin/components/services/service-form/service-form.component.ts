import { ServiceIndexComponent } from './../service-index/service-index.component';
import { StudentServiceService } from './../../../services/student-service.service';
import { IService } from './../../../models/iservice';
import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../../../shared/message';
import { AppModule } from '../../../../app.module';
import { ApplicationSettingService } from '../../../../adminision/services/application-setting.service';
import { DivisionService } from '../../../services/division.service';
import { Cache } from '../../../../shared/cache';
import { LevelService } from '../../../services/level.service';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss']
})
export class ServiceFormComponent implements OnInit {

  public doc: any = AppModule.doc;
  public applicationSettings = ApplicationSettingService;

  public isSubmitted = false;

  @Input() updateResources: any;
  @Input() updateMode: any = false;
  @Input() item: any = {};


  public levels: any;
  public divisions: any;
  public stores: any;

  constructor(private studentService: StudentServiceService, private storeService: StoreService) {
    this.reset();
  }

  reset() {
    if (this.updateMode)
      return;
    this.item = {
      value: 0,
      active: true
    };
  }

  validate() {
    let valid = true;
    if (
      !this.item.name ||
      !this.item.store_id ||
      !this.item.type
    )
      valid = false;
    return valid;
  }

  ngOnInit() {
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
    this.divisions = Cache.get(DivisionService.DIVISION_PREFIX);
    this.storeService.get().subscribe((res)=>{
      this.stores = res;
    });
  }

  sendResource() {
    if (this.updateMode)
      this.updateResource();
    else
      this.addResource();
  }

  addResource() {
    if (!this.validate())
      return Message.error('please fill all data');

    this.isSubmitted = true;
    this.studentService.store(this.item).subscribe((res) => {
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
    this.studentService.update(this.item).subscribe((res) => {
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
