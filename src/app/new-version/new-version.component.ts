import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators/filter';
import { MessageService } from '../utils/message/message.service';
import { Subscription } from 'rxjs/Subscription';
import { UploadFile, NzMessageService } from 'ng-zorro-antd';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-new-version',
  templateUrl: './new-version.component.html',
  styleUrls: ['./new-version.component.css']
})
export class NewVersionComponent implements OnInit {
  version:any={
    product_name:"",
    product_id:0,
    version:""
  };
  uploading = false;
  fileList: UploadFile[] = [];

  constructor(private http: HttpClient, 
    private msg: NzMessageService,
    private message:MessageService) {}

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList.push(file);
    return false;
  }

  handleUpload() {
    // const formData = new FormData();
    // this.fileList.forEach((file: any) => {
    //   formData.append('files[]', file);
    // });
    // this.uploading = true;
    // // You can use any AJAX library you like
    // const req = new HttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts/', formData, {
    //   // reportProgress: true
    // });
    // this.http.request(req).pipe(filter(e => e instanceof HttpResponse)).subscribe((event: any) => {
    //   this.uploading = false;
    //   this.msg.success('upload successfully.');
    // }, (err) => {
    //   this.uploading = false;
    //   this.msg.error('upload failed.');
    // });
  }
  public subscription: Subscription;
  ngAfterViewInit(): void {
    this.subscription = this.message.getMessage().subscribe(msg => {
      // 根据msg，来处理你的业务逻辑。
      this.version=msg.type;
      console.log(this.version);
      
    })
  }
  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
