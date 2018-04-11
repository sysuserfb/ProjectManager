import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators/filter';
import { MessageService } from '../utils/message/message.service';
import { Subscription } from 'rxjs/Subscription';
import { UploadFile, NzMessageService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../utils/http/http.service';

@Component({
  selector: 'app-new-version',
  templateUrl: './new-version.component.html',
  styleUrls: ['./new-version.component.css']
})
export class NewVersionComponent implements OnInit {
  validateForm: FormGroup;
  version: any = {
    product_name: "",
    product_id: 0,
    version: ""
  };
  ver1=1;
  ver2=0;
  ver3=0;
  uploading = false;
  fileList: UploadFile[] = [];

  constructor(private fb: FormBuilder,
    private http:HttpService,
    private msg: NzMessageService,
    private message: MessageService) { }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList.pop();
    this.fileList.push(file);
    return false;
  }
  customReq = (item): Subscription => {
    return this.http.post('version/newVersion',{}).subscribe((info)=>{
      console.log(info);
      
    });
  }
  _submitForm() {this.handleUpload() }
  handleUpload() {
    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });
    formData.append('product_id','1');
    formData.append('newVersion',this.ver1+'.'+this.ver2+'.'+this.ver3);

    this.uploading = true;
    // You can use any AJAX library you like
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
    this.http.postForm('version/newVersion',formData).subscribe((info)=>{
      this.msg.success('success');
    })
  }
  public subscription: Subscription;
  ngAfterViewInit(): void {
    this.subscription = this.message.getMessage().subscribe(msg => {
      // 根据msg，来处理你的业务逻辑。
      this.version = msg.type;
      console.log(this.version);

    })
  }
  ngOnInit() {
    this.validateForm = this.fb.group({
      ver1: [null, [Validators.required]],
      ver2: [null, [Validators.required]],
      ver3: [null, [Validators.required]],
      upload: [null, [Validators.required]],
    });
  }
  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
  getFormControl(name) {
    return this.validateForm.controls[name];
  }
}
