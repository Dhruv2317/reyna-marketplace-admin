import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Toastr } from '../../../../services/toastr.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {orderHelper} from 'src/app/services/orderHelper.service';
import { ProcessRefundModalComponent } from 'src/app/components/process-refund-modal/process-refund-modal.component';
import { ProcessRefundModalService } from 'src/app/components/process-refund-modal/process-refund-modal.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-refund-requested-orders',
  templateUrl: './refund-requested-orders.component.html',
  styleUrls: ['./refund-requested-orders.component.scss']
})
export class RefundRequestedOrdersComponent implements OnInit,OnDestroy {
  @BlockUI('datatable') blockDataTable!: NgBlockUI;
  api_url:string = environment.api_url;

  modalRef!:BsModalRef;
  orders_config:any;
	orders_collection:any = { count: 0, data: [] };
  order_hasMorePages:boolean=false;

  orders_limit:number=10;
  orders_limit_options=[5,10,20,30,50];

  orders_sort_by:string='last_refund_requested_on';
  orders_sort_order:any=-1;
  orders_search:string='';

  orders_sort_selected_option=7;
  orders_sort_options=[
    {
      id:3,
      sort_by:'order_number',
      sort_order:'DESC',
      title:'Sort By Order No descending'
    },
    {
      id:4,
      sort_by:'order_number',
      sort_order:'ASC',
      title:'Sort By Order No ascending'
    },
    {
      id:5,
      sort_by:'total_amount',
      sort_order:'DESC',
      title:'Sort By Total descending'
    },
    {
      id:6,
      sort_by:'total_amount',
      sort_order:'ASC',
      title:'Sort By Total ascending'
    },
    {
      id:7,
      sort_by:'order_place_datetime',
      sort_order:'DESC',
      title:'Sort By OrderDate descending'
    },
    {
      id:8,
      sort_by:'order_place_datetime',
      sort_order:'ASC',
      title:'Sort By OrderDate ascending'
    },
    {
      id:9,
      sort_by:'last_refund_requested_on',
      sort_order:'DESC',
      title:'Sort By Last Refund Requested Date descending'
    },
    {
      id:10,
      sort_by:'last_refund_requested_on',
      sort_order:'ASC',
      title:'Sort By  Last Refund Requested Date ascending'
    }
  ];

  constructor(
    private _route: ActivatedRoute,
    private router:Router,
    private _toastr: Toastr,
    private http: HttpClient,
    public _orderHelper:orderHelper,
    private _modalService:BsModalService,
    private _processRefundModalService:ProcessRefundModalService,
    private _changeDetectorRef: ChangeDetectorRef){


    this.orders_config = {
			itemsPerPage:this.orders_limit,
			currentPage: 1,
			totalItems: this.orders_collection.count
    };

  }

  ngOnInit(){
    this.getRefundRequestedOrders(this.orders_config.currentPage,this.orders_config.itemsPerPage,this.orders_sort_by,this.orders_sort_order,this.orders_search);
  }

  ngOnDestroy(){
    if(this.blockDataTable){this.blockDataTable.unsubscribe();}
  }


