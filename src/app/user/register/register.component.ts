import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { HttpService } from '../../utils/http/http.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  validateForm: FormGroup;
  isLoading = false;

  _submitForm() {
    let params = {};

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      params[i] = this.validateForm.controls[i];
    }

    delete params["agree"];
    delete params["phoneNumberPrefix"];
    delete params["checkPassword"];

    let valid = true;
    valid = !(this.getFormControl("userName").dirty && this.getFormControl("userName").hasError('required')) &&
      !(this.getFormControl("password").dirty && this.getFormControl("password").hasError('required')) &&
      !(this.getFormControl("checkPassword").dirty && this.getFormControl("checkPassword").hasError('confirm')) &&
      !(this.getFormControl("phoneNumber").dirty && this.getFormControl("phoneNumber").hasError('required')) &&
      !(this.getFormControl("email").dirty && this.getFormControl("email").hasError('email')) &&
      (this.getFormControl("agree").value);
      console.log("register");
    if (valid) {
      this.isLoading = true;
      setTimeout(_ => {
        this.isLoading = false;
      }, 5000);
      this.http.post('user/register', params).subscribe(
        (info) => {
          if (info.result === 0) {
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

  updateConfirmValidator() {
    /** wait for refresh value */
    setTimeout(_ => {
      this.validateForm.controls['checkPassword'].updateValueAndValidity();
    });
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
  };

  getCaptcha(e: MouseEvent) {
    e.preventDefault();
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      userName: [null, [Validators.required]],
      phoneNumberPrefix: ['+86'],
      phoneNumber: [null, [Validators.required]],
      agree: [false]
    });
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }
}
