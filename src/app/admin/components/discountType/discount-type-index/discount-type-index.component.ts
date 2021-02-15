
import { Component, OnInit, ViewChild } from '@angular/core';
import { HashTable } from 'angular-hashtable';
import { AppModule } from '../../../../app.module';
import {MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import { Helper } from '../../../../shared/helper';
import { DiscountTypeService } from 'src/app/account/services/discount-type.service';
import { Message } from 'src/app/shared/message';
import { Auth } from 'src/app/shared/auth';
import { exit } from 'process';

@Component({
  selector: 'app-discount-type-index',
  templateUrl: './discount-type-index.component.html',
  styleUrls: ['./discount-type-index.component.scss']
})
export class DiscountTypeIndexComponent implements OnInit {

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

  constructor(private discountTypeService: DiscountTypeService) {
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
      {name: 'discountTypes'}
    ];
  }

  initDisplayColumns() {
    this.displayedColumns = [
      "name",
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

  remove(element) {
    const id = element.id;
    this.doc.swal.confirm(Helper.trans('are you sure'), ()=> {
      this.discountTypeService.destroy(id).subscribe((r: any)=> {
        if (r.status == 1) {
          this.loadResources();
          Message.success(r.message);
        }
        else
          Message.error(r.message);
      });
    });
  }

  loadResources() {
    this.discountTypeService.get().subscribe( (res: any) => {
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

  ngOnInit() {
    this.initMatDatatable();
    this.loadResources();
  }

}
