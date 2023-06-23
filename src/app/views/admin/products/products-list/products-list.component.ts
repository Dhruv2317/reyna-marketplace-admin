import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ActivatedRoute, Router } from '@angular/router';
import { Helper } from 'src/app/services/helper.service';
import { CurrencyPipe  } from '@angular/common';
import {environment} from 'src/environments/environment';
import { Toastr } from 'src/app/services/toastr.service';
import { ProductsFilterModalService } from '../products-filter-modal/products-filter-modal.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProductsFilterModalComponent } from '../products-filter-modal/products-filter-modal.component';
import { ReasonModalComponent } from '../../common-components/reason-modal/reason-modal.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, AfterViewInit, OnDestroy {
  modalRef!: BsModalRef;
  productCategoryList:any[]=[];
  productSubscriptionPlanList:any[]=[];
  productStatusList:any[]=[
    {
      name:"Draft",
      value:"draft"
    },
    {
      name:"Under review",
      value:"under_review"
    },
    {
      name:"Published",
      value:"published"
    },
    {
      name:"Rejected",
      value:"rejected"
    },
    {
      name:"Update Required",
      value:"update_required"
    },
    {
      name:"Deleted",
      value:"deleted"
    },
    {
      name:"Sold out",
      value:"sold_out"
    },
    {
      name:"Out of Stock",
      value:"out_of_stock"
    }
  ];

  
  productsList: any[] = [];
  product_config:any = {
    filter: {
      CATEGORY: [],
      SUBSCRIPTION_PLAN:[],
      USER_ID:'',
      STATUS:[],
      ATTRIBUTES:[]
    }
  };
  showHeader:boolean=true;

  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: any = {};

  @BlockUI('datatable') blockDataTable!: NgBlockUI;
  sellerDealerId:any;
  attributesData:any[]=[];

  constructor(
    private route: ActivatedRoute,
    private _http: HttpClient,
    private router: Router,
    public _helper: Helper,
    private cp:CurrencyPipe,
    public _toastr: Toastr,
    private modalService: BsModalService,
    private _productsFilterModalService: ProductsFilterModalService,
    private _renderer: Renderer2){

     let activeRoute:any=this.route;
     this.sellerDealerId = activeRoute.parent.parent.snapshot.paramMap.get('id') ? activeRoute.parent.parent.snapshot.paramMap.get('id') : null;
     if(this.sellerDealerId){
       this.product_config.filter.USER_ID = this.sellerDealerId;
       this.showHeader = false;
     }
     this.getAllAttributesData();
     this.getAllCategories();
     this.getAllSubscriptionPlans();
     this.getDTOptions();
  }

  ngOnInit(): void {
    $.fn.dataTable.ext.errMode = 'none';
  }

  listenerFn:any;
  ngAfterViewInit(): void {
    this.dtTrigger.next();
    let that=this;
    this.listenerFn = this._renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute('productID')) {
        that.goToDetailsPage(event.target.getAttribute('productID'));
      }
      if (event.target.hasAttribute('productEditId')) {
        that.goToEditPage(event.target.getAttribute('productEditId'));
      }
    });
  }

  goToDetailsPage(productID: any): any {
    let link = '/admin/products/view/'+productID
    this.router.navigate([]).then(result => {  window.open(link, '_blank'); });
  }

  goToEditPage(productEditId: any): any {
    let link = '/admin/products/edit/'+productEditId;
    this.router.navigate(['admin', 'products', 'edit', productEditId]).then(result => {  window.open(link, '_blank'); });
  }

  
  public getAllCategories(){
    const url = 'api/admin/categories/all';
    this._http.get(url).subscribe((data: any) => {
       this.productCategoryList=data;
    },
    (err:any) => {

    });
  }

  public getAllSubscriptionPlans(){
    const url = 'api/admin/subscription_plans/all?role=seller';
    this._http.get(url).subscribe((data: any) => {
       this.productSubscriptionPlanList=data;
    },
    (err:any) => {

    });
  }

  handleChange(event: string, value: any) {
    $('#productsList').DataTable().ajax.reload();
  }

  public handleCheckAll(event:any, flag:any) {
    if (flag == 'CATEGORY'){
      if (event.checked){
        this.product_config.filter.CATEGORY = this.productCategoryList.slice().map((item:any)=>item.id);
      } else {
        this.product_config.filter.CATEGORY = [];
      }
    }
    if (flag == 'SUBSCRIPTION_PLAN'){
      if (event.checked){
        this.product_config.filter.SUBSCRIPTION_PLAN = this.productSubscriptionPlanList.slice().map((item:any)=>item.id);
      } else {
        this.product_config.filter.SUBSCRIPTION_PLAN = [];
      }
    }
    if (flag == 'STATUS'){
      if (event.checked){
        this.product_config.filter.STATUS = this.productStatusList.slice().map((item:any)=>item.value);
      } else {
        this.product_config.filter.STATUS = [];
      }
    }
    this.rerender();
  }

  get notSelectedStutus (){
    return this.productStatusList.filter((item:any) => !this.product_config.filter.STATUS.some((b: any) => b === item.value)).length
  }

  get notSelectedCategory(){
    return this.productCategoryList.filter((item:any) => !this.product_config.filter.CATEGORY.some((b: any) => b === item)).length;
  }

  get notSelectedSubscriptionPlan(){
    return this.productSubscriptionPlanList.filter((item:any) => !this.product_config.filter.SUBSCRIPTION_PLAN.some((b: any) => b === item)).length;
  }
  
  clearFilter(){
    this.product_config = {filter: {
      CATEGORY: [],
      SUBSCRIPTION_PLAN:[],
      USER_ID:'',
      STATUS:[],
      ATTRIBUTES:[]
    }}
    $('#productsList').DataTable().ajax.reload();
  }

  getAllAttributesData(){
    const url = 'api/admin/attributes/all';
    this._http.get(url).subscribe((res: any) => {
       this.attributesData = res;
    },(err) => {
      this.attributesData =[];
    });
  }

  openMoreFiltersModal(){
    this._productsFilterModalService.setData({event:'EDIT',all_attributes: this.attributesData, filters:this.product_config.filter.ATTRIBUTES});
    this.modalRef = this.modalService.show(ProductsFilterModalComponent,{class:'modal-lg'});
    this.modalRef.content.onFilterAppliedCompleted.subscribe((appliedFilters:any)=>{
      this.product_config.filter.ATTRIBUTES=appliedFilters.attributes;
      this.handleChange('',null);
    });
  }

  ngOnDestroy(){
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }
    if(this.blockDataTable){this.blockDataTable.unsubscribe();}
    this.listenerFn();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  bulkUpdate(action:string){
    let selected_products:any =[];
		this.dtElement.dtInstance
			.then((dtInstance: DataTables.Api) => {
				selected_products = dtInstance.rows({ selected: true }).data();
				return selected_products;
			})
			.then((data) => {
        let temp:any=[];
				if(selected_products.length > 0){
          selected_products = selected_products.filter((item:any)=> {
              if(item.id){
                 temp.push(item.id)
              }
            });
            if(action=='rejected'){
              this.openReasonModal(action,temp);
            }else{
              this.updateStatus(action,temp,'');
            }
        }else{
          this._toastr.showWarning('No Product Selected');
        }
    });
  }

  openReasonModal(status:string,ids:any){
    this.modalRef = this.modalService.show(ReasonModalComponent)
    this.modalRef.content.onEventCompleted.subscribe((reason: any) => {
      this.updateStatus(status,ids,reason);
    })
  }
  
  updateStatus(status:string,ids:any,reason:string){
    const url = 'api/admin/products/update-status';
    this._http.post(url,{status:status,reason:reason,ids:ids}).subscribe((res: any) => {
      if(res.update_success.length>0){
        this._toastr.showSuccess(res.update_success);
      }

      if(res.rejected.length>0){
        this._toastr.showSuccess(res.rejected);
      }
      if(res.deleted.length>0){
        this._toastr.showSuccess(res.deleted);
      }
      if(res.updated.length>0){
        this._toastr.showSuccess(res.updated);
      }
      if(res.update_error.length>0){
      this._toastr.showWarning(res.update_error);
      }
      this.rerender();
    },(err:any) => {

    });
  }

  getDTOptions(){
    this.blockDataTable.start();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      paging: true,
      serverSide: true,
      search: true,
      searching: true,
      autoWidth: true,
      ordering: true,
      order: [[19, 'desc']],
      ajax: (dataTablesParameters: any, callback:any) => {
       dataTablesParameters.filter = {}
       dataTablesParameters.filter =  this.product_config.filter;
        this._http
          .post<any>(
            'api/admin/products/list',
            dataTablesParameters,
            {}
          )
          .subscribe((resp:any) => {
            this.blockDataTable.stop();
            this.productsList = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: resp.data
            });
          },(error:any)=>{
            this.blockDataTable.stop();
            callback({
              recordsTotal: 0,
              recordsFiltered:0,
              data:[]
            });
          });
      },
      columns: [
        {
          data:'id',
          title:'Id',
          className: 'text-left  font-weight-normal'
        },
        {
          data:'image',
          title: 'Image',
          orderable: false,
          className: 'text-left  font-weight-normal',
          render: (data: any, type: any, full: any) => {
            if (data) {
              return `<a href="javascript:void(0);" productID=${full.id}><img src='${environment.api_url + data}' height="100" width="100" /></>`;
            } else {
              return `-`;
            }
          }
        },
        {
          data: 'name',
          title: 'Product Name',
          className: 'text-left  font-weight-normal',
          render: (data: any, type: any, full: any) => {
            if (data) {
              return `<a href="javascript:void(0);" productID=${full.id}>${data}</a>`
            } else {
              return '<span>-</span>';
            }
          }
        },
        {
          data: 'model',
          title: 'Model',
          className: 'text-left  font-weight-normal'
        },
        {
          data: 'category_name',
          title: 'Category',
          className: 'text-left  font-weight-normal'
        },

        {
          data: 'brand_name',
          title: 'Brand',
          className: 'text-left  font-weight-normal'
        },
        {
          data: 'status',
          title: 'Status',
          className: 'text-center  font-weight-normal',
          render: (data: any, type: any, full: any) => {
            if (data) {
              return this._helper.getProductStatus(data);
            } else {
              return '<span>-</span>';
            }
          }
        },
        {
          data: 'has_subscription',
          title: 'Has Subscription',
          className: 'text-center  font-weight-normal',
          render: (data:any) => {
            if (data) {
              return `<i class="fa fa-check text-success"></i>`;
            } else {
              return `<i class="fa fa-times text-danger"></i>`;
            }
          }
        },
        {
          data: 'subscription_plan_name',
          title: 'Subscription Plan',
          className: 'text-center  font-weight-normal'
        },
        {
          data: 'subscription_status',
          title: 'Subscription Status',
          className: 'text-center  font-weight-normal',
          render: (data: any, type: any, full: any) => {
            if (data=='active') {
              return '<span class="badge badge-success">Active</span>'
            }
            else if (data=='inactive') {
              return '<span class="badge badge-dark">Inactive</span>'
            }
            else {
              return '<span>-</span>';
            }
          }
        },
        {
          data: 'created_by',
          title: 'Created by',
          className: 'text-left  font-weight-normal'
        },
        {
          data: 'rating_count',
          title: 'Nos. Ratings',
          className: 'text-left  font-weight-normal'
        },
        {
          data: 'average_rating',
          title: 'Avg Rating',
          className: 'text-left  font-weight-normal'
        },
        {
          data: 'sold_count',
          title: 'Sold Count',
          className: 'text-left  font-weight-normal'
        },
        {
          data: 'total_sales',
          title: 'Total Sales',
          className: 'text-left  font-weight-normal'
        },
        {
          data: 'regular_price',
          title: 'Regular Price',
          className: 'text-center  font-weight-normal',
          render: (data: any, type: any, full: any) => {
            if (data) {
              return this.cp.transform(data,full.currency);
            } else {
              return '<span>-</span>';
            }
          },
        },
        {
          data: 'sale_price',
          title: 'Sale Price',
          className: 'text-center  font-weight-normal',
          render: (data: any, type: any, full: any) => {
            if (data) {
              return this.cp.transform(data,full.currency);
            } else {
              return '<span>-</span>';
            }
          },
        },
        {
          data: 'is_active',
          title: 'Active',
          className: 'text-center  font-weight-normal',
          render: (data:any) => {
            if (data) {
              return `<i class="fa fa-check text-success"></i>`;
            } else {
              return `<i class="fa fa-times text-danger"></i>`;
            }
          }
        },
        {
          data: 'is_featured',
          title: 'Is Featured',
          className: 'text-center  font-weight-normal',
          render: (data:any) => {
            if (data) {
              return `<i class="fa fa-check text-success"></i>`;
            } else {
              return `<i class="fa fa-times text-danger"></i>`;
            }
          }
        },
        {
          data: 'created_at',
          title: 'Created At',
          className: 'text-center  font-weight-normal',
          render: (data: any, type: any, full: any) => {
            if (data) {
              return this._helper.getFormattedDate(data, 'DD/MM/YYYY HH:mm');
            } else {
              return '<span>-</span>';
            }
          }
        },
        {
          data: 'subscription_activation_date',
          title: 'Subscription Activate Date',
          className: 'text-center  font-weight-normal',
          render: (data: any, type: any, full: any) => {
            if (data) {
              return this._helper.getFormattedDate(data, 'DD/MM/YYYY HH:mm');
            } else {
              return '<span>-</span>';
            }
          }
        },
        {
          data: 'subscription_expiry_date',
          title: 'Subscription Expiry Date',
          className: 'text-center  font-weight-normal',
          render: (data: any, type: any, full: any) => {
            if (data) {
              return this._helper.getFormattedDate(data, 'DD/MM/YYYY HH:mm');
            } else {
              return '<span>-</span>';
            }
          }
        },
        {
          title: 'Action',
          className: 'text-center  font-weight-normal',
          render: function (data: any, type: any, full: any) {
            return `
            <button class="btn btn-primary btn-sm m-0" productID=${full.id}>View</button>
            `;
          },
          orderable: false
        }
      ],
      select: true
    };

  }
}
