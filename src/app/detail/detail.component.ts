import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../utils/http/http.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Report, SystemMessage } from '../utils/type';

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
  report:Report[]=[];
  message:SystemMessage=new SystemMessage;
  devMem: userInfo[];
  testMem: userInfo[];
  versionCur: any = {};
  versionDev: any = {};
  report_cur:number=1;
  cur_cur: number;
  cur_dev: number;
  cur_statu:String;
  dev_statu:String;
  edit_statu:number=0;
  tempEditName:string="";
  detail: detail = {
    admin: this.admin,
    dev_mem: this.devMem,
    test_mem: this.testMem,
    version_cur: {},
    version_dev: {},
    product_id: 0,
    product_name: "product_name",
    platform: "mobile",
    OS: "android"
  };
  private id: string = "";
  constructor(public router: ActivatedRoute,
    private http: HttpService,
    private _message:NzMessageService
  ) {
    this.report[0]=new Report;
    this.router.paramMap.subscribe(data => {
      this.id = data.get('id');
      this.code = data.get('code');
      console.log(this.id + ' - ' + this.code);
    });
  }

  ngOnInit() {
    this.getProductDtail();
  }
  getProductDtail(){
    this.http.get('product/getProductDetail', { product_id: this.id })
      .subscribe((info) => {
        if (info.result === 0) {
          this.detail = info.detail;
          this.admin = this.detail.admin;
          this.devMem = this.detail.dev_mem;
          this.testMem = this.detail.test_mem;
          this.versionCur = this.detail.version_cur;
          this.versionDev = this.detail.version_dev;
          this.getAllReport();

          let indexC=this.versionCur.status.indexOf("0");
          if(indexC===-1){
            this.cur_statu="process";
            this.cur_cur=this.versionCur.status.length;
            if(this.cur_cur===3){
              this.cur_statu="finish";
            }
          }else{
            if(indexC===0){
              this.cur_cur=indexC-1;
            }else{
              this.cur_statu="error";
              this.cur_cur=this.versionCur.status.length-1;
            }
          }
          let indexD=this.versionDev.status.indexOf("0");
          if(indexD===-1){
            this.dev_statu="process";
            this.cur_dev=this.versionDev.status.length;
            if(this.cur_dev===3){
              this.dev_statu="finish";
            }
          }else{
            if(indexD===0){
              this.cur_dev=indexD-1;
            }else{
              this.dev_statu="error";
              this.cur_dev=this.versionDev.status.length-1;
            }
          }
          console.log(indexC+'-'+this.cur_statu+' - '+this.cur_cur);
          
        }
      },error=>{
        this._message.create('error',error);
      })
  }
    getAllReport(){
      this.http.get('report/getReport',{version_id:this.versionDev.version_id})
      .subscribe((info)=>{
        if(info.result===0){
          this.report=info.report;
        }
      })
    }
    reviewSuccess(){}
    reviewFailed(){}
    edit() {
      this.tempEditName=this.detail.product_name;
      this.edit_statu = 1;
    }
  
    save() {
      //Object.assign(data, this.tempEditName[ data.key ]);
      this.detail.product_name=this.tempEditName;
      //http
      this.edit_statu = 0;
    }
  
    cancel() {
      this.tempEditName="";
      this.edit_statu = 0;
    }
}
