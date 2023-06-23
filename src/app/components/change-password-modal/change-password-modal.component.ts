import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal'
import { Toastr } from 'src/app/services/toastr.service';
import { Helper } from 'src/app/services/helper.service';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss']
})
export class ChangePasswordModalComponent implements OnInit {
  editPassword: UntypedFormGroup;
  customerId: string;

  showDetails = true;
  passwordStrengthBar = false;
  RegExpValidator = {
		'lowerCase': RegExp(/^(?=.*?[a-z])/),
		'upperCase': RegExp(/^(?=.*?[A-Z])/),
		'digit': RegExp(/^(?=.*?[0-9])/),
		'specialChar': RegExp(/^(?=.*?[" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"])/),
	}
	validatorsArray: any[] = [];

  constructor(
    private _bsModalRef:BsModalRef,
    public http: HttpClient,
    private route: ActivatedRoute,
    private _toastr: Toastr,
    private _router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
    private helper: Helper
  ) {
    this.customerId = this.route.snapshot.params.id;
    this.editPassword = new UntypedFormGroup({
      'password': new UntypedFormControl('', []),
    });
  }

  ngOnInit() {
    this.setRulesAndValidators();
  }

  get password() { return this.editPassword.get('password'); }

  copyInputMessage(inputElement: any){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  savePassword(valid:boolean) {
    if(!valid){
      this.helper.markFormGroupTouched(this.editPassword);
      return;
    }

    const url = 'api/customer/update/password/' + this.customerId;
    const data ={
      'password': this.editPassword.value.password,
      'user_id':this.customerId
    }

    this.http.post(url, data).subscribe(
      (res: any) => {
        if (res != null) {


            this._router.navigate(['admin', 'customers', 'view', this.customerId, 'orders']);
            this._toastr.showSuccess('User Account Password updated Successfully');

        }
        this._changeDetectorRef.detectChanges();

      },
      (err:any) => {
        this._toastr.showError('Unable to update User Account Password');
        this._changeDetectorRef.detectChanges();
      }
    );
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

    let passwordControl = this.editPassword.get('password');
		passwordControl? passwordControl.setValidators(Validators.compose([...this.validatorsArray])):'';
	}

  onStrengthChanged(strength: number) {
		if (strength === 100) {
			this.passwordStrengthBar = true;
		}
		this._changeDetectorRef.detectChanges();
	}

  preventSpace(event:any){
		const charCode = (event.which) ? event.which : event.keyCode;
		if (charCode == 32){
			return;
		}
	}

  closeModal(){
    this._bsModalRef.hide()
  }

}
