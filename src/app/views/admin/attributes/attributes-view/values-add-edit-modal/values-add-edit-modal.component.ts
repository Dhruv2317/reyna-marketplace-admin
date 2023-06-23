import { EventEmitter, Component, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder, FormArray } from '@angular/forms';
import { Helper } from 'src/app/services/helper.service';
import { BsModalRef } from 'ngx-bootstrap/modal'
import { ValuesAddEditModalService } from './values-add-edit-modal.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-values-add-edit-modal',
  templateUrl: './values-add-edit-modal.component.html',
  styleUrls: ['./values-add-edit-modal.component.scss']
})
export class ValuesAddEditModalComponent implements OnInit {
  @Output() onEventCompleted: EventEmitter<any> = new EventEmitter();
  modalEvent: any;
  AttributesForm: UntypedFormGroup;

  imageUrl: any = '../../../../../assets/img/no_preview.png';
  selectedImageFile: any
  attributesData:any[]=[];
  subcategoryDetails:any;

  constructor(
    private _http: HttpClient,
    private _helper:Helper,
    private _bsModalRef:BsModalRef,
    private formBuilder: UntypedFormBuilder,
    private _changeDetectorRef:ChangeDetectorRef,
    private _addEditModalService: ValuesAddEditModalService){
    this.AttributesForm = this.formBuilder.group({
      'attribute_id':new UntypedFormControl(null, []),
      'id':new UntypedFormControl(null, []),
      'name': new UntypedFormControl(null, [Validators.required]),
      'name_fr': new UntypedFormControl(null,[]),
      'name_nl': new UntypedFormControl(null,[]),
      'name_es': new UntypedFormControl(null,[]),
      'name_pt': new UntypedFormControl(null,[]),
      'is_active': new UntypedFormControl(null, []),
      'image_url': new UntypedFormControl(null, []),
    });
  }

  get id() { return this.AttributesForm.get('id'); }
  get attribute_id() { return this.AttributesForm.get('attribute_id'); }
  get name() { return this.AttributesForm.get('name'); }
  get name_fr() { return this.AttributesForm.get('name_fr'); }
  get name_nl() { return this.AttributesForm.get('name_nl'); }
  get name_es() { return this.AttributesForm.get('name_es'); }
  get name_pt() { return this.AttributesForm.get('name_pt'); }
  get is_active() { return this.AttributesForm.get('is_active'); }
  get image_url() { return this.AttributesForm.get('image_url'); }

  ngOnInit(): void {
    let details = this._addEditModalService.getData();
    this.modalEvent = details.event;
    if(details.event == 'ADD'){
      this.AttributesForm.patchValue({
        attribute_id:details.data.attribute_id
      });
    }
    if(details.event == 'EDIT'){
      this.getAttributeValueDetails(details.data.id);
    }
  }

  async saveAttributeValue(formValid:boolean){
    if(formValid){
      const formData: FormData = new FormData();
      formData.append('attribute_value', JSON.stringify(this.AttributesForm.value));
      if(this.selectedImageFile){
        formData.append('image_url', this.selectedImageFile);
      }
      if(this.modalEvent == 'ADD'){
        let create = await  this._addEditModalService.addNewValues(formData);
      } else if (this.modalEvent == 'EDIT'){
        let update = await  this._addEditModalService.editValues(this.AttributesForm.value.id,formData);
      }
      this.onEventCompleted.emit(true);
      this.closeModal();
      this.AttributesForm.reset();
    } else {
      this._helper.markFormGroupTouched(this.AttributesForm);
    }
  }

  onFileChange(event:any, type: string){
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (type == 'IMAGE'){
          this.imageUrl = reader.result;
          this.selectedImageFile = file;
        }
        this._changeDetectorRef.markForCheck();
      }
    }
  }

  getAttributeValueDetails(id:number){
    const url = 'api/admin/attributes_values/view/'+id;
    this._http.get(url).subscribe((res: any) => {
      this.subcategoryDetails = res;
      this.patchFormValue();
    },(err) => {
      this.subcategoryDetails = null;
    });
  }

  patchFormValue(){
    this.AttributesForm.patchValue({
      id:this.subcategoryDetails.id,
      attribute_id:this.subcategoryDetails.attribute_id,
      name:this.subcategoryDetails.name,
      name_fr:this.subcategoryDetails.name_fr,
      name_nl:this.subcategoryDetails.name_nl,
      name_es:this.subcategoryDetails.name_es,
      name_pt:this.subcategoryDetails.name_pt,
      is_active:this.subcategoryDetails.is_active,
      image_url:this.subcategoryDetails.image
    });
    this.imageUrl = this.subcategoryDetails.image ? environment.api_url + this.subcategoryDetails.image : `../../../../../assets/img/no_preview.png`;
  }

  closeModal(){
    this._bsModalRef.hide();
  }
}
