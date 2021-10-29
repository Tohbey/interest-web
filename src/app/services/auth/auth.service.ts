import { Injectable } from '@angular/core';
import { APIS } from '../APIs/apis';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserToken } from 'src/app/model/userToken';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authURL = APIS.authURL;
  private tokenSubject!: BehaviorSubject<UserToken> | null ;
  public token!: Observable<UserToken>
  constructor(private _http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({"Content-Type" : "application/json"})
  }

  login(emailPhoneNumber: string, password: string){
    return this._http.post<UserToken>(this.authURL, {emailPhoneNumber, password})
    .pipe(
      map((token: any) => {
        localStorage.setItem('x-auth-token', token.data)

        return token;
      })
    )
  }

  logout(){
    localStorage.removeItem('x-auth-token');
  }

  public get tokenVlaue(): string{
    return localStorage.getItem('x-auth-token') || "";
  }

  verify(phoneNumber: string, OTPCode: string){
    return this._http.patch<UserToken>(this.authURL+"verify",{phoneNumber, OTPCode})
    .pipe(
      map((token: any) => {
        localStorage.setItem('x-auth-token', token.data)

        return token;
      })
    )
  }

  resentOTP(phoneNumber: string):Observable<any>{
    return this._http.patch<any>(this.authURL+"resendOtp",JSON.stringify(phoneNumber), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  changePassword(passwordObject: any):Observable<any>{
    return this._http.patch<any>(this.authURL+"resendOtp",JSON.stringify(passwordObject), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  isUserLoggedIn(){
    let user = this.tokenVlaue;
    if(user == null) return false
    return true
  }

  handleError(error: { error: { message: any; }; msg: string; status: any; }){
    let errorMessage="";
    if(error.error instanceof ErrorEvent){
      //Get client-side error
      errorMessage = error.msg;
    }else{
      //get serve-side error
      errorMessage = `Error Code: ${error.status}\n Message:${error.error.message}`;
      }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}

