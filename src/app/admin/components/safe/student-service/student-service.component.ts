import { Component, OnInit, SimpleChanges, OnChanges, Input } from '@angular/core';
import { AppModule } from '../../../../app.module';

@Component({
  selector: 'app-student-service',
  templateUrl: './student-service.component.html',
  styleUrls: ['./student-service.component.scss']
})
export class StudentServiceComponent implements OnInit {

  public total = 0;
  public doc: any = AppModule.doc;

  @Input() safeObject: any;

  constructor() { }

  calculateTotal() {
    this.total = 0;
    if (this.safeObject) {
      if (this.safeObject.payments) {
        this.safeObject.payments.forEach(element => {
          if (element.model_type == 'service')
            this.total += element.value;
        });
      }
    }
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateTotal();
  }

}
