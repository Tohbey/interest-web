import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private router: Router, private toastr:ToastrService) { }

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
    this.coc = this.forgotPassword.get("countryCode")?.value
    this.phoneNumber = this.forgotPassword.get("phoneNumber")?.value;
    if(this.phoneNumber.charAt(0) == "0"){
      this.phoneNumber = this.coc + this.phoneNumber.slice(1)
    } else if (this.phoneNumber.charAt(0) == "+") {
      return;
    }else{
      this.phoneNumber = this.coc + this.phoneNumber
    }
    let phoneObject = {
      phoneNumber: this.phoneNumber
    }
    console.log(phoneObject)
    this.authservice.recover(phoneObject).subscribe((data) => {
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
      phoneNumber: this.phoneNumber,
      token: this.otp,
      password : this.password.get('password')?.value
    }
    this.authservice.resetPassword(passwordObject).subscribe((data) => {
      console.log(data)
      this.toastr.success(data.msg, "Interest App");
      this.router.navigate(['/login'])
    }, error => {
      console.log(error)
    })

  }

  onOtpChange(otp: string) {
    this.otp = otp;
  }

  setVal(val: any) {
    this.ngOtpInput.setValue(val);
  }
}
