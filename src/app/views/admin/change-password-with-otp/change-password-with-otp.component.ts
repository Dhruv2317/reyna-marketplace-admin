import { Component, OnInit } from '@angular/core';
import { Toastr } from 'src/app/services/toastr.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password-with-otp',
  templateUrl: './change-password-with-otp.component.html',
  styleUrls: ['./change-password-with-otp.component.scss']
})
export class ChangePasswordWithOtpComponent implements OnInit {
  submitted: boolean = false;
  changePasswordForm: UntypedFormGroup;
  otpGenerated: boolean = false;
  RegExpValidator = {
		'lowerCase': RegExp(/^(?=.*?[a-z])/),
		'upperCase': RegExp(/^(?=.*?[A-Z])/),
		'digit': RegExp(/^(?=.*?[0-9])/),
		'specialChar': RegExp(/^(?=.*?[" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"])/),
	}
	validatorsArray: any[] = [];

  password = {
    'new': '',
    'otp': ''
  };
  constructor(
    private _toaster: Toastr,
    private _authService: AuthService,
    private _http: HttpClient,
    private _router: Router) {

    this.changePasswordForm = new UntypedFormGroup({
      'newPassword': new UntypedFormControl(this.password.new,[]),
      'otp': new UntypedFormControl(this.password.otp, null),
    });
  }

  ngOnInit(){
    this.setRulesAndValidators();
  }


  setRulesAndValidators(): void {
		this.validatorsArray = []
		this.validatorsArray.push(Validators.required);
		this.validatorsArray.push(Validators.minLength(8));
		this.validatorsArray.push(Validators.maxLength(30));
		this.validatorsArray.push(Validators.pattern(this.RegExpValidator.lowerCase))
		this.validatorsArray.push(Validators.pattern(this.RegExpValidator.upperCase))
		this.validatorsArray.push(Validators.pattern(this.RegExpValidator.digit))
		this.validatorsArray.push(Validators.pattern(this.RegExpValidator.specialChar))
		let formElement = this.changePasswordForm.get('newPassword');
    if(formElement){
      formElement.setValidators(Validators.compose([...this.validatorsArray]));
    }
	}

  get newPassword() { return this.changePasswordForm.get('newPassword'); }
  get otp() { return this.changePasswordForm.get('otp'); }

  async getOTP() {
    let reqbody:any = {};
    let user = this._authService.loggedInUser;
    reqbody['temp_password'] = this.password['new'];

    this._http.post(`api/auth/reset-password-request`, reqbody).subscribe((data:any) => {
       switch (data['status']) {
        case 'OTP_GENERATED':
          this._toaster.showSuccess('OTP sent successfully');
          let otp_input = this.changePasswordForm.get('otp');
          if(otp_input){otp_input.setValidators([Validators.required]);}
          this.otpGenerated = true;
          break;
        case 'INVALID_REQUEST':
          this._toaster.showError('Unable to send OTP, Please try again after some time.');
          break;
        case 'LAST_PASSWORD':
          this._toaster.showError('Password can not be same as previous passwords.');
          break;
        default:
          this._toaster.showError('Please try again after some time.');
          break;
      }
    }, (err:any) => {
      switch (err.error['status']) {
        case 'INVALID_REQUEST':
          this._toaster.showError('Unable to send OTP, Please try again after some time.');
          break;
        case 'LAST_PASSWORD':
          this._toaster.showError('Password can not be same as previous passwords.');
          break;
        default:
          this._toaster.showError('Please try again after some time.');
          break;
      }
    });
  }

  async changePassword(): Promise<any> {
    this.submitted = true;
    let reqbody:any = {};
    reqbody['temp_password'] = this.password['new'];
    reqbody['otp'] = this.password['otp'];
    this._http.post(`api/auth/verify-otp`, reqbody).subscribe((data:any) => {
      switch (data['status']) {
        case 'PASSWORD_CHANGED':
          this._toaster.showSuccess('Password changed successfully , Please Login ');
          this._authService.changeIsLogoutClicked(true);
          this._authService.clearStorage();
          this._router.navigate(['account','login']);
          break;
        case 'OTP_EXPIRED':
          this._toaster.showError('OTP is expired, Please try again.');
          break;
        case 'INVALID_OTP':
          this._toaster.showError('Invalid OTP, Try again.');
          break;
        case 'INVALID_REQUEST':
          this._toaster.showError('Unable to update password, Please try again.');
          break;
        default:
          this._toaster.showError('Unable to save changes');
          break;
      }
    }, (err:any) => {
      if (err.error['status'] == 'OTP_EXPIRED') {
        this._toaster.showError('OTP is expired, Please try again.');
      } else if (err.error['status'] == 'INVALID_REQUEST') {
        this._toaster.showError('Unable to update password, Please try again.');
      } else if (err.error['status'] == 'INVALID_OTP') {
        this._toaster.showError('Invalid OTP, Try again.');
      } else {
        this._toaster.showError('Unable to save changes.');
      }
    });
  }

}
