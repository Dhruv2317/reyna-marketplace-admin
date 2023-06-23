import { EventEmitter, Component, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder, UntypedFormArray } from '@angular/forms';
import { Helper } from 'src/app/services/helper.service';
import { BsModalRef } from 'ngx-bootstrap/modal'
import { ProductsFilterModalService } from './products-filter-modal.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products-filter-modal',
  templateUrl: './products-filter-modal.component.html',
  styleUrls: ['./products-filter-modal.component.scss']
})
export class ProductsFilterModalComponent implements OnInit {
  @Output() onFilterAppliedCompleted: EventEmitter<any> = new EventEmitter();
  modalEvent: any;
  treatmentConditionForm: UntypedFormGroup;

  selectedImageFile: any;
  filterDetails:any;
  attributesData:any[]=[];

  constructor(
    private _http: HttpClient,
    private _helper:Helper,
    private _bsModalRef:BsModalRef,
    private formBuilder: UntypedFormBuilder,
    private _changeDetectorRef:ChangeDetectorRef,
    private _productsFilterModalService: ProductsFilterModalService){
   
    this.treatmentConditionForm = this.formBuilder.group({
      'attributes':new UntypedFormArray([])
    });
  }

  ngOnInit(): void {
    let details = this._productsFilterModalService.getData();
    this.modalEvent = details.event;
    this.filterDetails=details.filters;
    this.attributesData = details.all_attributes;
    if(details.filters.length==0){
      this.patchValueInFormControl('default',details.all_attributes);
    }else{
      this.patchValueInFormControl('applied',details.filters);
    }
  }

  patchValueInFormControl(from:string,attributes:any[]){
    const attributesControl = this.treatmentConditionForm.get('attributes') as UntypedFormArray;
    attributes.forEach((item:any)=>{

      let attribute_id= from==='default'?item.id:item.attribute_id;
      let values = from==='default'? (item.values ? item.values.slice().map((itm:any)=>itm.id):[]):item.values;

      let attributeFormGroup = new UntypedFormGroup({
        'attribute_id':new UntypedFormControl({value:attribute_id, disabled: true},[Validators.required]),
        'values':new UntypedFormControl(values,[])
      });
      attributesControl.push(attributeFormGroup);
    });
  }
 
  attrChange(index:number,event:any){
    this.attributes().at(index).patchValue({
      attribute_id:event.value
    });
    let valuesss = this.getValuesFromAttribute('value',event.value);
  }

  clearAttributeInput(index:number){
    this.attributes().at(index).patchValue({
      values:[]
    });
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

  async saveTreatmentCondition(formValid:boolean){
    if(formValid){
      this.onFilterAppliedCompleted.emit(this.treatmentConditionForm.getRawValue());
      this.closeModal();
      this.treatmentConditionForm.reset();
    } else {
      this._helper.markFormGroupTouched(this.treatmentConditionForm);
    }
  }

  /*-----------------------------ATTRIBUTES --------------------------------*/
  addAttributeInput(){
    this.attributes().push(this.newAttributeInput());
    this.treatmentConditionForm.updateValueAndValidity();
  }

  newAttributeInput(): UntypedFormGroup{
    return new UntypedFormGroup({
      'attribute_id': new UntypedFormControl('', [Validators.required]),
      'values': new UntypedFormControl([], [Validators.required]),
    });
  }

  removeAttributeInput(empIndex:number){
    this.attributes().removeAt(empIndex);
  }

  attributes(): UntypedFormArray {
      return this.treatmentConditionForm.get("attributes") as UntypedFormArray
  }
  /*-----------------------------END OF ATTRIBUTES --------------------------------*/

  closeModal(){
    this._bsModalRef.hide();
  }
}
