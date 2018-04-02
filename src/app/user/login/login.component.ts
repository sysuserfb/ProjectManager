import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../utils/http/http.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  isLoading = false;

  _submitForm() {
    let params = {};

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      params[i] = this.validateForm.controls[i];
    }

    let valid = true;
    valid = !(this.getFormControl("userName").dirty && this.getFormControl("userName").hasError('required')) &&
      !(this.getFormControl("password").dirty && this.getFormControl("password").hasError('required'))

    if (valid) {
      this.isLoading = true;
      setTimeout(_ => {
        this.isLoading = false;
      }, 5000);
      console.log("login");
      
      this.http.post('user/login', params).subscribe(
        (info) => {
          if (info.result === 0) {
            let storage = window.localStorage;
            storage.token = info.token;
            storage.user_name = info.user_info.user_name;
            storage.email = info.user_info.email;
            storage.user_id = info.user_info.user_id;
            //deliver the user message
            this.router.navigate(['/']);
          }
        }, error => {
          this._message.create('error', error);
        })
    }


  }

  constructor(private fb: FormBuilder,
    private http: HttpService,
    private router: Router,
    private _message: NzMessageService
  ) {
  }


  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

}
