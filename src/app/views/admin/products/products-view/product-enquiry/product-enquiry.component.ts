import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Helper } from 'src/app/services/helper.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-enquiry',
  templateUrl: './product-enquiry.component.html',
  styleUrls: ['./product-enquiry.component.scss']
})
export class ProductEnquiryComponent implements OnInit,OnDestroy {
  @BlockUI('loader') blockDataTable!: NgBlockUI;
  productId: any;
  api_url=environment.api_url;
  config:any;
	collection:any = { count: 0, data: [] };
  hasMorePages:boolean=false;

  limit:number=10;
  limit_options=[5,10,20,30,50];

  sort_by:string='created_at';
  sort_order:any='DESC';
  search:string='';

  sort_selected_option=1;
  sort_options=[
    {
      id:1,
      sort_by:'created_at',
      sort_order:'DESC',
      title:'Sort By Date descending'
    },
    {
      id:2,
      sort_by:'created_at',
      sort_order:'ASC',
      title:'Sort By Date ascending'
    }
  ];
  routeSubscribe:any;

  constructor(
    private route: ActivatedRoute,
    private _http: HttpClient,
    public _helper: Helper,
    private router: Router,
    private _changeDetectorRef:ChangeDetectorRef){

    this.config = {
			itemsPerPage:this.limit,
			currentPage: 1,
			totalItems: this.collection.count
    };

    this.routeSubscribe = this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationEnd) {
        let activatedRoute:any = this.route;
        this.productId = activatedRoute.parent.parent.snapshot.paramMap.get('id');
        this.getProductEnquiryData(this.config.currentPage,this.config.itemsPerPage,this.sort_by,this.sort_order,this.search);
      }
    });

  }

  ngOnInit(){

  }

  ngOnDestroy(){
     if(this.blockDataTable){this.blockDataTable.unsubscribe();}
  }

  pageChanged(event:any){
    this.config.currentPage = event;
    this.getProductEnquiryData(this.config.currentPage,this.config.itemsPerPage,this.sort_by,this.sort_order,this.search);
  }

  getProductEnquiryData(page:number,limit:number,sortBy:string='created_at',sortOrder:any='DESC',search:string=''){
    this.blockDataTable.start();
    this._http.get<any>(`api/admin/products/enquiry/${this.productId}?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&search=${search}`).subscribe((resp:any) => {
        this.blockDataTable.stop();
        this.collection.data = resp.data;
        this.collection.count= resp.total;
        this.config.itemsPerPage =  resp.perPage;
        this.config.totalItems = resp.total;
        this.config.currentPage  =  resp.currentPage;
        this.hasMorePages = resp.hasMorePages;
        window.scrollTo({
          top: 0,
            behavior: 'smooth'
        })
    },(err:any)=>{
      this.blockDataTable.stop();
    });
  }

}
