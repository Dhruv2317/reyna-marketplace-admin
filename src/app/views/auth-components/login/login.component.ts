import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { AuthService } from 'src/app/services/auth.service';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Toastr } from 'src/app/services/toastr.service';
import { cryptoHelperService } from 'src/app/services/cryptoHelper.service';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm: UntypedFormGroup = new UntypedFormGroup({
		username: new UntypedFormControl(null, [Validators.required]),
		password: new UntypedFormControl(null, [Validators.required]),
	});

	validate: boolean = false;
	saving: boolean = false;
	isNotValidCredentials: boolean = false;
	isNotActive: boolean = false;
	noAccount: boolean = false;
	error: boolean = false;


	constructor(
		private _router: Router,
		private _toastr: Toastr,
		private _loginService: LoginService,
		private _authService: AuthService,
		private _cryptoHelperService: cryptoHelperService,
	) { }

	ngOnInit() {
		this._authService.clearLoggedInUser();

	}

	get username() { return this.loginForm.get('username'); }
	get password() { return this.loginForm.get('password'); }


	async login(isvalid: boolean) {
		this.validate = true;
		this.saving = false;
		this.isNotValidCredentials = false;
		this.isNotActive = false;
		this.error = false;

		if (isvalid) {
			this.saving = true;
			let formVal = this.loginForm.value;
			let encryptedBody = this._cryptoHelperService.encryptJSON({
				username: formVal.username,
				password: formVal.password,
				grant_type: 'password'
			});

			let body = "data=" + encodeURIComponent(encryptedBody);

			this._loginService.login(body).then(async (result)=>{
				this._authService.setAuthorizationToken(result.access_token);
				this._authService.changeIsLogoutClicked(false);
				let data = await this._loginService.getLoggedInUser();
				if (data && !data.error) {
					this.saving = false;
					this.validate = false;
					if (data.role == 'admin') {
						this._authService.saveUser(data);
						this._router.navigate(['admin', 'dashboard']);
					} else {
						this._authService.removeAuthorizationToken();
						this.saving = false;
						this.validate = false;
					}
				} else {
					this.saving = false;
					this.validate = false;
					this._toastr.showError('Unable to fetch user details');
				}
			}).catch(error=>{
				this.saving = false;
				this.validate = false;
				console.log('errror-',error);
				if (error.error.message == 'INVALID_CREDENTIALS') {
					this.isNotValidCredentials = true;
				} else if (error.error.message == 'ACCOUNT_INACTIVE') {
					this.isNotActive = true;
				}
				else if (error.error.message == 'NO_ACCOUNT') {
					this.noAccount = true;
				}
				else {
					this._toastr.showError('Unable to login');
				}
			});
			
		}
	}

}
