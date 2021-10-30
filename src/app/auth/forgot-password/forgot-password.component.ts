import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  otp!: string;
  isValid: boolean =  true
  isSubmitted: boolean = false;
  isPassword: boolean = false;
  forgotPassword!: FormGroup;
  showOtpComponent = true;
  phoneNumber!: string;
  coc!: string;
  password!: FormGroup
  countryCode: any[] = [];
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
  constructor(private _formBuilder: FormBuilder,
    private authservice: AuthService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.forgotPasswordForm();
    this.getCountryCode();
    this.passwordForm()
  }

  getCountryCode(){
    this.userService.getCountryCode().subscribe((resp) => {
      this.countryCode = resp.data
    })
  }

  forgotPasswordForm(){
    this.forgotPassword = this._formBuilder.group({
      countryCode: [''],
      phoneNumber: ['']
    })
  }
  get f(){
    return this.forgotPassword.controls;
  }
  sendOTP(){
    this.isSubmitted = true;
    if(this.forgotPassword.invalid){
      return;
    }
    console.log(this.forgotPassword.value);
    this.coc = this.forgotPassword.get("countryCode")?.value
    this.phoneNumber = this.forgotPassword.get("phoneNumber")?.value;
    if(this.phoneNumber.charAt(0) == "0"){
      this.phoneNumber = this.coc + this.phoneNumber.slice(1)
    }else{
      this.phoneNumber = this.coc + this.phoneNumber
    }
    this.authservice.recover(this.phoneNumber).subscribe((data) => {
      console.log(data)
    }, error => {
      console.log(error)
    })
    this.isValid = false
  }

  passwordForm(){
    this.password = this._formBuilder.group({
      password: ['', Validators.required]
    })
  }
  get g(){
    return this.password.controls;
  }
  submit(){
    this.isPassword = true;
    if(this.password.invalid && this.otp === ""){
      return
    }
    let passwordObject = {
      token: this.otp,
      password : this.password.get('password')?.value
    }
    this.authservice.resetPassword(passwordObject).subscribe((data) => {
      console.log(data)
    }, error => {
      console.log(error)
    })

    this.router.navigate(['/login'])
  }

  onOtpChange(otp: string) {
    this.otp = otp;
  }

  setVal(val: any) {
    this.ngOtpInput.setValue(val);
  }
}
