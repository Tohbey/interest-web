import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  sign!: FormGroup
  isError: boolean = false
  errorStatment!: String
  submitSignUp: boolean = false;
  user!: User
  countryCode: any[] = [];
  constructor(
    private _formBuilder: FormBuilder,
    private _route:Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.signForm();
    this.getCountryCode()
  }

  signForm(){
    this.sign = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      countryCode: ['', Validators.required],
      interest: ['', Validators.required]
    });
  }

  get f(){
    return this.sign.controls;
  }

  getCountryCode(){
    this.userService.getCountryCode().subscribe((resp) => {
      this.countryCode = resp.data
    })
  }

  signUp(){
    this.submitSignUp  = true;
    if(this.sign.invalid){
      return;
    }
    console.log(this.sign.value)
    this.user = this.sign.value
    if(this.user.phoneNumber.charAt(0) == "0"){
      this.user.phoneNumber = this.user.countryCode + this.user.phoneNumber.slice(1)
    }else{
      this.user.phoneNumber = this.user.countryCode + this.user.phoneNumber
    }
    console.log("User Details",this.user);
    this.userService.createUser(this.user).subscribe((data) => {
      console.log(data)
      this._route.navigate(['./verification', this.user?.phoneNumber])
    },error => {
      this.isError = true
      this.errorStatment = error
      console.log("error", this.errorStatment);
    })
  }
}
