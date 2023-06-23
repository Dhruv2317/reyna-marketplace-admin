import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Helper } from 'src/app/services/helper.service';
import { HttpClient } from '@angular/common/http';
import {orderHelper} from 'src/app/services/orderHelper.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  @BlockUI('datatable') blockDataTable!: NgBlockUI;
  userId:any;
  routerUrl:any;
  api_url:string = environment.api_url;
  orders_api_url:string= '';

  orders_config:any;
	orders_collection:any = { count: 0, data: [] };
  order_hasMorePages:boolean=false;

  orders_limit:number=10;
  orders_limit_options=[5,10,20,30,50];

  orders_status='ALL';
  orders_status_options=['ALL','ASSIGNED_TO_SELLER_DEALER','PAYMENT_REQUIRED_BY_BUYER','PAYMENT_COMPLETED_BY_BUYER','PROCESSING','SHIPPED','DELIVERED','REFUND_REQUESTED','REFUND_PROCESSED','REJECTED'];

  orders_sort_by:string='order_place_datetime';
  orders_sort_order:any='DESC';
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
    }
  ]
  routerSubscription!:Subscription;
  constructor(private route: ActivatedRoute,
    private _http: HttpClient,
    public _helper: Helper,
    private router: Router,
    public _orderHelper:orderHelper,
    private _changeDetectorRef: ChangeDetectorRef) {

    let activeRoute:any = this.route;
    this.userId = activeRoute.parent.snapshot.paramMap.get('id');
    this.routerUrl = this.router.url;
   
    if(activeRoute){
      this.routerSubscription = activeRoute.parent.parent.params.subscribe((params:any) => {
          this.userId = params['id'];
          if(this.routerUrl.includes('dealers')){
            this.orders_api_url = this.routerUrl.includes('orders') ? `api/admin/dealers/list-dealer-orders/${this.userId}?`:`api/admin/orders/list?user_id=${this.userId}&`;
          }else if(this.routerUrl.includes('sellers')){
            this.orders_api_url = this.routerUrl.includes('orders') ? `api/admin/sellers/list-seller-orders/${this.userId}?`:`api/admin/orders/list?user_id=${this.userId}&`;
          }
          else if(this.routerUrl.includes('products')){
            this.orders_api_url = `api/admin/orders/list?product_id=${this.userId}&`;
          }
          else if(this.routerUrl.includes('customers')){
            this.orders_api_url = `api/admin/orders/list?user_id=${this.userId}&`;
          }
          else {
            this.orders_api_url = 'api/admin/orders/list?';
          }
      });
    }
  
    this.orders_config = {
			itemsPerPage:this.orders_limit,
			currentPage: 1,
			totalItems: this.orders_collection.count
    };

  }

  ngOnInit(){
    this.getOrderData(this.orders_config.currentPage,this.orders_config.itemsPerPage,this.orders_sort_by,this.orders_sort_order,this.orders_search,this.orders_status);
 }

 ngOnDestroy(){
   if(this.routerSubscription){this.routerSubscription.unsubscribe();}
  if(this.blockDataTable){this.blockDataTable.unsubscribe();}
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
   if(eventName=='SEARCH'){
    this.orders_config.currentPage  =1;
  }
   this.getOrderData(this.orders_config.currentPage,this.orders_config.itemsPerPage,this.orders_sort_by,this.orders_sort_order,this.orders_search,this.orders_status);
 }

 pageChanged(event:any){
   this.orders_config.currentPage = event;
   this.getOrderData(this.orders_config.currentPage,this.orders_config.itemsPerPage,this.orders_sort_by,this.orders_sort_order,this.orders_search,this.orders_status);
 }

  getOrderData(page:number=1,limit:number=10,sortBy:string='created_at',sortOrder:any=-1,search:string='',status:string){
    this.blockDataTable.start();
    this._http.post<any>(this.orders_api_url+`page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&search=${search}&status=${status}`,{}).subscribe((resp) => {
      this.blockDataTable.stop();
      this.orders_collection.data = resp.data;
        this.orders_collection.count= resp.total;
        this.orders_config.itemsPerPage =  resp.perPage;
        this.orders_config.totalItems = resp.total;
        this.orders_config.currentPage  =  resp.currentPage;
        this.order_hasMorePages = resp.hasMorePages;
        window.scrollTo({
          top: 0,
            behavior: 'smooth'
        });
    },err=>{
      this.blockDataTable.stop();
    });
  }

  goToDetailsPage(orderId: any): any {
    this.router.navigate(['admin', 'orders', 'view', orderId]);
  }

  goToUserDetails(customeId: any): any {
    this.router.navigate(['admin', 'customers', 'view', customeId, 'orders']);
  }

}
