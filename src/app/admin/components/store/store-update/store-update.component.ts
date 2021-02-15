import { Component, OnInit, Input } from '@angular/core';
import { AppModule } from '../../../../app.module'; 
import { Auth } from '../../../../shared/auth'; 
import { Message } from '../../../../shared/message';
import { Helper } from '../../../../shared/helper';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-store-update',
  templateUrl: './store-update.component.html',
  styleUrls: ['./store-update.component.scss']
})
export class StoreUpdateComponent implements OnInit {

  public doc = AppModule.doc;
  public isSubmitted = false;

  @Input() updateResources: any;
  @Input() resource: any = {};

  constructor(private storeService: StoreService) { }

  ngOnInit() {
  }

  validate() {
    if (!this.resource.name || !this.resource.type)
      return false;
    
    return true;
  }

  updateResource() {
    if (!this.validate())
      return Message.error(Helper.trans('fill all required data'));

    this.isSubmitted = true;
    this.resource.api_token = Auth.getApiToken();
    this.storeService.update(this.resource).subscribe((res) => {
      const data: any = res;
      if (data.status == 1) {
        Message.success(data.message); 
        //this.updateResources();
      }
      else
        Message.error(data.message);

      this.isSubmitted = false;
    });
  }

}
