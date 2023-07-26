import { EventEmitter, Component, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder, UntypedFormArray } from '@angular/forms';
import { Helper } from 'src/app/services/helper.service';
import { BsModalRef } from 'ngx-bootstrap/modal'
import { CategoriesAddEditModalService } from './categories-add-edit-modal.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categories-add-edit-modal',
  templateUrl: './categories-add-edit-modal.component.html',
  styleUrls: ['./categories-add-edit-modal.component.scss']
})
export class CategoriesAddEditModalComponent implements OnInit {
  @Output() onEventCompleted: EventEmitter<any> = new EventEmitter();
  modalEvent: any;
  treatmentConditionForm: UntypedFormGroup;

  imageUrl: any = '../../../../../assets/img/no_preview.png';
  selectedImageFile: any
  categoryDetails: any;
  attributesData: any[] = [];


  constructor(
    private _http: HttpClient,
    private _helper: Helper,
    private _bsModalRef: BsModalRef,
    private formBuilder: UntypedFormBuilder,
    private _changeDetectorRef: ChangeDetectorRef,
    private _tcAddEditModalService: CategoriesAddEditModalService) {
    this.getAllAttributesData();

    this.treatmentConditionForm = this.formBuilder.group({
      'id': new UntypedFormControl(0, []),
      'name': new UntypedFormControl(null, [Validators.required]),
      'name_ar': new UntypedFormControl(null,[]),
      'is_active': new UntypedFormControl(false, []),
      'description': new UntypedFormControl(null, []),
      'description_ar': new UntypedFormControl(null,[]),
      'image_url': new UntypedFormControl(null, []),
    });
  }

  get id() { return this.treatmentConditionForm.get('id'); }
  get name() { return this.treatmentConditionForm.get('name'); }
  get name_ar() { return this.treatmentConditionForm.get('name_ar'); }
  get is_active() { return this.treatmentConditionForm.get('is_active'); }
  get description() { return this.treatmentConditionForm.get('description'); }
  get description_ar() { return this.treatmentConditionForm.get('description_ar'); }
  get image_url() { return this.treatmentConditionForm.get('image_url'); }

  ngOnInit(): void {
    let details = this._tcAddEditModalService.getData();
    this.modalEvent = details.event;
    if (details.event == 'EDIT') {
      this.getCategoryDetails(details.data.id);
    }
  }

  getCategoryDetails(id: number) {
    const url = environment.api_url + 'api/Category/GetCategoryById?id=' + id;
    this._http.get(url).subscribe((res: any) => {
      this.categoryDetails = res.data;
      this.patchFormValue();
    }, (err) => {
      this.categoryDetails = null;
    });
  }

  patchFormValue() {
    this.treatmentConditionForm.patchValue({
      id: this.categoryDetails.id,
      category_id: this.categoryDetails.id,
      name: this.categoryDetails.name,
      name_ar:this.categoryDetails.nameAR,
      is_active: this.categoryDetails.isActive,
      description: this.categoryDetails.description,
      description_ar:this.categoryDetails.descriptionAR,
    });
    this.imageUrl = this.categoryDetails.image ? environment.api_url + this.categoryDetails.image : `../../../../../assets/img/no_preview.png`;
    // const attributesControl = this.treatmentConditionForm.get('attributes') as UntypedFormArray;
    // if(this.categoryDetails.attributes){

    //   this.categoryDetails.attributes.forEach((item:any,index:number)=>{
    //     let valArray:any  = [];
    //     item.values.forEach((val:any,valIndex:number)=>{
    //       let chArray :any = [];
    //       if(val.children && val.children.length>0){
    //          val.children.forEach((child:any,childIndex:number)=>{
    //               let childValArray= child.values.slice().map((ch:any)=> ch.attribute_value_id);
    //               let childFormGroup =  new UntypedFormGroup({
    //                 'child_attribute_id': new UntypedFormControl(child.attribute_id, []),
    //                 'child_attribute_values': new UntypedFormControl(childValArray, [])
    //               });
    //               chArray.push(childFormGroup);
    //          });
    //       }
    //       let valFormGroup= new UntypedFormGroup({
    //         'value_id': new UntypedFormControl(val.attribute_value_id, [Validators.required]),
    //         'children':new UntypedFormArray(chArray)
    //       });
    //       valArray.push(valFormGroup);
    //     });
    //     let attributeFormGroup = new UntypedFormGroup({
    //       'attribute_id':new UntypedFormControl(item.attribute_id, [Validators.required]),
    //       'values':new UntypedFormArray(valArray)
    //     });
    //     console.log('attributeFormGroup=',attributeFormGroup);
    //     attributesControl.push(attributeFormGroup);
    //   });
    // }
  }

  getAllAttributesData() {
    const url = 'api/admin/attributes/all';
    this._http.get(url).subscribe((res: any) => {
      this.attributesData = res;
    }, (err) => {
      this.attributesData = [];
    });
  }

  attrChange(index: number, event: any) {
    this.attributes().at(index).patchValue({
      attribute_id: event.value
    });
    let valuesss = this.getValuesFromAttribute('value', event.value);
    this.clearFormArray(this.valuesInputArray(index));
  }

