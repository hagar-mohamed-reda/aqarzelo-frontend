import { Component, OnInit, SimpleChanges, OnChanges, Input } from '@angular/core';
import { HashTable } from 'angular-hashtable';
import { AppModule } from 'src/app/app.module';

@Component({
  selector: 'app-available-service',
  templateUrl: './available-service.component.html',
  styleUrls: ['./available-service.component.scss']
})
export class AvailableServiceComponent implements OnInit {

  public doc: any = AppModule.doc;
  public total = 0;
  @Input() services: any;
  @Input() safeObject: any;

  @Input() selectedServices = new HashTable<any, any>();

  constructor() { }

  calculateTotal() {
    this.total = 0;
    if (this.services)
    this.services.forEach(element => {
      if (!element.number)
        element.number = 1;

      if (this.selectedServices.has(element.id)) {
        this.total += (element.value + element.additional_value) * element.number;
      }
    });
  }

  toggleService(item) {
    if (this.selectedServices.has(item.id)) {
      this.selectedServices.remove(item.id);
    } else {
      this.selectedServices.put(item.id, item);
    }
    this.calculateTotal();
    this.setServicePayment();
  }

  setServicePayment() {
    const arr = [];
    const ids = this.selectedServices.getKeys();

    ids.forEach(element => {
      const object = {
        id: element,
        number: this.selectedServices.get(element).number
      };

      arr.push(object);
    });

    if (ids.length > 0) {
      this.safeObject.services = arr;
      this.safeObject.payment_type = 'service';
      this.safeObject.paid_value = this.total;
    } else {
      this.safeObject.services = [];
      this.safeObject.payment_type = null;
      this.safeObject.paid_value = 0;
    }
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateTotal();
  }
}
