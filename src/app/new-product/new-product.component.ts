import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../utils/http/http.service';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { searchOption } from '../utils/type';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  searchOptions: searchOption[];
  userList: searchOption[];
  selectedDev = [];
  selectedTest = [];
  admin;
  validateForm: FormGroup;
  uploading = false;
  fileList: UploadFile[] = [];
  constructor(private fb: FormBuilder,
    private http: HttpService,
    private msg: NzMessageService) { }
  _submitForm() { this.handleUpload() }
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
    // formData.append('product_id','1');
    let valid = true;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      valid = valid && !(this.validateForm.controls[i].hasError('required'));
      formData.append(i, this.validateForm.controls[i].value);
      console.log(i + ':' + this.validateForm.controls[i].value + ':' + this.validateForm.controls[i].hasError("required"));
    }
    valid = valid && (this.fileList.length !== 0);
    console.log(valid);
    if (valid) {
      this.uploading = true;
      setTimeout(_ => {
        this.uploading = false;
      }, 5000);
      this.http.postForm('product/newProduct', formData).subscribe((info) => {
        this.msg.success(info.msg);
        this.uploading = false;
      });
    }
  }
  ngOnInit() {
    this.userList = [];
    let storage = window.localStorage;
    this.admin = storage.user_id;
    this.searchOptions = [
      { value: storage.user_id, label: storage.user_name }
    ];
    this.http.get('user/getUserList').subscribe(info => {
      let list = info.userList;

      for (let index = 0; index < list.length; index++) {
        let option = new searchOption();
        option.value = list[index].user_id;
        option.label = list[index].user_name;
        this.userList.push(option);
      }
      console.log(this.userList);
    }, error => { this.msg.error(error); });
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      admin: [null, [Validators.required]],
      dev: [null, [Validators.required]],
      test: [null, [Validators.required]],
      platform: [null, [Validators.required]],
      system: [null, [Validators.required]],
    });
  }
  getFormControl(name) {
    return this.validateForm.controls[name];
  }
}
