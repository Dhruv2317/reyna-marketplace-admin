import { EventEmitter, Component, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder, UntypedFormArray } from '@angular/forms';
import { Helper } from 'src/app/services/helper.service';
import { BsModalRef } from 'ngx-bootstrap/modal'
import { SubcategoriesAddEditModalService } from './subcategories-add-edit-modal.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-subcategories-add-edit-modal',
  templateUrl: './subcategories-add-edit-modal.component.html',
  styleUrls: ['./subcategories-add-edit-modal.component.scss']
})
export class SubcategoriesAddEditModalComponent implements OnInit {
  @Output() onEventCompleted: EventEmitter<any> = new EventEmitter();
  modalEvent: any;
  SubcategoryForm: UntypedFormGroup;

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
    private _tcAddEditModalService: SubcategoriesAddEditModalService
  ) {
    this.SubcategoryForm = this.formBuilder.group({
      'category_id':new UntypedFormControl(null, []),
      'id':new UntypedFormControl(null, []),
      'name': new UntypedFormControl(null, [Validators.required]),
      'is_active': new UntypedFormControl(null, []),
      'description': new UntypedFormControl(null, []),
      'image_url': new UntypedFormControl(null, []),
      'min_shipping_weight': new UntypedFormControl(null, []),
      'max_shipping_weight': new UntypedFormControl(null, []),
      'attributes':new UntypedFormArray([]),
      'name_fr': new UntypedFormControl(null,[]),
      'name_nl': new UntypedFormControl(null,[]),
      'name_es': new UntypedFormControl(null,[]),
      'name_pt': new UntypedFormControl(null,[]),
      'description_fr': new UntypedFormControl(null,[]),
      'description_nl': new UntypedFormControl(null,[]),
      'description_es': new UntypedFormControl(null,[]),
      'description_pt': new UntypedFormControl(null,[]),
    });
  }

  get id() { return this.SubcategoryForm.get('id'); }
  get category_id() { return this.SubcategoryForm.get('category_id'); }
  get name() { return this.SubcategoryForm.get('name'); }
  get is_active() { return this.SubcategoryForm.get('is_active'); }
  get description() { return this.SubcategoryForm.get('description'); }
  get image_url() { return this.SubcategoryForm.get('image_url'); }
  get min_shipping_weight() { return this.SubcategoryForm.get('min_shipping_weight'); }
  get max_shipping_weight() { return this.SubcategoryForm.get('max_shipping_weight'); }
  get name_fr() { return this.SubcategoryForm.get('name_fr'); }
  get name_nl() { return this.SubcategoryForm.get('name_nl'); }
  get name_es() { return this.SubcategoryForm.get('name_es'); }
  get name_pt() { return this.SubcategoryForm.get('name_pt'); }

  get description_fr() { return this.SubcategoryForm.get('description_fr'); }
  get description_nl() { return this.SubcategoryForm.get('description_nl'); }
  get description_es() { return this.SubcategoryForm.get('description_es'); }
  get description_pt() { return this.SubcategoryForm.get('description_pt'); }

  ngOnInit(): void {
    this.getAllAttributesData();
    let details = this._tcAddEditModalService.getData();
    this.modalEvent = details.event;
    if(details.event == 'ADD'){
      this.SubcategoryForm.patchValue({
        category_id:details.data.category_id
      });
    }
    if(details.event == 'EDIT'){
      this.getSubcategoryDetails(details.data.id);
    }
  }

  async saveOTCSubcategory(formValid:boolean){
    if(formValid){
      const formData: FormData = new FormData();
      formData.append('subcategory', JSON.stringify(this.SubcategoryForm.value));
      formData.append('image_url', this.selectedImageFile);
      if(this.modalEvent == 'ADD'){
        let create = await  this._tcAddEditModalService.addNewSubcategories(formData);
      } else if (this.modalEvent == 'EDIT'){
        let update = await  this._tcAddEditModalService.editSubcategories(this.SubcategoryForm.value.id,formData);
      }
      this.onEventCompleted.emit(true);
      this.closeModal();
      this.SubcategoryForm.reset();
    } else {
      this._helper.markFormGroupTouched(this.SubcategoryForm);
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


  getAllAttributesData(){
    const url = 'api/admin/attributes/all';
    this._http.get(url).subscribe((res: any) => {
        this.attributesData = res;
      },(err) => {
        this.attributesData =[];
      });
  }

  getSubcategoryDetails(id:number){
    const url = 'api/admin/subcategories/view/'+id;
    this._http.get(url).subscribe((res: any) => {
      this.subcategoryDetails = res;
      this.patchFormValue();
    },(err) => {
      this.subcategoryDetails = null;
    });
  }

  patchFormValue(){
    this.SubcategoryForm.patchValue({
      id:this.subcategoryDetails.id,
      category_id:this.subcategoryDetails.category_id,
      name:this.subcategoryDetails.name,
      is_active:this.subcategoryDetails.is_active,
      description:this.subcategoryDetails.description,
      min_shipping_weight:this.subcategoryDetails.min_shipping_weight,
      max_shipping_weight:this.subcategoryDetails.max_shipping_weight,
      name_fr:this.subcategoryDetails.name_fr,
      name_nl:this.subcategoryDetails.name_nl,
      name_es:this.subcategoryDetails.name_es,
      name_pt:this.subcategoryDetails.name_pt,
      description_fr:this.subcategoryDetails.description_fr,
      description_nl:this.subcategoryDetails.description_nl,
      description_es:this.subcategoryDetails.description_es,
      description_pt:this.subcategoryDetails.description_pt
    });
    this.imageUrl = this.subcategoryDetails.image ? environment.api_url + this.subcategoryDetails.image : `../../../../../assets/img/no_preview.png`;
    const attributesControl = this.SubcategoryForm.get('attributes') as UntypedFormArray;
    if(this.subcategoryDetails.attributes){

      this.subcategoryDetails.attributes.forEach((item:any,index:number)=>{
        let valArray:any  = [];
        item.values.forEach((val:any,valIndex:number)=>{
          let chArray :any = [];
          if(val.children && val.children.length>0){
             val.children.forEach((child:any,childIndex:number)=>{
                  let childValArray= child.values.slice().map((ch:any)=> ch.attribute_value_id);
                  let childFormGroup =  new UntypedFormGroup({
                    'child_attribute_id': new UntypedFormControl(child.attribute_id, []),
                    'child_attribute_values': new UntypedFormControl(childValArray, [])
                  });
                  chArray.push(childFormGroup);
             });
          }
          let valFormGroup= new UntypedFormGroup({
            'value_id': new UntypedFormControl(val.attribute_value_id, [Validators.required]),
            'children':new UntypedFormArray(chArray)
          });
          valArray.push(valFormGroup);
        });
        let attributeFormGroup = new UntypedFormGroup({
          'attribute_id':new UntypedFormControl(item.attribute_id, [Validators.required]),
          'values':new UntypedFormArray(valArray)
        });
        console.log('attributeFormGroup=',attributeFormGroup);
        attributesControl.push(attributeFormGroup);
      });
    }
  }

  childAttrChange(attrIndex:number,valueIndex:number,childIndex:number,event:any){
    this.childrenArray(attrIndex,valueIndex).at(childIndex).patchValue({
      child_attribute_id:event.value
    });
    let valuesss= this.getValuesFromAttribute('value',event.value);
  }

  childAttrValueChange(attrIndex:number,valueIndex:number,childIndex:number,event:any){
    this.childrenArray(attrIndex,valueIndex).at(childIndex).patchValue({
      child_attribute_values:event.value
    });
  }


  attrChange(index:number,event:any){
    this.attributes().at(index).patchValue({
      attribute_id:event.value
    });
    let valuesss= this.getValuesFromAttribute('value',event.value);
    this.clearFormArray(this.valuesInputArray(index));
  }

  clearFormArray = (formArray: UntypedFormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  getValuesFromAttribute(key:string,value:number){
      let attrId = value;
      let values =[];
      if(attrId){
        let objFound = this.attributesData.find((item:any)=>item.id==attrId);
        if(objFound && objFound.id){
          values= objFound.values;
        }else{
          values= [];
        }
      }else{
        values = [];
      }
      return values;
  }

    /*-----------------------------ATTRIBUTES --------------------------------*/
    addAttributeInput(){
      this.attributes().push(this.newAttributeInput());
      this.SubcategoryForm.updateValueAndValidity();
    }

    newAttributeInput(): UntypedFormGroup{
      return new UntypedFormGroup({
        'attribute_id': new UntypedFormControl('', [Validators.required]),
        'values': new UntypedFormArray([], [Validators.required]),
      });
    }

    removeAttributeInput(attrIndex:number){
      this.attributes().removeAt(attrIndex);
    }

    attributes(): UntypedFormArray {
        return this.SubcategoryForm.get("attributes") as UntypedFormArray
    }
    /*-----------------------------END OF ATTRIBUTES ---------------------*/

    /*-----------------------------VALUES --------------------------------*/
    addValueInput(attrIndex:number,attrValue:number){
      this.valuesInputArray(attrIndex).push(this.newValueInput(attrValue));
      this.SubcategoryForm.updateValueAndValidity();
    }

    newValueInput(attrValue:number): UntypedFormGroup{
      return new UntypedFormGroup({
        'value_id': new UntypedFormControl(attrValue, [Validators.required]),
        'children':new UntypedFormArray([], [])
      });
    }

    removeValueInput(attrIndex:number,valueIndex:number){
      this.valuesInputArray(attrIndex).removeAt(valueIndex);
    }

    valuesInputArray(attrIndex:number): UntypedFormArray {
      return this.attributes().at(attrIndex).get('values') as UntypedFormArray
    }

    getcheckBoxValue(attrIndex:number,inputVal:number) {
       let checked = this.valuesInputArray(attrIndex) ? (this.valuesInputArray(attrIndex)?.value.filter((itm:any)=>itm.value_id == inputVal).length>0?true:false):false;
       return checked;
    }

    /*-----------------------------END OF CHILD ATTRIBUTES --------------------------------*/

    /*--------------------------------- CHILDREN ----------------------------------*/
    newChildInput(){
      return new UntypedFormGroup({
        'child_attribute_id': new UntypedFormControl('', []),
        'child_attribute_values': new UntypedFormControl([], [])
      });
    }

    addNewChildToAttrChildren(attrIndex:number,valueIndex:number){
      this.childrenArray(attrIndex,valueIndex).push(this.newChildInput());
      this.SubcategoryForm.updateValueAndValidity();
    }

    removeChildFromAttrChildren(attrIndex:number,valueIndex:number,childIndex:number){
      this.childrenArray(attrIndex,valueIndex).removeAt(childIndex);
    }

    childrenArray(attrIndex:number,valueIndex:number){
      return this.valuesInputArray(attrIndex).at(valueIndex).get('children') as UntypedFormArray
    }
    /*-------------------------------- END CHILDREN -------------------------------*/


    setAttributeValue(attrIndex:number,valueIndex:number,attrValue:number,checked:boolean){
      if(checked){
          this.addValueInput(attrIndex,attrValue);
      }else{
          this.removeValueInput(attrIndex,valueIndex);
      }
    }

  closeModal(){
    this._bsModalRef.hide();
  }
}