  clearFormArray = (formArray: UntypedFormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  getValuesFromAttribute(key: string, value: number) {
    let attrId = value;
    let values = [];
    if (attrId) {
      let objFound = this.attributesData.find((item: any) => item.id == attrId);
      if (objFound && objFound.id) {
        values = objFound.values;
      } else {
        values = [];
      }
    } else {
      values = [];
    }
    return values;
  }

  childAttrChange(attrIndex: number, valueIndex: number, childIndex: number, event: any) {
    this.childrenArray(attrIndex, valueIndex).at(childIndex).patchValue({
      child_attribute_id: event.value
    });
    let valuesss = this.getValuesFromAttribute('value', event.value);
  }

  childAttrValueChange(attrIndex: number, valueIndex: number, childIndex: number, event: any) {
    this.childrenArray(attrIndex, valueIndex).at(childIndex).patchValue({
      child_attribute_values: event.value
    });
  }

  async saveTreatmentCondition(formValid: boolean) {

    if (formValid) {
      const formData: FormData = new FormData();
      var formResult = this.treatmentConditionForm.value;
      let obj: any = {};

      obj.id = formResult.id;
      obj.name = formResult.name;
      obj.NameAR = formResult.name_ar;
      obj.description = formResult.description;
      obj.descriptionAR = formResult.description_ar;
      obj.isActive = formResult.is_active;
      
      formData.append("Category",JSON.stringify(obj));
      formData.append("image",this.selectedImageFile);

      if (this.modalEvent == 'ADD') {
        obj.id = 0;
        let create = await this._tcAddEditModalService.addNewCategories(formData);
      } else if (this.modalEvent == 'EDIT') {
        obj.id = this.treatmentConditionForm.value.id;
        let update = await this._tcAddEditModalService.editCategories( formData);
      }

      this.onEventCompleted.emit(true);
      this.closeModal();
      this.treatmentConditionForm.reset();
    } else {
      this._helper.markFormGroupTouched(this.treatmentConditionForm);
    }
  }

  onFileChange(event: any, type: string) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (type == 'IMAGE') {
          this.imageUrl = reader.result;
          this.selectedImageFile = file;
          console.log("this.selectedImageFile", this.selectedImageFile);

        }
        this._changeDetectorRef.markForCheck();
      }
    }
  }

  /*-----------------------------ATTRIBUTES --------------------------------*/
  addAttributeInput() {
    this.attributes().push(this.newAttributeInput());
    this.treatmentConditionForm.updateValueAndValidity();
  }

  newAttributeInput(): UntypedFormGroup {
    return new UntypedFormGroup({
      'attribute_id': new UntypedFormControl('', [Validators.required]),
      'values': new UntypedFormArray([], [Validators.required]),
    });
  }

  removeAttributeInput(attrIndex: number) {
    this.attributes().removeAt(attrIndex);
  }

  attributes(): UntypedFormArray {
    return this.treatmentConditionForm.get("attributes") as UntypedFormArray
  }
  /*-----------------------------END OF ATTRIBUTES ---------------------*/

  /*-----------------------------VALUES --------------------------------*/
  addValueInput(attrIndex: number, attrValue: number) {
    this.valuesInputArray(attrIndex).push(this.newValueInput(attrValue));
    this.treatmentConditionForm.updateValueAndValidity();
  }

  newValueInput(attrValue: number): UntypedFormGroup {
    return new UntypedFormGroup({
      'value_id': new UntypedFormControl(attrValue, [Validators.required]),
      'children': new UntypedFormArray([], [])
    });
  }

  removeValueInput(attrIndex: number, valueIndex: number) {
    this.valuesInputArray(attrIndex).removeAt(valueIndex);
  }

  valuesInputArray(attrIndex: number): UntypedFormArray {
    return this.attributes().at(attrIndex).get('values') as UntypedFormArray
  }

  getcheckBoxValue(attrIndex: number, inputVal: number) {
    let checked = this.valuesInputArray(attrIndex) ? (this.valuesInputArray(attrIndex)?.value.filter((itm: any) => itm.value_id == inputVal).length > 0 ? true : false) : false;
    return checked;
  }

  /*-----------------------------END OF CHILD ATTRIBUTES --------------------------------*/

  /*--------------------------------- CHILDREN ----------------------------------*/
  newChildInput() {
    return new UntypedFormGroup({
      'child_attribute_id': new UntypedFormControl('', []),
      'child_attribute_values': new UntypedFormControl([], [])
    });
  }

  addNewChildToAttrChildren(attrIndex: number, valueIndex: number) {
    this.childrenArray(attrIndex, valueIndex).push(this.newChildInput());
    this.treatmentConditionForm.updateValueAndValidity();
  }

  removeChildFromAttrChildren(attrIndex: number, valueIndex: number, childIndex: number) {
    this.childrenArray(attrIndex, valueIndex).removeAt(childIndex);
  }

  childrenArray(attrIndex: number, valueIndex: number) {
    return this.valuesInputArray(attrIndex).at(valueIndex).get('children') as UntypedFormArray
  }
  /*-------------------------------- END CHILDREN -------------------------------*/


  setAttributeValue(attrIndex: number, valueIndex: number, attrValue: number, checked: boolean) {
    if (checked) {
      this.addValueInput(attrIndex, attrValue);
    } else {
      this.removeValueInput(attrIndex, valueIndex);
    }
  }

  closeModal() {
    this._bsModalRef.hide();
  }
}
