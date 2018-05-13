import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-system-message',
  templateUrl: './system-message.component.html',
  styleUrls: ['./system-message.component.css']
})
export class SystemMessageComponent implements OnInit {
  msgList=[{
    title:"项目成员变动",
    content:"您被选为项目【王者荣耀2】开发者",
    downUrl:"http"
  },
  {
    title:"项目成员变动",
    content:"您被选为项目【王者荣耀2】测试员",
    downUrl:"http"
  },
  {
    title:"产品申请成功",
    content:"您申请的产品【王者荣耀2】通过审核",
    downUrl:"http"
  },
  {
    title:"项目成员变动",
    content:"您被选为项目【王者荣耀3】测试员",
    downUrl:"http"
  }];
  constructor() { }

  ngOnInit() {
  }
  download(url:string){
    console.log(url);
  }
}
