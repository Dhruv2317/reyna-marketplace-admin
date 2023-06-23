import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Toastr } from 'src/app/services/toastr.service';
import { Helper } from '../../../../services/helper.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  editPatient: UntypedFormGroup;
  customerLoaded=false;
  customerId: string;

  countriesList:any[] = [];
  statesList:any[] = [];
  citiesList:any[] = [];

  constructor(
    public http: HttpClient,
    private route: ActivatedRoute,
    private _toastr: Toastr,
    private _router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
    private helper: Helper
  ) {
    this.customerId = this.route.snapshot.params.id;
    this.editPatient = new UntypedFormGroup({
      'first_name': new UntypedFormControl(null, [Validators.required]),
      'last_name': new UntypedFormControl(null, [Validators.required]),
      'gender': new UntypedFormControl(null, [Validators.required]),
      'date_of_birth': new UntypedFormControl(null, [Validators.required]),
      'email': new UntypedFormControl(null, [Validators.required]),
      'cell_phone_number': new UntypedFormControl(null, [Validators.required])
    });
  }

  ngOnInit(){
    this.getCountries();
    this.getCustomerDetails();
  }

  get first_name() { return this.editPatient.get('first_name'); }
  get last_name() { return this.editPatient.get('last_name'); }
  get gender() { return this.editPatient.get('gender'); }
  get date_of_birth() { return this.editPatient.get('date_of_birth'); }
  get email() { return this.editPatient.get('email'); }
  get cell_phone_number() { return this.editPatient.get('cell_phone_number'); }

  getCustomerDetails(){
    const url = 'api/admin/users/view/' + this.customerId;
    this.http.get(url).subscribe((customer: any) => {

      this.editPatient.patchValue({
        id: customer.id,
        first_name:customer.first_name,
        last_name: customer.last_name,
        gender: customer.gender,
        date_of_birth: this.setBirthDate(customer.date_of_birth),
        email:customer.email,
        cell_phone_number: customer.cell_phone_number
      });
        this.customerLoaded = true;
      }, (err:any) =>{
        this.customerLoaded = false;
      });
  }

  setBirthDate(date: any) {
    return moment(date).toISOString();
  }

  savePatient() {
    if (this.editPatient.invalid) {
      this.helper.markFormGroupTouched(this.editPatient);
      return;
    }

    const url = 'api/customers/update/' + this.customerId;
    this.http.post(url,this.editPatient.value).subscribe((res: any) => {
        if (res != null) {

            this._router.navigate(['admin', 'customers', 'view', this.customerId, 'orders']);
            this._toastr.showSuccess('Save Successfully');

        }
        this._changeDetectorRef.detectChanges();
      },
      (err:any) => {
        this._toastr.showError('Unable to save Customer details.');
      }
    );
  }

  dateChange(event:any){
    this.editPatient.patchValue({
      date_of_birth:this.setBirthDate(event.value)
    });
  }

  private async getCountries() {
    this.http.get<any>('api/geo/countries').subscribe((resp) => {
      this.countriesList = resp;
    }, err=> {

    });
  }

  async getStatesByCoutry(country_id:number){
    // Get States List
    this.http.get<any>('api/geo/states/'+country_id).subscribe((resp) => {
      this.statesList = resp;
    }, err=> {

    });
  }

  async getCitiesByState(state_id:number){
    this.http.get<any>('api/geo/cities/'+state_id).subscribe((resp) => {
      this.citiesList = resp;
    }, err=> {

    });
  }

}
