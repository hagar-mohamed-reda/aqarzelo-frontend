import { Component, OnInit, SimpleChanges, OnChanges, Input } from '@angular/core';
import { HashTable } from 'angular-hashtable';
import { StudentAccountService } from 'src/app/account/services/student-account.service';
import { AppModule } from 'src/app/app.module';
import { Message } from 'src/app/shared/message';

@Component({
  selector: 'app-safe-setting',
  templateUrl: './safe-setting.component.html',
  styleUrls: ['./safe-setting.component.scss']
})
export class SafeSettingComponent implements OnInit {

  public doc: any = AppModule.doc;
  @Input() safeObject: any;


  constructor(private studentAccountService: StudentAccountService) { }

  updateSetting(item) {
    this.studentAccountService.updateStudentInfo(item).subscribe((res: any)=>{
      if (res.status == 1)
        Message.success(res.message);
    });
  }

  toggleIsRefund() {
    if (this.safeObject.is_refund == 1)
      this.safeObject.is_refund = 0;
    else
      this.safeObject.is_refund = 1;

    let data = {
      student_id: this.safeObject.id,
      is_refund: this.safeObject.is_refund
    };
    this.updateSetting(data);
  }

  ngOnInit() {
  }


}
