import { EventEmitter, Component, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { Helper } from 'src/app/services/helper.service';
import { BsModalRef } from 'ngx-bootstrap/modal'
import { FAQGroupAddEditModalService } from './faq-group-add-edit-modal.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-faq-group-add-edit-modal',
  templateUrl: './faq-group-add-edit-modal.component.html',
  styleUrls: ['./faq-group-add-edit-modal.component.scss']
})
export class FAQGroupAddEditModalComponent implements OnInit {
  @Output() onEventCompleted: EventEmitter<any> = new EventEmitter();
  modalEvent: any;
  manufacturerForm: UntypedFormGroup;

  constructor(
    private _helper:Helper,
    private http: HttpClient,
    private _bsModalRef:BsModalRef,
    private formBuilder: UntypedFormBuilder,
    private _manufacturerAddEditModalService: FAQGroupAddEditModalService){
    this.manufacturerForm = this.formBuilder.group({
      'id':new UntypedFormControl(null),
      'name': new UntypedFormControl(null, [Validators.required]),
      'heading':new UntypedFormControl(null,[]),
      'subheading':new UntypedFormControl(null,[]),

      'name_fr': new UntypedFormControl(null, []),
      'heading_fr':new UntypedFormControl(null,[]),
      'subheading_fr':new UntypedFormControl(null,[]),

      'name_nl': new UntypedFormControl(null, []),
      'heading_nl':new UntypedFormControl(null,[]),
      'subheading_nl':new UntypedFormControl(null,[]),

      'name_es': new UntypedFormControl(null, []),
      'heading_es':new UntypedFormControl(null,[]),
      'subheading_es':new UntypedFormControl(null,[]),

      'name_pt': new UntypedFormControl(null, []),
      'heading_pt':new UntypedFormControl(null,[]),
      'subheading_pt':new UntypedFormControl(null,[]),
    });
  }

  get id() { return this.manufacturerForm.get('id'); }
  get name() { return this.manufacturerForm.get('name'); }
  get heading(){return this.manufacturerForm.get('heading');}
  get subheading(){return this.manufacturerForm.get('subheading');}

  get name_fr() { return this.manufacturerForm.get('name_fr'); }
  get heading_fr(){return this.manufacturerForm.get('heading_fr');}
  get subheading_fr(){return this.manufacturerForm.get('subheading_fr');}

  get name_nl() { return this.manufacturerForm.get('name_nl'); }
  get heading_nl(){return this.manufacturerForm.get('heading_nl');}
  get subheading_nl(){return this.manufacturerForm.get('subheading_nl');}

  get name_es() { return this.manufacturerForm.get('name_es'); }
  get heading_es(){return this.manufacturerForm.get('heading_es');}
  get subheading_es(){return this.manufacturerForm.get('subheading_es');}
  
  get name_pt() { return this.manufacturerForm.get('name_pt'); }
  get heading_pt(){return this.manufacturerForm.get('heading_pt');}
  get subheading_pt(){return this.manufacturerForm.get('subheading_pt');}

  ngOnInit(): void {
    let details = this._manufacturerAddEditModalService.getData();
    this.modalEvent = details.event;
    if(details.event == 'EDIT'){
      this.manufacturerForm.patchValue({
        id:details.data.id,
        name:details.data.name,
        heading:details.data.heading,
        subheading:details.data.subheading,

        name_fr:details.data.name_fr,
        heading_fr:details.data.heading_fr,
        subheading_fr:details.data.subheading_fr,
        
        name_nl:details.data.name_nl,
        heading_nl:details.data.heading_nl,
        subheading_nl:details.data.subheading_nl,

        name_es:details.data.name_es,
        heading_es:details.data.heading_es,
        subheading_es:details.data.subheading_es,

        name_pt:details.data.name_pt,
        heading_pt:details.data.heading_pt,
        subheading_pt:details.data.subheading_pt
      });
    }
  }


  async saveManufacturer(formValid:boolean){
    if(formValid){
      const formData: any = this.manufacturerForm.value;
      if(this.modalEvent == 'ADD'){
        let created = await this._manufacturerAddEditModalService.addNewFAQGroup(formData);
      }else if(this.modalEvent == 'EDIT'){
        let updated =  await this._manufacturerAddEditModalService.editFAQGroup(this.manufacturerForm.value.id,formData);
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
