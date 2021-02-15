
import { Component, OnInit } from '@angular/core';
import { Cache } from 'src/app/shared/cache';
import { Subject } from 'rxjs';
import { HashTable } from 'angular-hashtable';
import { Helper } from '../../../shared/helper';
import { Message } from '../../../shared/message';
import { AcademicYearService } from '../../services/academic-year.service';
import { LevelService } from '../../services/level.service';
import { DivisionService } from '../../services/division.service';
import { TermService } from '../../services/term.service';
import { StoreService } from '../../services/store.service';
import { ApplicationSettingService } from '../../../adminision/services/application-setting.service';
import { StudentServiceService } from '../../services/student-service.service';
import { Auth } from 'src/app/shared/auth';
import { exit } from 'process';

@Component({
  selector: 'app-academic-year-index',
  templateUrl: './academic-year-index.component.html',
  styleUrls: ['./academic-year-index.component.scss']
})
export class AcademicYearIndexComponent implements OnInit {

  // datatable options
  public dtOptions: any;

  // datable trigger
  dtTrigger: Subject<any> = new Subject();

  // Rows list
  public academicYearExpense: any = {};

  // init breadcrum
  public breadcrumbList = [];

  public self: any;

  // show create modal
  public showCreateModal = false;

  // remove options
  public showRemoveButton = false;
  public showRemoveModal = false;
  public trashList = new HashTable<any, any>();
  public removed = [];

  //
  public levels: any[];
  public divisions: any[];
  public terms: any[];
  public stores: any[];
  public departments: any[];
  public services: any[];
  public division_id: any;
  public level_id: any = 1;
  public registerationStatus: any = [];

  //
  public updateItem: boolean;
  public isLoad = false;

  //
  validateDetailsCol = [
    'name', 'priorty', 'value', 'term_id', 'store_id'
  ];

  constructor(private academicService: AcademicYearService,
    private storeService: StoreService,
    private studentService: StudentServiceService,
    private applicationSetting: ApplicationSettingService) {
    this.self = this;

    // init breadcrum
    this.breadcrumbList = [
      {name: 'home', url: '/'},
      {name: Helper.trans('academic_years_expenses')}
    ];
  }

  setAccountSettings() {
    this.levels = Cache.get(LevelService.LEVEL_PREFIX);
    this.divisions = Cache.get(DivisionService.DIVISION_PREFIX);
    this.terms = Cache.get(TermService.TERPM_PREFIX);
    this.storeService.get().subscribe((res: any)=>{
      this.stores = res;
    });
    this.applicationSetting.getDepartments().subscribe((res: any)=>{
      this.departments = res;
    });
    this.applicationSetting.getRegisterationStatus().subscribe((res: any)=>{
      this.registerationStatus = res;
    });
    //
    this.studentService.get().subscribe((res: any)=>{
      this.services = [];
      res.forEach(element => {
        if (element.is_academic_year_expense == 1)
          this.services.push(element);
      });
    });
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

  removeRows() {
    this.showRemoveModal = true;
    const queue = this.trashList.getKeys();
    if (queue.length > 0) {
      const id = queue.pop();
      this.academicService.destroy(id).subscribe(()=> {
        this.removed.push(id);
        this.trashList.remove(id);
        //
        this.removeRows();
      });
    } else {
      this.removed = [];
      this.showRemoveButton = false;
      this.showRemoveModal = false;
      //
      this.dtTrigger.unsubscribe();
      this.loadAcademicYearExpenses();
    }
  }

  reset() {
    this.academicYearExpense = {
      details: [],
      level_id: this.level_id? this.level_id : 1,
      division_id: this.division_id
    };
  }

  validate() {
    let valid = true;
    if (!this.level_id)
      valid = false;
    return valid;
  }

  validateDetails() {
    let valid = true;
    this.academicYearExpense.details.forEach(element => {
      this.validateDetailsCol.forEach(col => {
        if (!element[col])
          valid = false;
      });
    });
    return valid;
  }

  loadAcademicYearExpenses() {
    if (!this.validate())
      return;
    this.isLoad = true;
    this.reset();
    let data = {
      level_id: this.level_id
    };
    this.academicService.get(data).subscribe( (res: any) => {
      this.academicYearExpense = res;
      this.isLoad = false;
      console.log(this.academicYearExpense.details);
    });
  }

  addRow() {
    let item = {
      value: 0,
      discount: 0,
      academic_year_expense_id: this.academicYearExpense.id
    };
    this.academicYearExpense.details.push(item);
  }

  removeRow(item, index) {
    Message.confirm(Helper.trans('are your sure'), () => {
        if (item.id) {
          this.academicService.destroy(item.id).subscribe((r) => {
            const data: any = r;
            if (data.status == 1) {
              this.academicYearExpense.details.splice(index,index + 1);
              this.loadAcademicYearExpenses();
              Message.success(data.message);
            } else {
              Message.error(data.message);
            }
          });
        } else {
          this.academicYearExpense.details.splice(index,index + 1);
        }
    });
  }

  viewChanges() {
    this.updateAcademicYearExpense();
  }


  updateAcademicYearExpense() {
    if (!this.validateDetails())
      return Message.error(Helper.trans('fill all data'));
    this.updateItem = true;

    this.academicService.update(this.academicYearExpense).subscribe((r) => {
      const data: any = r;
      this.loadAcademicYearExpenses();
      Message.success(data.message);
      this.updateItem = false;
    });
  }

  ngOnInit() {
    this.setAccountSettings();
    this.loadAcademicYearExpenses();
  }

}
