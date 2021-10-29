import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  password!: FormGroup
  changeEmail!: FormGroup
  changeUsername!: FormGroup
  displayDivNumber: number = 1;
  isPassword: boolean = false
  isEmail: boolean = false;
  isUsername: boolean = false;
  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.usernameForm();
    this.emailForm();
    this.passwordForm();
  }

  passwordForm(){
    this.password = this._formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    })
  }

  emailForm(){
    this.changeEmail = this._formBuilder.group({
      email: ['', Validators.required]
    })
  }

  usernameForm(){
    this.changeUsername = this._formBuilder.group({
      username: ['', Validators.required]
    })
  }

  get f(){
    return this.password.controls;
  }

  onSavePassword(){
    this.isPassword = true;
    if(this.password.invalid){
      return;
    }
    console.log(this.password.value);
    this.authService.changePassword(this.password.value).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/login'])
    },error => {
      console.log(error)
    })
  }

  get e(){
    return this.changeEmail.controls
  }

  onSaveEmail(){
    this.isEmail = true;
    if(this.changeEmail.invalid){
      return;
    }
    console.log(this.changeEmail.value)
    this.userService.updateUser(this.changeEmail.value).subscribe((data) => {
      console.log(data)
    },error => {
      console.log(error)
    })
  }

  get d(){
    return this.changeUsername.controls
  }

  onSaveUsername(){
    this.isUsername = true;
    if(this.changeUsername.invalid){
      return;
    }
    console.log(this.changeUsername.value)
    this.userService.updateUser(this.changeUsername.value).subscribe((data) => {
      console.log(data)
    },error => {
      console.log(error)
    })
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }

  toggle(no: number){
    this.displayDivNumber = no
  }
}
