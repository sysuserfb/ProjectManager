import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../utils/message/message.service';
import { ActivatedRoute } from '@angular/router';
import { globalVal } from '../utils/globalVal';

@Component({
  selector: 'app-proj-list',
  templateUrl: './proj-list.component.html',
  styleUrls: ['./proj-list.component.css']
})
export class ProjListComponent implements OnInit {
  msg:any={};
  routerId: string;
  productList: Product[];
  constructor(public router: ActivatedRoute,
    private message: MessageService) {
  }
  public subscription: Subscription;
  ngAfterViewInit(): void {
    this.subscription = this.message.getMessage().subscribe(msg => {
      // 根据msg，来处理你的业务逻辑。
      console.log('change'+this.routerId);
      this.msg=msg.type;
      this.switchList();
    })
  }
  ngOnchanges():void{
    
  }
  // 组件生命周期结束的时候，记得注销一下，不然会卡卡卡卡；
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
    this.router.paramMap.subscribe(data => {
      this.routerId = data.get('id');
      
      let storage =window.localStorage;
      this.msg=JSON.parse(storage.product_list);
      console.log('localstorage');
      
      this.switchList();
      
    });
  }
  switchList():void{
    console.log(this.msg);
    
    switch (parseInt(this.routerId)) {
      case globalVal.ADMIN_ID:
      console.log(globalVal.ADMIN_ID);
      
        this.productList = this.msg.administrate;
        break;
      case globalVal.DEVELOP_ID:
      console.log(globalVal.DEVELOP_ID);
      
        this.productList = this.msg.develop;
        break;
      case globalVal.TESTING_ID:
      console.log(globalVal.TESTING_ID);
      
        this.productList = this.msg.testing;
        break;
    }
  }

}
