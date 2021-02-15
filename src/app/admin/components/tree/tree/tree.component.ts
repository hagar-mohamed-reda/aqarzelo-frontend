import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Helper } from 'src/app/shared/helper';
import { Message } from 'src/app/shared/message';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit, OnChanges {

  $: any = $;
  data: any = [];
  id = null;
  static code: any = 1;
  selectedId:any = null;
  tree: any = {};

  @Input() resource: any = {};


  constructor(private globalService: GlobalService) {
    if (!this.id) {
      this.id = new Date().getTime()+TreeComponent.code;
      TreeComponent.code += 1;
    }
  }

  ngOnInit() {
    this.loadData();
    //this.showContextMenu();
  }

  ngOnChanges() {
    if (this.resource.tree_id)
      this.select(this.resource.tree_id);
  }

  loadData() {
    this.globalService.get("account/trees").subscribe((res: any) =>{
      this.initTree(res);
    });
  }

  initTree(data) {
    let self = this;
    setTimeout(() =>{
      self.tree = self.$('.jstree'+self.id).jstree({ 'core' : {
        'data' : data,
        "check_callback": true,
        "plugins" : ["themes","html_data","ui","crrm","hotkeys"],
        "core" : {"check_callback": true, "initially_open" : [ "phtml_1" ] }

      }})

      // rename event
      self.$('.jstree'+self.id).on("rename_node.jstree", function (e, data) {
        self.update(data);
      });

      // create event
      self.$('.jstree'+self.id).on("create_node.jstree", function (e, data) {
        self.store(data);
      });

      // delete event
      self.$('.jstree'+self.id).on("delete_node.jstree", function (e, data) {
          self.delete(data);
      });

      // selected event
      self.$('.jstree'+self.id).on('select_node.jstree',function(e,node){
        self.selectedId = node.selected[0];
        console.log(node.selected[0]);
        self.resource.tree_id = node.selected[0];
      });
    }, 200);
  }

  store(node: any) {
    if (!node.node)
      return;
    let data =  {
      id: node.node.id,
      text: node.node.text,
      parent: node.node.parent,
      icon: "fa fa-usd",
      type: "default"
    };
    this.globalService.store('account/trees/store', data).subscribe((res) => {
      //
    });
  }

  update(node: any) {
    if (!node.node)
      return;
    let data =  {
      text: node.text,
      icon: "fa fa-usd",
    };
    this.globalService.store('account/trees/update/'+node.node.id, data).subscribe((res) => {
      //
    });
  }

  delete(node: any) {
    if (!node.node)
      return;
    this.globalService.store('account/trees/delete/'+node.node.id, {}).subscribe((res) => {
      //
    });
  }

  create() {
    var ref = this.$('.jstree'+this.id).jstree(true);
    var sel = ref.get_selected();
    console.log(sel);
    if (!sel.length) { return false; }
    sel = sel[0];
    sel = ref.create_node(sel, {text: Helper.trans("new expense"), "type":"default", "icon": "fa fa-usd"});
    if (sel) {
      ref.edit(sel);
    }
  }

  rename() {
    var ref = this.$('.jstree'+this.id).jstree(true),
    sel = ref.get_selected();
    if (!sel.length) { return false; }
    sel = sel[0];
    ref.edit(sel);
  }

  remove() {
    var self = this;
    Message.confirm(Helper.trans("are you sure"), () =>{
      var ref = self.$('.jstree'+self.id).jstree(true),
      sel = ref.get_selected();
      if (self.$('.jstree'+self.id).jstree(true).get_parent(sel) == '#')
      return false;
      if (!sel.length) { return false; }
      ref.delete_node(sel);
    });
  }

  select(id) {
    // deselect all
    this.$('.jstree'+this.id).jstree(true).deselect_all();

    // select one
    this.$('.jstree'+this.id).jstree('select_node', id);

    // get node
    let node = this.$('.jstree'+this.id).jstree(true).get_node(id);

    // open node
    this.$('.jstree'+this.id).jstree(true).open_node(node);
  }

  showContextMenu(ev) {
    var self = this;
    ev.preventDefault();
    console.log(ev);
    this.$('.context-menu-'+this.id).hide();
    this.$('.context-menu-'+this.id).css('left', (ev.pageX - 150 )+ "px");
    this.$('.context-menu-'+this.id).css('top', (ev.pageY ) + "px");
    this.$('.context-menu-'+this.id).slideDown(200);
    return false;
  }

  hideContextMenu() {
    this.$('.context-menu-'+this.id).hide();
  }

}
