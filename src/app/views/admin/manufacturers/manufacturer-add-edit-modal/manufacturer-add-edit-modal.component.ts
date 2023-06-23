import { EventEmitter, Component, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { Helper } from 'src/app/services/helper.service';
import { BsModalRef } from 'ngx-bootstrap/modal'
import { ManufacturerAddEditModalService } from './manufacturer-add-edit-modal.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manufacturer-add-edit-modal',
  templateUrl: './manufacturer-add-edit-modal.component.html',
  styleUrls: ['./manufacturer-add-edit-modal.component.scss']
})
export class ManufacturerAddEditModalComponent implements OnInit {
  @Output() onEventCompleted: EventEmitter<any> = new EventEmitter();
  modalEvent: any;
  manufacturerForm: UntypedFormGroup;

  constructor(
    private _helper:Helper,
    private http: HttpClient,
    private _bsModalRef:BsModalRef,
    private formBuilder: UntypedFormBuilder,
    private _manufacturerAddEditModalService: ManufacturerAddEditModalService){
    this.manufacturerForm = this.formBuilder.group({
      'id':new UntypedFormControl(null),
      'name': new UntypedFormControl(null, [Validators.required]),
      'address':new UntypedFormControl(null,[]),
      'contact_number':new UntypedFormControl(null,[]),
      'country':new UntypedFormControl('India',[]),
      'is_active':new UntypedFormControl(null)
    });
  }

  get id() { return this.manufacturerForm.get('id'); }
  get name() { return this.manufacturerForm.get('name'); }
  get is_active(){return this.manufacturerForm.get('is_active');}
  get address(){return this.manufacturerForm.get('address');}
  get country(){return this.manufacturerForm.get('country');}
  get contact_number(){return this.manufacturerForm.get('contact_number');}

  ngOnInit(): void {
    let details = this._manufacturerAddEditModalService.getData();
    this.modalEvent = details.event;
    if(details.event == 'EDIT'){
      this.manufacturerForm.patchValue({
        id:details.data.id,
        name:details.data.name,
        address:details.data.address,
        country:details.data.country,
        contact_number:details.data.contact_number,
        is_active:details.data.is_active
      });
    }
  }


  async saveManufacturer(formValid:boolean){
    if(formValid){
      const formData: any = this.manufacturerForm.value;
      if(this.modalEvent == 'ADD'){
        let created = await this._manufacturerAddEditModalService.addNewManufacturer(formData);
      }else if(this.modalEvent == 'EDIT'){
        let updated =  await this._manufacturerAddEditModalService.editManufacturer(this.manufacturerForm.value.id,formData);
      }
      this.onEventCompleted.emit(true);
      this.closeModal();
      this.manufacturerForm.reset();
    } else {
      this._helper.markFormGroupTouched(this.manufacturerForm);
    }
  }

  closeModal(){
    this._bsModalRef.hide();
  }
}
