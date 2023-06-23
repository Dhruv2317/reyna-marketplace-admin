import { Component, EventEmitter, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Toastr } from 'src/app/services/toastr.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProcessRefundModalService } from './process-refund-modal.service';

@Component({
  selector: 'app-process-refund-modal',
  templateUrl: './process-refund-modal.component.html',
  styleUrls: ['./process-refund-modal.component.scss']
})
export class ProcessRefundModalComponent implements OnInit {

  @Output() onRefundProcessedCompleted: EventEmitter<any> = new EventEmitter();

  eventType:string='';
  selectedOrder:any;
  full_refund_in_wallet:boolean=false;
  refundObject:any={
    order_id:null,
    selected_product_id:[],
    stripe_charge_already_refunded:null,
    amount_to_precess_refund_total:0,
    amount_to_process_refund_in_stripe:0,
    amount_to_process_refund_in_wallet:0,
    amount_to_process_refund_in_discount:0,
    amount_to_process_refund_in_shipping_charge:0
  };
  defaultCalculatedRefundObject:any;

  refund_processing:boolean=false;

  constructor(private http:HttpClient,
    private _toastr:Toastr,
    private _bsModalRef:BsModalRef,
    private _changeDetectorRef:ChangeDetectorRef,
    private _processRefundModalService:ProcessRefundModalService){

  }

  ngOnInit(): void {
    let details = this._processRefundModalService.getFormData();
    this.eventType = details.eventType;
    this.selectedOrder = details.selectedOrder;
    this.refundObject =  details.refundObject;
    this.defaultCalculatedRefundObject = details.defaultCalculatedRefundObject;
  }

  closeModal(){
    this._bsModalRef.hide();
  }

  recalculateRefund(event:any){
    let default_stripe_amount = this.defaultCalculatedRefundObject.amount_to_process_refund_in_stripe;
    let default_wallet_amount = this.defaultCalculatedRefundObject.amount_to_process_refund_in_wallet;
     if(event.checked){
      this.refundObject.amount_to_process_refund_in_stripe = 0;
      this.refundObject.amount_to_process_refund_in_wallet = default_wallet_amount+ default_stripe_amount;
    }else{
      this.refundObject.amount_to_process_refund_in_stripe = default_stripe_amount;
      this.refundObject.amount_to_process_refund_in_wallet = default_wallet_amount;
    }
    this._changeDetectorRef.detectChanges();
  }

  refundOrder(orderId: any) {
    let url:string =`api/admin/orders/refund_process/${orderId}`;
    this.refund_processing=true;
    this.http.post(url,this.refundObject).subscribe((res: any) => {
        this.refund_processing=false;
        this.selectedOrder.result = res;
        if (res.refunded) {
          let stripeRefund= res.stripeRefund ? res.stripeRefund.id:'N/A';
          let walletRefund= res.walletRefund ? res.walletRefund.id :'N/A';
          this._toastr.showSuccess(`Order Refunded Successfully. Refunded To Payment Gateway : ${stripeRefund} , Refunded To Wallet : ${walletRefund}`);
          this.onRefundProcessedCompleted.emit(true);
        } else {
          this._toastr.showWarning('Unable to refund order. Please Check Payment Method!');
        }
      },(err) => {
        this.refund_processing=false;
        this._toastr.showError('Unable to refund order. Please try again');
      });
  }

}
