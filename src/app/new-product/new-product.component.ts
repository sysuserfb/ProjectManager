import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../utils/http/http.service';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  admin={
    user_id:0,
    user_name:"username"
  };
  searchOptions;
  validateForm: FormGroup;
  uploading=true;
  fileList: UploadFile[] = [];
  constructor(private fb: FormBuilder,
    private http:HttpService,
    private msg: NzMessageService) { }
    _submitForm() {this.handleUpload() }
    beforeUpload = (file: UploadFile): boolean => {
      this.fileList.pop();
      this.fileList.push(file);
      return false;
    }
    handleUpload() {
      const formData = new FormData();
      this.fileList.forEach((file: any) => {
        formData.append('file', file);
      });
      formData.append('product_id','1');
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        formData.append(i,this.validateForm.controls[i].value);
      }
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
      this.http.postForm('filesys/Upload',formData).subscribe((info)=>{
        this.msg.success('success');
        console.log(formData);
        
      })
    }
    checkValid(){
      return false;
    }
  ngOnInit() {
    let storage = window.localStorage;
    this.admin.user_name = storage.user_name;
    this.admin.user_id = storage.user_id;
    this.searchOptions = [
    { value: this.admin.user_id, label: this.admin.user_name },
    { value: '8', label: 'Lucy' },
    { value: '7', label: 'Tom' }
  ];
  
  this.validateForm = this.fb.group({
    platform: [null, [Validators.required]],
    system: [null, [Validators.required]],
    admin: [null, [Validators.required]],
    upload: [null, [Validators.required]],
  });
  }
  getFormControl(name) {
    return this.validateForm.controls[name];
  }
}
