import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class MessageService {
  private subject = new Subject<any>();
  /**
   * content模块里面进行信息传输，类似广播
   * @param type 发送的信息类型
   *        1-你的信息
   *        2-你的信息
   *        3-你的信息
   *        4-你的信息
   *        5-你的信息
   */
  sendMessage(type: any) {
    console.log('send TAG' + '---------->>>' + type);
    
    this.subject.next({type: type});
  }
  /**
   * 发送图片信息
   * @param src:图片地址
   */
  sendImages(src: string) {
    console.log('AG1' + '---------->>>' + src)
    this.subject.next({url: src});
  }
   /**
   * 清理消息
   */
  clearMessage() {
    this.subject.next();
  }
   /**
   * 获得消息
   * @returns {Observable<any>} 返回消息监听
   */
  getMessage(): Observable<any> {
    console.log('getMessage------>');
    
    return this.subject.asObservable();
  }
  constructor() { }

}
