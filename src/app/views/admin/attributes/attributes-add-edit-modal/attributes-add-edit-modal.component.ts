import { EventEmitter, Component, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder, FormArray } from '@angular/forms';
import { Helper } from 'src/app/services/helper.service';
import { BsModalRef } from 'ngx-bootstrap/modal'
import { AttributesAddEditModalService } from './attributes-add-edit-modal.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-attributes-add-edit-modal',
  templateUrl: './attributes-add-edit-modal.component.html',
  styleUrls: ['./attributes-add-edit-modal.component.scss']
})
export class AttributesAddEditModalComponent implements OnInit {
  @Output() onEventCompleted: EventEmitter<any> = new EventEmitter();
  modalEvent: any;
  attributesForm: UntypedFormGroup;
  imageUrl: any = '../../../../../assets/img/no_preview.png';
  selectedImageFile: any
  attributeDetails: any;
  attributesData: any[] = [];

  constructor(
    private _http: HttpClient,
    private _helper: Helper,
    private _bsModalRef: BsModalRef,
    private formBuilder: UntypedFormBuilder,
    private _changeDetectorRef: ChangeDetectorRef,
    private _tcAddEditModalService: AttributesAddEditModalService) {

    this.attributesForm = this.formBuilder.group({
      'id': new UntypedFormControl(null, []),
      'name': new UntypedFormControl(null, [Validators.required]),
      'is_active': new UntypedFormControl(null, []),
      // 'name_fr': new UntypedFormControl(null,[]),
      // 'name_nl': new UntypedFormControl(null,[]),
      // 'name_es': new UntypedFormControl(null,[]),
      // 'name_pt': new UntypedFormControl(null,[]),
      'element_type': new UntypedFormControl('dropdown', [Validators.required])
    });
  }

  get id() { return this.attributesForm.get('id'); }
  get name() { return this.attributesForm.get('name'); }
  get is_active() { return this.attributesForm.get('is_active'); }
  get name_fr() { return this.attributesForm.get('name_fr'); }
  get name_nl() { return this.attributesForm.get('name_nl'); }
  get name_es() { return this.attributesForm.get('name_es'); }
  get name_pt() { return this.attributesForm.get('name_pt'); }
  get element_type() { return this.attributesForm.get('element_type'); }

  ngOnInit(): void {
    let details = this._tcAddEditModalService.getData();
    this.modalEvent = details.event;
    if (details.event == 'EDIT') {
      this.getAttributeDetails(details.data.id);
    }
  }

  getAttributeDetails(id: number) {
    const url = environment.api_url+'api/Attribute/GetAttributeById?id=' + id;
    this._http.get(url).subscribe((res: any) => {
      this.attributeDetails = res.data;
      this.patchFormValue();
    }, (err) => {
      this.attributeDetails = null;
    });
  }

  patchFormValue() {
    this.attributesForm.patchValue({
      id: this.attributeDetails.id,
      name: this.attributeDetails.name,
      element_type: this.attributeDetails.inputType,
      is_active: this.attributeDetails.isActive,
      // name_fr:this.attributeDetails.name_fr,
      // name_nl:this.attributeDetails.name_nl,
      // name_es:this.attributeDetails.name_es,
      // name_pt:this.attributeDetails.name_pt
    });
  }

  async saveAttribute(formValid: boolean) {
    if (formValid) {
      var formValues = this.attributesForm.value;
      var attributeModel: any = {};
      attributeModel.name = formValues.name;
      attributeModel.inputType = formValues.element_type;
      attributeModel.isActive = formValues.is_active;
      if (this.modalEvent == 'ADD') {
        attributeModel.id = 0;
        let create = await this._tcAddEditModalService.addNewAttributes(attributeModel);
      } else if (this.modalEvent == 'EDIT') {
        attributeModel.id = this.attributeDetails.id;

        // let update = await this._tcAddEditModalService.editAttributes(this.attributesForm.value.id, this.attributesForm.value);
        let update = await this._tcAddEditModalService.addNewAttributes(attributeModel);

      }
      this.onEventCompleted.emit(true);
      this.closeModal();
      this.attributesForm.reset();
    } else {
      this._helper.markFormGroupTouched(this.attributesForm);
    }
  }


  closeModal() {
    this._bsModalRef.hide();
  }
}
