import { StudentServiceService } from './../../../services/student-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Cache } from 'src/app/shared/cache';
import { HashTable } from 'angular-hashtable';
import { IService } from '../../../models/iservice';
import { AppModule } from '../../../../app.module';
import {MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import { Helper } from '../../../../shared/helper';
import { Message } from 'src/app/shared/message';

@Component({
  selector: 'app-service-index',
  templateUrl: './service-index.component.html',
  styleUrls: ['./service-index.component.scss']
})
export class ServiceIndexComponent implements OnInit {

  public doc: any = AppModule.doc;

  // services list
  public resources: any[] = [];

  // init breadcrum
  public breadcrumbList = [];

  // show create modal
  public showCreateModal = false;

  // remove options
  public showRemoveButton = false;
  public showRemoveModal = false;
  public trashList = new HashTable<any, any>();
  public removed = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource(this.resources);
  displayedColumns: string[];

  // update resouce
  updateResources: any;
  updateItem: any = {};

  constructor(private studentService: StudentServiceService) {
    this.init();
  }

  init() {
    this.initBreadcrumb();
    this.initDisplayColumns();
    //
    this.updateResources = () => {
      this.loadResources();
    };
  }

  initMatDatatable() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  initBreadcrumb() {
    this.breadcrumbList = [
      {name: 'home', url: '/'},
      {name: 'services'}
    ];
  }

  initDisplayColumns() {
    this.displayedColumns = [
      "name",
      "value",
      "store_id",
      "additional_value",
      "except_level_id",
      "division_id",
      "copy",
      "repeat",
      "is_refund",
      "is_in_store",
      "is_mobile",
      "active",
      "installment_percent",
      "from_installment_id",
      "type",
      "action"
    ];
  }

  refreshDataSource(data: any[]) {
    this.resources = data;
    this.dataSource.data = data;
  }

  toggleFromTrash(id) {
    if (this.trashList.has(id)) {
      this.trashList.remove(id);
    }
    else {
      this.trashList.put(id, id);
    }

    if (this.trashList.size() > 0)
      this.showRemoveButton = true;
    else
      this.showRemoveButton = false;
  }

  performRemove() {
    this.doc.swal.confirm(Helper.trans('are you sure'), ()=> {
      this.removeServices();
    });
  }

  removeServices() {
    this.showRemoveModal = true;
    const queue = this.trashList.getKeys();
    if (queue.length > 0) {
      const id = queue.pop();
      this.studentService.destroy(id).subscribe(()=> {
        this.removed.push(id);
        this.trashList.remove(id);
        //
        this.removeServices();
      });
    } else {
      this.removed = [];
      this.showRemoveButton = false;
      this.showRemoveModal = false;
      //
      this.loadResources();
    }
  }

  loadResources() {
    this.studentService.get().subscribe( (res: any) => {
      this.refreshDataSource(res);
    });
  }

  viewCreateModal() {
    this.doc.jquery('#createModal').modal('show');
  }

  showUpdateModal(item) {
    this.updateItem = item;
    this.doc.jquery('#updateModal').modal('show');
  }

  updateService() {
    this.studentService.update([]).subscribe(() => {

    });
  }

  toggleServiceValue(item, value) {
    if (item[value])
      item[value] = false;
    else
      item[value] = true;
  }

  updateActive(item) {
    this.studentService.update(item).subscribe((res: any) => {
      if (res.status == 1) {
        Message.success(res.message);
      } else {
        Message.error(res.message);
      }
    });
  }

  ngOnInit() {
    this.initMatDatatable();
    this.loadResources();
  }

}
