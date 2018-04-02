import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../utils/message/message.service';
import { ActivatedRoute } from '@angular/router';
import { globalVal } from '../utils/globalVal';
interface Product {
  product_id,
  product_name,
  platform,
  OS,
  create_date
}
@Component({
  selector: 'app-proj-list',
  templateUrl: './proj-list.component.html',
  styleUrls: ['./proj-list.component.css']
})
export class ProjListComponent implements OnInit {
  routerId: string;
  productList: Product[];
  constructor(public router: ActivatedRoute,
    private message: MessageService) {
  }
  public subscription: Subscription;
  ngAfterViewInit(): void {
    this.subscription = this.message.getMessage().subscribe(msg => {
      // 根据msg，来处理你的业务逻辑。
      switch (parseInt(this.routerId)) {
        case globalVal.ADMIN_ID:
          this.productList = msg.type.administrate;
          break;
        case globalVal.DEVELOP_ID:
          this.productList = msg.type.develop;
        case globalVal.TESTING_ID:
          this.productList = msg.type.testing;
      }
    })
  }

  // 组件生命周期结束的时候，记得注销一下，不然会卡卡卡卡；
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
    this.router.paramMap.subscribe(data => {
      this.routerId = data.get('id');
      console.log(data.get('id'))
    });
  }


}