  async calculateRefundForOrder(order:any,refundType:any){

    let stripe_charge_refunded= null;
    if(order.charged_from_stripe>0){
      let chargeDetails:any = await this._getPaymentDetailsForOrder(order.id);
      order.charge_details = chargeDetails &&  chargeDetails.id ?chargeDetails.id :null;
      stripe_charge_refunded = order.charge_details && order.charge_details.refund_status=='full'? true : false;
    }else{
      order.charge_details=null;
      stripe_charge_refunded=null;
    }

    let order_product_ids= [order.product_id];
    let amount_to_precess_refund_total=0;
    let amount_to_process_refund_in_stripe=0;
    let amount_to_process_refund_in_wallet=0;
    let amount_to_process_refund_in_discount=0;
    let amount_to_process_refund_in_shipping_charge=  order.shipping_charge ;
    let final_total = 0;

    let temp_total = order.total_amount + amount_to_process_refund_in_shipping_charge;

    let pending_discount = order.discount - order.refunded_discount;


    if(temp_total>=pending_discount){
      amount_to_process_refund_in_discount=pending_discount;
      amount_to_precess_refund_total= temp_total - pending_discount;
      final_total= amount_to_precess_refund_total;
    }else{
      amount_to_process_refund_in_discount = temp_total;
      amount_to_precess_refund_total = 0;
      final_total= amount_to_precess_refund_total;
    }

    let total_balance_remaining   =    order.total_amount - order.refunded_total  ;
    let stripe_balance_remaining  =   order.charged_from_stripe  -  order.refunded_in_stripe;
    let wallet_balance_remaining =    0 ;//order.charged_from_wallet -  order.refunded_in_wallet;

    if(wallet_balance_remaining>0){
        amount_to_process_refund_in_wallet = amount_to_precess_refund_total>=wallet_balance_remaining ? wallet_balance_remaining : amount_to_precess_refund_total;
        final_total = final_total - amount_to_process_refund_in_wallet;
    }

    if(stripe_balance_remaining>0){
        amount_to_process_refund_in_stripe = final_total>=stripe_balance_remaining ? stripe_balance_remaining:final_total ;
        final_total= final_total - amount_to_process_refund_in_stripe;
    }

    amount_to_precess_refund_total = Math.round(amount_to_precess_refund_total * 100) / 100 ;
    amount_to_process_refund_in_stripe = Math.round(amount_to_process_refund_in_stripe * 100) / 100 ;
    amount_to_process_refund_in_wallet = Math.round(amount_to_process_refund_in_wallet * 100) / 100 ;
    amount_to_process_refund_in_discount = Math.round(amount_to_process_refund_in_discount * 100) / 100 ;
    amount_to_process_refund_in_shipping_charge = Math.round(amount_to_process_refund_in_shipping_charge * 100) / 100 ;


    let refundObject={
      order_id:order.id,
      selected_product_id:order_product_ids,
      stripe_charge_already_refunded:stripe_charge_refunded,
      amount_to_precess_refund_total:amount_to_precess_refund_total,
      amount_to_process_refund_in_stripe:amount_to_process_refund_in_stripe,
      amount_to_process_refund_in_wallet:amount_to_process_refund_in_wallet,
      amount_to_process_refund_in_discount:amount_to_process_refund_in_discount,
      amount_to_process_refund_in_shipping_charge:amount_to_process_refund_in_shipping_charge
    }
    let defaultCalculatedRefundObject = JSON.parse(JSON.stringify(refundObject));

    this._processRefundModalService.setFormData({
      eventType:'ORDER',
      selectedOrder:order,
      refundObject:refundObject,
      defaultCalculatedRefundObject:defaultCalculatedRefundObject,
    });
    this.modalRef = this._modalService.show(ProcessRefundModalComponent,{class:'modal-x-lg'});
    this.modalRef.content.onRefundProcessedCompleted.subscribe(()=>{
      this.getRefundRequestedOrders(this.orders_config.currentPage,this.orders_config.itemsPerPage,this.orders_sort_by,this.orders_sort_order,this.orders_search);
    });
  }

 handleChange(eventName:string,event:any){
   let value = event.target.value;
  if(eventName=='SORT'){
    let item:any = this.orders_sort_options.find((obj:any)=>obj.id==value);
    this.orders_sort_by=item.sort_by;
    this.orders_sort_order=item.sort_order;
  }
  if(eventName=='LIMIT'){
    this.orders_config.itemsPerPage=this.orders_limit;
    this.orders_config.currentPage  =1;
  }
  this.getRefundRequestedOrders(this.orders_config.currentPage,this.orders_config.itemsPerPage,this.orders_sort_by,this.orders_sort_order,this.orders_search);
}

 pageChanged(event:any){
   this.orders_config.currentPage = event;
   this.getRefundRequestedOrders(this.orders_config.currentPage,this.orders_config.itemsPerPage,this.orders_sort_by,this.orders_sort_order,this.orders_search);
 }

 getRefundRequestedOrders(page:number,limit:number,sortBy:string='last_refund_requested_on',sortOrder:any=-1,search:string=''){
  this.blockDataTable.start(); 
  this.http.post<any>(`api/admin/orders/list?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&search=${search}&status=REFUND_REQUESTED`,{}).subscribe((resp) => {
      this.blockDataTable.stop(); 
       this.orders_collection.data = resp.data;
       this.orders_collection.count= resp.total;
       this.orders_config.itemsPerPage =  resp.perPage;
       this.orders_config.totalItems = resp.total;
       this.orders_config.currentPage  =  resp.currentPage;
       this.order_hasMorePages = resp.hasMorePages;
   },err=>{
    this.blockDataTable.stop(); 
   });
 }

 goToUserDetails(customeId: any): any {
  this.router.navigate(['admin', 'customers', 'view', customeId, 'orders']);
 }

  goToOrderDetails(orderId:number){
    this.router.navigate(['admin', 'orders','view',orderId]);
  }

  async _getPaymentDetailsForOrder(orderId:any){
    const url = `api/admin/orders/charge_details/${orderId}`;
    return await this.http.get(url).toPromise();
  }

}
