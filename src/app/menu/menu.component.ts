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
  admin=globalVal.ADMIN_ID;
  administrate: Product[] = [];
  develop: Product[] = [];
  testing: Product[] = [];
  userInfo: userInfo = {
    username: "username",
    email: "12306@example.com",
    userId: 0
  };

  isCollapsed = false;
  constructor(private http: HttpService,
    private _message: NzMessageService,
    private msgsv: MessageService,
    private router: Router
  ) { }
  ngOnChanges(){
    this.admin=globalVal.ADMIN_ID;
  }
  ngOnInit() {
    this.userInfoInit();
    this.getProductList();
    //this.admin=globalVal.ADMIN_CODE;
  }

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

  userInfoInit() {
    let storage = window.localStorage;
    this.userInfo.username = storage.user_name;
    this.userInfo.email = storage.email;
    this.userInfo.userId = storage.user_id;
  }

  getProductList() {
    this.http.get('product/getProductList', { "user_id": this.userInfo.userId })
      .subscribe(info => {
        if (info.result === 0) {
          let list = info.product_list;
          this.administrate = list.administrate;
          this.develop = list.develop;
          this.testing = list.testing;
          this.msgsv.sendMessage(list);
          if (this.administrate.length === 0) {
            if (this.develop.length === 0) {
              if (this.testing.length != 0) {
                this.router.navigate(['main/list/3']);
              }
            } else {
              this.router.navigate(['main/list/2']);
            }
          } else {
            this.router.navigate(['main/list/1']);
          }
        }
      }, error => {
        this._message.create('error', error);
      })
  }
}
