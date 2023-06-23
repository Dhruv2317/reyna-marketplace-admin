import { EventEmitter, Component, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { Helper } from 'src/app/services/helper.service';
import { BsModalRef } from 'ngx-bootstrap/modal'
import { ShippingInsuranceAddEditModalService } from './shipping_insurance-add-edit-modal.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shipping_insurance-add-edit-modal',
  templateUrl: './shipping_insurance-add-edit-modal.component.html',
  styleUrls: ['./shipping_insurance-add-edit-modal.component.scss']
})
export class ShippingInsuranceAddEditModalComponent implements OnInit {
  @Output() onEventCompleted: EventEmitter<any> = new EventEmitter();
  modalEvent: any;
  shippingInsuranceForm: UntypedFormGroup;
  countriesList:any[]=[];

  constructor(
    private _helper:Helper,
    private http: HttpClient,
    private _bsModalRef:BsModalRef,
    private formBuilder: UntypedFormBuilder,
    private _manufacturerAddEditModalService: ShippingInsuranceAddEditModalService){
    this.shippingInsuranceForm = this.formBuilder.group({
      'id':new UntypedFormControl(null),
      'name': new UntypedFormControl(null, [Validators.required]),
      'attribute':new UntypedFormControl(null,[]),
      'description':new UntypedFormControl(null,[Validators.required]),
      'home':new UntypedFormControl(null,[Validators.required]),
      'parcel':new UntypedFormControl(null,[Validators.required]),
      'currency':new UntypedFormControl(null,[Validators.required]),
      'country_code':new UntypedFormControl(null,[Validators.required])
    });
  }

  get id() { return this.shippingInsuranceForm.get('id'); }
  get name() { return this.shippingInsuranceForm.get('name'); }
  get attribute(){return this.shippingInsuranceForm.get('attribute');}
  get description(){return this.shippingInsuranceForm.get('description');}
  get home(){return this.shippingInsuranceForm.get('home');}
  get parcel(){return this.shippingInsuranceForm.get('parcel');}
  get currency(){return this.shippingInsuranceForm.get('currency');}
  get country_code(){return this.shippingInsuranceForm.get('country_code');}

  ngOnInit(): void {
    let details = this._manufacturerAddEditModalService.getData();
    console.log('details=',details);
    this.countriesList = details.countriesList;
    this.modalEvent = details.event;
    if(details.event == 'EDIT'){
      this.shippingInsuranceForm.patchValue({
        id:details.data.id,
        name:details.data.name,
        attribute:details.data.attribute,
        description:details.data.description,
        home:details.data.home,
        parcel:details.data.parcel,
        currency:details.data.currency,
        country_code:details.data.country_code
      });
    }
  }


  async saveInsurance(formValid:boolean){
    if(formValid){
      const formData: any = this.shippingInsuranceForm.value;
      if(this.modalEvent == 'ADD'){
        let created = await this._manufacturerAddEditModalService.addNewShippingInsurance(formData);
      }else if(this.modalEvent == 'EDIT'){
        let updated =  await this._manufacturerAddEditModalService.editShippingInsurance(this.shippingInsuranceForm.value.id,formData);
      }
      this.onEventCompleted.emit(true);
      this.closeModal();
      this.shippingInsuranceForm.reset();
    } else {
      this._helper.markFormGroupTouched(this.shippingInsuranceForm);
    }
  }

  closeModal(){
    this._bsModalRef.hide();
  }
}
