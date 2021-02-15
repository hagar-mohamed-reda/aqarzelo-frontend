
import { Component, OnInit, ViewChild } from '@angular/core';
import { HashTable } from 'angular-hashtable';
import { AppModule } from '../../../../app.module';
import {MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import { StoreService } from '../../../services/store.service';
import { Helper } from '../../../../shared/helper';
import { Auth } from 'src/app/shared/auth';
import { exit } from 'process';

@Component({
  selector: 'app-store-index',
  templateUrl: './store-index.component.html',
  styleUrls: ['./store-index.component.scss']
})
export class StoreIndexComponent implements OnInit {

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

  constructor(private storeService: StoreService) {
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
      {name: 'stores'}
    ];
  }

  initDisplayColumns() {
    this.displayedColumns = [
      "name",
      "init_balance",
      "balance",
      "address",
      "notes",
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
      this.removeResources();
    });
  }

  removeResources() {
    this.showRemoveModal = true;
    const queue = this.trashList.getKeys();
    if (queue.length > 0) {
      const id = queue.pop();
      this.storeService.destroy(id).subscribe(()=> {
        this.removed.push(id);
        this.trashList.remove(id);
        //
        this.removeResources();
      });
    } else {
      this.removed = [];
      this.showRemoveButton = false;
      this.showRemoveModal = false;
      //
      this.updateResources();
    }
  }

  loadResources() {
    this.storeService.get().subscribe( (res: any) => {
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
    this.storeService.update([]).subscribe(() => {

    });
  }

  ngOnInit() {
    this.initMatDatatable();
    this.loadResources();
  }

}
