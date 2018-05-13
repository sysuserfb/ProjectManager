import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../utils/http/http.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Report, SystemMessage } from '../utils/type';
import { MessageService } from '../utils/message/message.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  code: string;
  current = 0;
  admin: userInfo = {
    user_id: 0,
    user_name: "username",
    email: "@example.com"
  };
  userList: userInfo[] = [];
  report: Report[] = [];
  message: SystemMessage = new SystemMessage;
  devMem: userInfo[];
  testMem: userInfo[];
  versionCur: any = {};
  versionDev: any = {};
  report_cur: number = 1;
  cur_cur: number;
  cur_dev: number;
  cur_statu: String;
  dev_statu: String;
  edit_statu: number = 0;
  tempEditName: string = "";
  detail: detail = {
    admin: this.admin,
    dev: this.devMem,
    test: this.testMem,
    version_cur: {},
    version_dev: {},
    product_id: 0,
    product_name: "product_name",
    platform: "mobile",
    OS: "android"
  };
  info;
  private id: string = "";
  constructor(public AcRouter: ActivatedRoute,
    private modalService: NzModalService,
    private msg: MessageService,
    private router: Router,
    private http: HttpService,
    private _message: NzMessageService
  ) {
    this.report[0] = new Report;
    this.AcRouter.paramMap.subscribe(data => {
      this.id = data.get('id');
      this.code = data.get('code');
      console.log(this.id + ' - ' + this.code);
    });
  }

  ngOnInit() {
    this.getProductDtail();
    this.getUserList();
  }

  // ----------- members -------------
  currentModal;
  dev_template;
  test_template;
  tmp_add;
  tmp_delete;
  tmp_right;
  template = {};
  isConfirmLoading = false;
  list: any[] = [];
  getUserList() {
    if (this.userList.length === 0) {
      this.http.get('user/getUserList').subscribe((info) => {
        this.userList = info.userList;
        for (let i = 0; i < this.userList.length; i++) {
          this.list.push({
            key: this.userList[i].user_id,
            title: this.userList[i].user_name,
          });
        }
      }, err => { this._message.error(err); })
    }
  }
  showModalForTemplate(titleTpl, contentTpl, footerTpl, template) {
    if(this.userList.length===0){
      
    }
    this.template = template;
    this.tmp_add = [];
    this.tmp_delete = [];
    this.tmp_right = [];
    for (let i = 0; i < this.list.length; i++) {
      for (let j = 0; j < template.list.length; j++) {
        if (this.list[i].key == template.list[j].id) {
          this.list[i].direction = 'right';
          break;
        }
      }
    }
    for (let j = 0; j < template.list.length; j++) {
      this.tmp_right.push(template.list[j].user_id);
    }
    let that = this;
    this.currentModal = this.modalService.open({
      title: titleTpl,
      content: contentTpl,
      footer: footerTpl,
      maskClosable: false,
      onOk() {
        let arr = [];
        console.log(that.list);

        for (let i = 0; i < that.list.length; i++) {
          if (that.list[i].direction === 'right') {
            arr.push(that.list[i].key);
          }
        }
        let params = new FormData();
        params.append('product_id', that.info.id + '');
        params.append('charact', template.charact);
        params.append('user_id', arr.join());
        that.http.postForm('member/addMember', params).subscribe((info) => {
          that._message.success(info.msg);
        }, err => { that._message.error(err) })
      }
    });
  }
  handleOk(e) {
    this.isConfirmLoading = true;
    setTimeout(() => {
      /* destroy方法可以传入onOk或者onCancel。默认是onCancel */
      this.currentModal.destroy('onOk');
      this.isConfirmLoading = false;
      this.currentModal = null;
    }, 1000);
  }
  select(ret: any) {
    console.log('nzSelectChange', ret);
  }

  change(ret: any) {
    if (ret.to === 'right') {

    } else if (ret.to === 'left') {

    }
    console.log('nzChange', ret);
  }

  /// ---------- version -------------

  getAllReport() {
    this.http.get('version/getReport', { version_id: this.versionDev.version_id })
      .subscribe((info) => {
        if (info.result === 0) {
          this.report = info.reportList;
        }
      })
  }
  download(ver) {
    console.log(ver);

    window.open('http://localhost:3000/version/packageDownload?version_id=' + ver.version_id);
  }
  reviewSuccess() { }
  reviewFailed() { }
  edit() {
    this.tempEditName = this.detail.product_name;
    this.edit_statu = 1;
  }

  save() {
    //Object.assign(data, this.tempEditName[ data.key ]);
    this.detail.product_name = this.tempEditName;
    //http
    this.edit_statu = 0;
  }

  cancel() {
    this.tempEditName = "";
    this.edit_statu = 0;
  }
  newVersion() {
    if (this.detail.product_id != 0) {
      this.msg.sendMessage({
        product_name: this.detail.product_name,
        product_id: this.info.id,
        version: this.detail.version_cur
      });
      this.router.navigate(['main/newVersion']);
    }
  }



  //----------------------
  getProductDtail() {
    this.http.get('product/getProductDetail', { product_id: this.id })
      .subscribe((info) => {
        if (info.result === 0) {
          this.info=info.info;
          this.detail = info.detail;
          this.admin = this.detail.admin;
          this.devMem = this.detail.dev;
          this.testMem = this.detail.test;
          this.versionCur = this.detail.version_cur;
          this.versionDev = this.detail.version_dev;
          this.getAllReport();

          if (JSON.stringify(this.versionCur)!="{}") {
            let indexC = this.versionCur.status_code.indexOf("0");
            if (indexC === -1) {
              this.cur_statu = "process";
              this.cur_cur = this.versionCur.status_code.length;
              if (this.cur_cur === 3) {
                this.cur_statu = "finish";
              }
            } else {
              if (indexC === 0) {
                this.cur_cur = indexC - 1;
              } else {
                this.cur_statu = "error";
                this.cur_cur = this.versionCur.status_code.length - 1;
              }
            }
          }
          if (JSON.stringify(this.versionDev)!="{}") {
            let indexD = this.versionDev.status_code.indexOf("0");
            if (indexD === -1) {
              this.dev_statu = "process";
              this.cur_dev = this.versionDev.status_code.length;
              if (this.cur_dev === 3) {
                this.dev_statu = "finish";
              }
            } else {
              if (indexD === 0) {
                this.cur_dev = indexD - 1;
              } else {
                this.dev_statu = "error";
                this.cur_dev = this.versionDev.status_code.length - 1;
              }
            }
          }

          // console.log(indexC + '-' + this.cur_statu + ' - ' + this.cur_cur);
          // ------ nz-transfer
          this.dev_template = {
            list: this.devMem,
            title: '项目开发者',
            charact: 2
          }
          this.test_template = {
            list: this.testMem,
            title: '项目测试员',
            charact: 3
          }

        }
      }, error => {
        this._message.create('error', error);
      });

  }
}
