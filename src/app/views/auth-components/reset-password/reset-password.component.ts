import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ResetPasswordService } from "./reset-password.service";
import { Toastr } from "src/app/services/toastr.service";
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"]
})
export class ResetPasswordComponent implements OnInit {
  token: any;
  invalidToken: boolean=false;
  saving: boolean=false;
  submitted: boolean=false;
  resetPasswordForm:UntypedFormGroup;

  RegExpValidator = {
		'lowerCase': RegExp(/^(?=.*?[a-z])/),
		'upperCase': RegExp(/^(?=.*?[A-Z])/),
		'digit': RegExp(/^(?=.*?[0-9])/),
		'specialChar': RegExp(/^(?=.*?[" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"])/),
	}
	validatorsArray: any[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _resetPasswordService: ResetPasswordService,
    private _toastr: Toastr,
    private _router: Router){
    this._route.params.subscribe(params => {
      this.token = params["token"];
    });
    this.resetPasswordForm = new UntypedFormGroup({
      password:new UntypedFormControl(null,[]),
      confirmPassword:new UntypedFormControl(null,[Validators.required])
    });
  }

  get password(){return this.resetPasswordForm.get('password');}
  get confirmPassword(){return this.resetPasswordForm.get('confirmPassword');}

  ngOnInit() {
    this.checkUsername();
    this.setRulesAndValidators();
  }

  async checkUsername(){
    let result = await this._resetPasswordService.checkUsername(this.token);
    if (!result){
      this.invalidToken = true;
    }
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
		let formElement = this.resetPasswordForm.get('password');
    if(formElement){
      formElement.setValidators(Validators.compose([...this.validatorsArray]));
    }
	}

  async resetPassword(){
    if(this.resetPasswordForm.valid){
        this.submitted = true;
        this.saving = true;
        let result = await this._resetPasswordService.resetPassword(this.token,this.resetPasswordForm.value.password);
        if (result) {
          this._toastr.showSuccess("Password has been reset successfully");
          this._router.navigate(["account","login"]);
          this.saving = false;
        } else {
          this.saving = false;
        }
    } else {
      this.saving = false;
    }
  }

}
