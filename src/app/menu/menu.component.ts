import { Component, OnInit } from '@angular/core';
import { HttpService } from '../utils/http/http.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { MessageService } from '../utils/message/message.service';
import { globalVal } from '../utils/globalVal';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  admin_id=globalVal.ADMIN_ID;
  dev_id=globalVal.DEVELOP_ID;
  test_id=globalVal.TESTING_ID;

  administrate: Product[] = [];
  develop: Product[] = [];
  testing: Product[] = [];
  userInfo: userInfo = {
    user_name: "username",
    email: "12306@example.com",
    user_id: 0
  };

  isCollapsed = false;
  constructor(private http: HttpService,
    private _message: NzMessageService,
    private msgsv: MessageService,
    private router: Router
  ) { }
  ngOnChanges(){
    this.admin_id=globalVal.ADMIN_ID;
    this.dev_id=globalVal.DEVELOP_ID;
    this.test_id=globalVal.TESTING_ID;
  }
  ngOnInit() {
    console.log('oninit');
    
    this.userInfoInit();
    this.getProductList();
  }

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

  userInfoInit() {
    let storage = window.localStorage;
    this.userInfo = JSON.parse(storage.userInfo);
  }

  getProductList() {
    console.log('getList');
    this.http.get('product/getProductList', { "user_id": this.userInfo.user_id })
      .subscribe(info => {
        if (info.result === 0) {
          let list = info.productList;
          for(let key in list){
            let li=list[key];
            for(let i=0;i<li.length;i++){
              if(li[i].versions.length===0){
                li[i].version="无";
              }else{
                li[i].version=li[i].versions[0].version_num;
              }
            }
          }
          this.administrate = list.admin;
          this.develop = list.dev;
          this.testing = list.test;

          this.msgsv.sendMessage(list);
          let storage = window.localStorage;
          storage.product_list=JSON.stringify(list);
          if (this.administrate.length === 0) {
            if (this.develop.length === 0) {
              if (this.testing.length != 0) {
                this.router.navigate(['main/list',globalVal.TESTING_ID]);
              }
            } else {
              this.router.navigate(['main/list/2']);
            }
          } else {
            this.router.navigate(['main/list/1']);
          }
        }
      }, error => {
        this._message.error(error);
      })
  }
  addProduct(){

  }
  logout(){
    let storage = window.localStorage;
    storage.removeItem('userInfo');
    storage.removeItem('product_list');
    this.router.navigate(['login']);
  }
}
