import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { IReqRegisterationStatus } from "./IReqRegisterationStatus";
import { RegisterationService } from "./Registeration.service";
import { AppModule } from 'src/app/app.module';
import { Message } from 'src/app/shared/message';
import { Helper } from 'src/app/shared/helper';
import { RequiredDocumentService } from 'src/app/adminision/services/required-document.service';
import { HashTable } from 'angular-hashtable';

@Component({
  selector: "app-registeration-status",
  templateUrl: "./registeration-status.component.html",
  styleUrls: ["./registeration-status.component.scss"],
})
export class RegisterationStatusComponent implements OnInit {

  public doc: any = AppModule.doc;
  public addItem: any = {};
  public editItem: any = {};
  public requiredDocumentItem: any = {};

  public storeSubmitted: boolean = false;
  public updateSubmitted: boolean = false;
  public requiredDocumentSubmitted: boolean = false;

  public rows = [];
  public requiredDocuments = [];

  public requiredDocumentId = new HashTable();


  constructor(
    private toastr: ToastrService,
    private service: RegisterationService,
    private requiredDocumentService: RequiredDocumentService
  ) {}

  ngOnInit() {
    this.get();
    this.loadRequiredDocument();
  }

  /**
   * show add modal
   * @param item {}
   */
  create() {
    this.doc.jquery('#addModal').modal('show');
  }

  /**
   * show edit modal
   * @param item {}
   */
  edit(item: any) {
    this.editItem  = item;
    this.doc.jquery('#editModal').modal('show');
  }

  /**
   * get all resources from api
   *
   */
  get(): void {
    this.service.getAll().subscribe((res: any) => {
      this.rows = res;
    });
  }

  /**
   * validate on name
   */
  validate(data) {
    return (!data.name)? false : true;
  }

  /**
   * add new resource
   *
   */
  store() {
    if (!this.validate(this.addItem))
      return Message.error(Helper.trans('fill all data'));
    this.storeSubmitted = true;
    this.service.create(this.addItem).subscribe((r: any) => {
      if (r.status == 1) {
        this.get();
        Message.success(r.message);
        this.reset();
      }
      else
        Message.error(r.message);

      this.storeSubmitted = false;
    });
  }

  /**
   * update exiting resource
   */
  update() {
    if (!this.validate(this.editItem))
      return Message.error(Helper.trans('fill all data'));
    this.updateSubmitted = true;
    this.service.update(this.editItem).subscribe((r: any) => {
      if (r.status == 1){
        this.get();
        Message.success(r.message);
      }
      else
        Message.error(r.message);
      this.updateSubmitted = false;
    });
  }

  /**
   * remove a resource
   *
   */
  destroy(id) {
    this.doc.swal.confirm(Helper.trans('are you sure'), () => {
      this.service.delete(id).subscribe((r: any) => {
        if (r.status == 1){
          this.get();
          Message.success(r.message);
        }
        else
          Message.error(r.message);
      });
    });
  }

  /**
   * clear all data of create
   *
   */
  reset() {
    this.addItem = {};
  }

  search(value, table) {
    this.doc.search(value, table);
  }

  /**
   * display required document of resource
   *
   */
  displayRequiredDocument(item) {
    this.requiredDocumentItem = item;
    this.requiredDocumentId = new HashTable();
    item.required_documents.forEach(element => {
      this.requiredDocumentId.put(element.id, element.id);
    });
    //
    this.doc.jquery('#requiredDocumentModal').modal('show');
  }

  /**
   * load all required document data
   */
  loadRequiredDocument() {
    this.requiredDocumentService.get().subscribe((res: any) => {
      this.requiredDocuments = res;
    });
  }

  /**
   * add or remove required document id
   */
  toggleRequiredDocument(id) {
    if (this.requiredDocumentId.has(id))
      this.requiredDocumentId.remove(id);
    else
      this.requiredDocumentId.put(id, id);
  }

  /**
   * update required document of item
   */
  updateRequiredDocument() {
    this.requiredDocumentSubmitted = true;
    const data = {
      "required_documents": this.requiredDocumentId.getKeys()
    }
    this.service.updateRequierdDocument(this.requiredDocumentItem.id, data).subscribe((r: any) => {
      if (r.status == 1){
        this.get();
        Message.success(r.message);
      }
      else
        Message.error(r.message);

      this.requiredDocumentSubmitted = false;
    });
  }


}
