import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-system-message',
  templateUrl: './system-message.component.html',
  styleUrls: ['./system-message.component.css']
})
export class SystemMessageComponent implements OnInit {
  msgList=[{
    title:"msg-title",
    content:"msg-content---------------------------content",
    downUrl:"http"
  }];
  constructor() { }

  ngOnInit() {
    for(let i=0;i<10;i++){
      let msg={
        title:"msg-title",
        content:"msg-content---------------------------content",
        downUrl:"http"
      };
      this.msgList.push(msg);
    }
  }
  download(url:string){
    console.log(url);
  }
}
