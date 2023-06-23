import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { RefundDrugModalService } from './refund-drug-modal.service';

@Component({
  selector: 'app-refund-drug-modal',
  templateUrl: './refund-drug-modal.component.html',
  styleUrls: ['./refund-drug-modal.component.scss']
})
export class RefundDrugModalComponent implements OnInit {
  @Output() onEventCompleted: EventEmitter<any> = new EventEmitter();
  order!: any;
  refundOrderForm:UntypedFormGroup
  all_products_for_refund_length: number = 0

  constructor(
    private _bsModalRef: BsModalRef,
    private _refundDrugModalService: RefundDrugModalService
  ) {
    this.refundOrderForm = new UntypedFormGroup({
      'selected_product_ids':new UntypedFormControl([], [Validators.required]),
      'refund_reason':new UntypedFormControl(null, [Validators.required]),
    });
  }

  get selected_product_ids(){return this.refundOrderForm.get('selected_product_ids');}
  get refund_reason(){return this.refundOrderForm.get('refund_reason');}

  ngOnInit(): void {
    var refund_reason=this.refundOrderForm.get('refund_reason');
    if(refund_reason)refund_reason.disable();

    let details = this._refundDrugModalService.getData();
    if(details) {
      this.order = details.order;
      this.all_products_for_refund_length = details.all_products_for_refund_length;
    }
  }

  refundOrderFormSubmit(form: any) {
    if(form.valid) {
      this.onEventCompleted.emit(form);
      this.closeModal();
    }
  }

  checkProductDisabledForRefund(product:any){
    return (product.refund_requested_on!=null || product.refund_processed_on != null)?true:false;
  }

  checkProductSelectedForRefund(product:any){
    let oldValue= this.refundOrderForm.value.selected_product_ids || [];
    return  oldValue.indexOf(product.id)!=-1?true:false;
  }

  checkSelectAllOptionForEvent(event_name:string) {
    let formValue= this.refundOrderForm.value.selected_product_ids || [];
    let checked =  this.all_products_for_refund_length>0 && formValue.length==this.all_products_for_refund_length;
    var refund_reason=this.refundOrderForm.get('refund_reason');
    if(this.refundOrderForm.value.selected_product_ids.length>0){
      if(refund_reason)refund_reason.enable();
    }else{
      if(refund_reason)refund_reason.disable();
    }
    return checked;
  }

  handleSelectAllProducts(event_name:string,event:any) {
    let checked =  event.target.checked;
    if(checked){
      this.refundOrderForm.patchValue({selected_product_ids:[]});
      let oldValue= this.refundOrderForm.value.selected_product_ids;
      for(let product of this.order.order_products){
          let is_disabled= this.checkProductDisabledForRefund(product);
          if(!is_disabled){
            oldValue.push(product.id);
            this.refundOrderForm.patchValue({selected_product_ids:oldValue});
          }
      }
    }else{
      this.refundOrderForm.patchValue({selected_product_ids:[]});
    }
  }

  selectProduct(product:any,event:any){
    let oldValue= this.refundOrderForm.value.selected_product_ids || [];

     if(event.target.checked){
      if(oldValue && oldValue.indexOf(product.id)==-1){
        oldValue.push(product.id);
        this.refundOrderForm.patchValue({selected_product_ids:oldValue});
      }
     }else{
       if(oldValue && oldValue.indexOf(product.id)!=-1){
        let indexFound = this.refundOrderForm.value.selected_product_ids.indexOf(product.id);
         oldValue.splice(indexFound, 1);
         this.refundOrderForm.patchValue({selected_product_ids:oldValue});
       }
     }
     this.checkSelectAllOptionForEvent('REFUND');
  }

  closeModal() {
    this._bsModalRef.hide();
  }
}
