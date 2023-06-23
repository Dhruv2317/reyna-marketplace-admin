import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import {orderHelper} from 'src/app/services/orderHelper.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-refund-processed-orders',
  templateUrl: './refund-processed-orders.component.html',
  styleUrls: ['./refund-processed-orders.component.scss']
})
export class RefundProcessedOrdersComponent implements OnInit,OnDestroy {
  @BlockUI('datatable') blockDataTable!: NgBlockUI;
  api_url:string = environment.api_url;
  orders_config:any;
	orders_collection:any = { count: 0, data: [] };
  order_hasMorePages:boolean=false;

  orders_limit:number=10;
  orders_limit_options=[5,10,20,30,50];

  orders_sort_by:string='last_refund_processed_on';
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
      sort_by:'last_refund_processed_on',
      sort_order:'DESC',
      title:'Sort By Last Refund Processed Date descending'
    },
    {
      id:10,
      sort_by:'last_refund_processed_on',
      sort_order:'ASC',
      title:'Sort By  Last Refund Processed Date ascending'
    }
  ]

  constructor(
    private _route: ActivatedRoute,
    private router:Router,
    private http: HttpClient,
    public _orderHelper:orderHelper,
    private _changeDetectorRef: ChangeDetectorRef){


    this.orders_config = {
			itemsPerPage:this.orders_limit,
			currentPage: 1,
			totalItems: this.orders_collection.count
    };

  }

  ngOnInit(){
     this.getOrderData(this.orders_config.currentPage,this.orders_config.itemsPerPage,this.orders_sort_by,this.orders_sort_order,this.orders_search);
  }

  ngOnDestroy(){
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
    this.getOrderData(this.orders_config.currentPage,this.orders_config.itemsPerPage,this.orders_sort_by,this.orders_sort_order,this.orders_search);
  }

  pageChanged(event:any){
		this.orders_config.currentPage = event;
		this.getOrderData(this.orders_config.currentPage,this.orders_config.itemsPerPage,this.orders_sort_by,this.orders_sort_order,this.orders_search);
  }

  getOrderData(page:number,limit:number,sortBy:string='order_place_datetime',sortOrder:any=-1,search:string=''){
    this.blockDataTable.start();
    this.http.post<any>(`api/admin/orders/list?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&search=${search}&status=REFUND_PROCESSED`,{}).subscribe((resp) => {
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
				})
		},err=>{
      this.blockDataTable.stop();
		});
  }

  goToOrderDetails(orderId:number){
    this.router.navigate(['admin', 'orders','view',orderId]);
  }

}
