import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  otp!: string;
  phoneNumber!: string
  isSubmitted: boolean = true
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
  isError: boolean = false;
  errorMsg!: any;
  constructor(private _router: Router,
    private _activatedRoute: ActivatedRoute, private authService: AuthService) { }

  onOtpChange(otp: string) {
    this.otp = otp;
  }

  setVal(val: any) {
    this.ngOtpInput.setValue(val);
  }

  ngOnInit(): void {
    this.phoneNumber = this._activatedRoute.snapshot.paramMap.get('phoneNumber') || "";
  }

  onVerify(){
    this.authService.verify(this.phoneNumber, this.otp).pipe(first())
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
