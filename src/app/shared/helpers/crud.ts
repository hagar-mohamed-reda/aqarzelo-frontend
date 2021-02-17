import { HashTable } from "angular-hashtable";
import { Helper } from "../helper";
import { Message } from "../message";
import { GlobalService } from "../services/global.service";

export class Crud {

  /**
   * filter params
   */
  filter: any = {};

  /**
   * data of resources
   */
  data: any = [];

  /**
   * main base url of api
   *
   */
  baseApiUrl: any = "";

  /**
   * store api of insert
   *
   */
  storeApiUrl: any = this.baseApiUrl + "/store";

  /**
   * update api
   *
   */
  updateApiUrl: any = this.baseApiUrl + "/update";

  /**
   * update api
   *
   */
  destroyApiUrl: any = this.baseApiUrl + "/destroy";

  /**
   * permission controllers
   *
   */
  canAdd: any = true;
  canEdit: any = true;
  canRemove: any = true;

  /**
   * load item
   */
  loading: any = false;

  /**
   * selecte records
   */
  selectedResources = new HashTable<any, any>();

  constructor(public service: GlobalService) {

  }

  /**
   * add or remove item from selected hashtable
   *
   */
  toggle(item) {
    if (this.selectedResources.has(item.id)) {
      item.selected = 0;
      this.selectedResources.remove(item.id);
    } else {
      item.selected = 1;
      this.selectedResources.put(item.id, item);
    }
  }

  /**
   * load all the data of table
   */
  get() {
    this.loading = true;
    this.service.get(this.baseApiUrl, this.filter).subscribe((res) =>{
      this.data = res;
      this.loading = false;
      this.getAction(res);
      this.action(res);
    });
  }

  /**
   * new new row
   * @param data
   */
  create(data={}) {
    this.data.push(data);
  }

  /**
   * store or update object
   * if id update
   * ifnot store new one
   * @param data
   */
  send(data: any) {
    if (data.id) {
      this.update(data);
    } else {
      this.store(data);
    }
  }

  /**
   * store new object
   * @param data
   */
  store(data) {
    if (!this.canAdd)
      return;
    this.service.store(this.storeApiUrl, data).subscribe((res: any) => {
      if (res.status == 1) {
        Message.success(res.message);
      } else {
        Message.error(res.message);
      }
      this.storeAction(res);
      this.action(res);
    });
  }

  /**
   * update data of object
   * @param data
   */
  update(data) {
    if (!this.canEdit)
      return;
    this.service.store(this.updateApiUrl+"/"+data.id, data).subscribe((res: any) => {
      if (res.status == 1) {
        Message.success(res.message);
      } else {
        Message.error(res.message);
      }
      this.updateAction(res);
      this.action(res);
    });
  }

  /**
   * remove data
   * @param data
   * @param index of item in array
   */
  destroy(data, index) {
    if (!this.canRemove)
      return;
    let self = this;
    Message.confirm(Helper.trans('are you sure'), () => {
      self.service.store(self.destroyApiUrl+"/"+data.id, data).subscribe((res: any) => {
        if (res.status == 1) {
          Message.success(res.message);
          self.data.splice(index, 1);
        } else {
          Message.error(res.message);
        }
        self.destroyAction(res);
        self.action(res);
      });
    });
  }

  /**
   * action method after load all data
   * @param response
   */
  getAction(response) {
    // no some thing
  }

  /**
   * action method after store
   * @param response
   */
  storeAction(response) {
    // no some thing
  }

  /**
   * action method after update
   * @param response
   */
  updateAction(response) {
    // no some thing
  }

  /**
   * action method after remove
   * @param response
   */
  destroyAction(response) {
    // no some thing
  }

  /**
   * action method after store, update and remove
   * @param response
   */
  action(response) {
    // no some thing
  }
}
