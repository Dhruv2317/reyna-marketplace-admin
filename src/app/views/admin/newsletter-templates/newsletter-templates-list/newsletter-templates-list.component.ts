import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Helper } from 'src/app/services/helper.service';
import { HttpClient } from '@angular/common/http';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-newsletter-templates-list',
  templateUrl: './newsletter-templates-list.component.html',
  styleUrls: ['./newsletter-templates-list.component.scss']
})
export class NewsletterTemplatesListComponent implements OnInit {
  @BlockUI('datatable') blockDataTable!: NgBlockUI;

  orders_config:any;
	orders_collection:any = { count: 0, data: [] };
  order_hasMorePages:boolean=false;

  orders_limit:number=10;
  orders_limit_options=[5,10,20,30,50];
  orders_sort_by:string='order_place_datetime';
  orders_sort_order:any='DESC';
  orders_search:string='';

  orders_sort_selected_option=7;
  orders_sort_options=[
    {
      id:3,
      sort_by:'template_name',
      sort_order:'DESC',
      title:'Sort By Order No descending'
    },
    {
      id:4,
      sort_by:'template_name',
      sort_order:'ASC',
      title:'Sort By Order No ascending'
    },
    {
      id:5,
      sort_by:'created_at',
      sort_order:'DESC',
      title:'Sort By Created At descending'
    },
    {
      id:6,
      sort_by:'created_at',
      sort_order:'ASC',
      title:'Sort By Created At ascending'
    }
  ];

  api_url = environment.api_url;

  constructor(private route: ActivatedRoute,
    private _http: HttpClient,
    public _helper: Helper,
    private router: Router,
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
   if(eventName=='SEARCH'){
    this.orders_config.currentPage  =1;
  }
   this.getOrderData(this.orders_config.currentPage,this.orders_config.itemsPerPage,this.orders_sort_by,this.orders_sort_order,this.orders_search);
 }

 pageChanged(event:any){
   this.orders_config.currentPage = event;
   this.getOrderData(this.orders_config.currentPage,this.orders_config.itemsPerPage,this.orders_sort_by,this.orders_sort_order,this.orders_search);
 }

  getOrderData(page:number=1,limit:number=10,sortBy:string='created_at',sortOrder:any=-1,search:string=''){
    this.blockDataTable.start();
    this._http.get<any>(`api/admin/newsletter_templates/list?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&search=${search}`).subscribe((resp:any) => {
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
    },(err:any)=>{
      this.blockDataTable.stop();
    });
  }

  goToDetailsPage(orderId: any): any {
    this.router.navigate(['admin', 'orders', 'view', orderId]);
  }

  deleteTemplate(template_id:any){
    this.blockDataTable.start();
    this._http.post<any>(`api/admin/newsletter_templates/delete/${template_id}`,{}).subscribe((resp:any) => {
      this.blockDataTable.stop();
      this.getOrderData(this.orders_config.currentPage,this.orders_config.itemsPerPage,this.orders_sort_by,this.orders_sort_order,this.orders_search);

    },(err:any)=>{
      this.blockDataTable.stop();
    });
  }
}
