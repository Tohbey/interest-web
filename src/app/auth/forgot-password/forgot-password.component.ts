import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  otp!: string;
  isValid: boolean =  true
  isSubmitted: boolean = true;
  forgotPassword!: FormGroup;
  showOtpComponent = true;
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  config = {
    allowNumbersOnly: false,
    length: 5,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.forgotPasswordForm()
  }

  forgotPasswordForm(){
    this.forgotPassword = this._formBuilder.group({
      phoneNumber: ['', Validators.required]
    })
  }

  get f(){
    return this.forgotPassword.controls;
  }

  retrieve(){
    this.isSubmitted = true;
    if(this.forgotPassword.invalid){
      return;
    }
    this.isValid = false
    console.log(this.forgotPassword.value);
  }

  onOtpChange(otp: string) {
    this.otp = otp;
  }

  setVal(val: any) {
    this.ngOtpInput.setValue(val);
  }
}
