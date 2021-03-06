import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login!: FormGroup;
  submitLogin = false;
  isError:boolean = false;
  errorMsg!:any;

  constructor(private _formBuilder: FormBuilder, private _router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm();
  }

  loginForm(){
    this.login = this._formBuilder.group({
      emailPhoneNumber: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f(){
    return this.login.controls;
  }

  signIn(){
    this.submitLogin  = true;
    if(this.login.invalid){
      return;
    }
    this.authService.login(this.login.get('emailPhoneNumber')?.value, this.login.get('password')?.value)
    .pipe(first())
    .subscribe(
      data => {
        this._router.navigate(['../home'])
      },error => {
        this.isError = true
        this.errorMsg = error
        console.log('erro',this.errorMsg)
        console.log(this.errorMsg.error.msg)
      }
    )
  }
}
