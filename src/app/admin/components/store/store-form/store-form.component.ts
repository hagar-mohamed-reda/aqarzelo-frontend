import { Component, OnInit, Input } from '@angular/core';
import { AppModule } from '../../../../app.module'; 
import { Auth } from '../../../../shared/auth'; 
import { Message } from '../../../../shared/message';
import { Helper } from '../../../../shared/helper';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.scss']
})
export class StoreFormComponent implements OnInit {

  public doc: any = AppModule.doc;

  public isSubmitted = false;
 
  @Input() updateResources: any; 
  @Input() updateMode: any = false; 
  @Input() item: any = {};
 

  constructor(private storeService: StoreService) {
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
    if (
      !this.item.name || 
      this.item.init_balance < 0    
    )
      valid = false;
    return valid;
  }

  ngOnInit() { 
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
    this.storeService.store(this.item).subscribe((res) => {
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
    this.storeService.update(this.item).subscribe((res) => {
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
