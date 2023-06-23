import { EventEmitter, Component, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { Helper } from 'src/app/services/helper.service';
import { BsModalRef } from 'ngx-bootstrap/modal'
import { ShippingPricingAddEditModalService } from './shipping_pricing-add-edit-modal.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shipping_pricing-add-edit-modal',
  templateUrl: './shipping_pricing-add-edit-modal.component.html',
  styleUrls: ['./shipping_pricing-add-edit-modal.component.scss']
})
export class ShippingPricingAddEditModalComponent implements OnInit {
  @Output() onEventCompleted: EventEmitter<any> = new EventEmitter();
  modalEvent: any;
  shippingPricingForm: UntypedFormGroup;
  countriesList:any[]=[];

  constructor(
    private _helper:Helper,
    private http: HttpClient,
    private _bsModalRef:BsModalRef,
    private formBuilder: UntypedFormBuilder,
    private _shippingPricingAddEditModalService: ShippingPricingAddEditModalService){
    this.shippingPricingForm = this.formBuilder.group({
      'id':new UntypedFormControl(null),
      'min_shipping_weight': new UntypedFormControl(null, [Validators.required]),
      'max_shipping_weight':new UntypedFormControl(null,[]),
      'home':new UntypedFormControl(null,[Validators.required]),
      'parcel':new UntypedFormControl(null,[Validators.required]),
      'retour':new UntypedFormControl(null,[Validators.required]),
      'currency':new UntypedFormControl(null,[Validators.required]),
      'country':new UntypedFormControl(null,[Validators.required]),
      'country_code':new UntypedFormControl(null,[Validators.required])
    });
  }

  get id() { return this.shippingPricingForm.get('id'); }
  get min_shipping_weight() { return this.shippingPricingForm.get('min_shipping_weight'); }
  get max_shipping_weight(){return this.shippingPricingForm.get('max_shipping_weight');}
  get retour(){return this.shippingPricingForm.get('retour');}
  get home(){return this.shippingPricingForm.get('home');}
  get parcel(){return this.shippingPricingForm.get('parcel');}
  get currency(){return this.shippingPricingForm.get('currency');}
  get country_code(){return this.shippingPricingForm.get('country_code');}

  ngOnInit(): void {
    let details = this._shippingPricingAddEditModalService.getData();
    console.log('details=',details);
    this.countriesList = details.countriesList;
    this.modalEvent = details.event;
    if(details.event == 'EDIT'){
      this.shippingPricingForm.patchValue({
        id:details.data.id,
        min_shipping_weight:details.data.min_shipping_weight,
        max_shipping_weight:details.data.max_shipping_weight,
        description:details.data.description,
        home:details.data.home,
        parcel:details.data.parcel,
        retour:details.data.retour,
        currency:details.data.currency,
        country_code:details.data.country_code
      });
    }
  }


  async savePricing(formValid:boolean){
    if(formValid){
      const formData: any = this.shippingPricingForm.value;
      if(this.modalEvent == 'ADD'){
        let created = await this._shippingPricingAddEditModalService.addNewShippingPricing(formData);
      }else if(this.modalEvent == 'EDIT'){
        let updated =  await this._shippingPricingAddEditModalService.editShippingPricing(this.shippingPricingForm.value.id,formData);
      }
      this.onEventCompleted.emit(true);
      this.closeModal();
      this.shippingPricingForm.reset();
    } else {
      this._helper.markFormGroupTouched(this.shippingPricingForm);
    }
  }

  handleChange(e:any){
    let value = e.target.value;
    let countryFound = this.countriesList.find((c)=>c.iso2 == value);
    this.shippingPricingForm.patchValue({
        country:countryFound.name
    });
  }

  closeModal(){
    this._bsModalRef.hide();
  }
}
