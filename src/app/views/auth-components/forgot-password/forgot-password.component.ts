import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Toastr } from 'src/app/services/toastr.service';
import { HttpClient } from '@angular/common/http';
import {GolfedApiEndpoints} from 'src/app/constants/GolfedApiEndpoints';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  saving:boolean=false;
  forgotPasswordForm:UntypedFormGroup;
  constructor(
    private _toaster: Toastr,
    private _http: HttpClient) {

		this.forgotPasswordForm = new UntypedFormGroup({
			email: new UntypedFormControl(null, [Validators.required, Validators.email])
		});
  }

  get email(){return this.forgotPasswordForm.get('email')}

  ngOnInit() {
  }

  async handleSubmit(isValid:boolean){
    console.log('this.forgotPasswordForm value =',this.forgotPasswordForm.value);
		if (isValid){
			this.saving = true;
			let result = await this.forgotPassword(this.forgotPasswordForm.value.email);
			if(result){
         this._toaster.showSuccess('Password reset link has been send to given email address .')
      }else{
        this._toaster.showError('Error occured while sending email');
      }
      this.saving = false;
		}else{
      this.saving = false;
    }
  }

  async forgotPassword(username: string) {
    var result = await this._http
      .post<any>(GolfedApiEndpoints.FORGOT_PASSWORD, { email: username })
      .toPromise();
    return result;
  }

}
