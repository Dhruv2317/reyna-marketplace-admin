import { Component, OnInit,ChangeDetectorRef, ViewChild, Renderer2, AfterViewInit,OnDestroy } from '@angular/core';
import {CategorySubcategoriesService} from './category-subcategories.service';
import {Helper} from 'src/app/services/helper.service';
import { DataTableDirective } from 'angular-datatables';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import {environment} from 'src/environments/environment';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SubcategoriesAddEditModalComponent } from '../subcategories-add-edit-modal/subcategories-add-edit-modal.component';
import { SubcategoriesAddEditModalService } from '../subcategories-add-edit-modal/subcategories-add-edit-modal.service';

@Component({
  selector: 'app-category-subcategories',
  templateUrl: './category-subcategories.component.html',
  styleUrls: ['./category-subcategories.component.scss']
})
export class CategorySubcategoriesComponent implements OnInit,AfterViewInit,OnDestroy {
  modalRef!: BsModalRef;
  CategoryTableData = [];
  dtOptions!: DataTables.Settings;
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  @BlockUI('datatable') blockDataTable!: NgBlockUI;
  dtTrigger: Subject<any> = new Subject();

  categoryId: any;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private _http: HttpClient,
    private router: Router,
    private _renderer: Renderer2,
    private _helper:Helper,
    private _changeDetectorRef: ChangeDetectorRef,
    private modalService: BsModalService,
    private _subcategoryAddEditModalService: SubcategoriesAddEditModalService,
    private _CategoriesService:CategorySubcategoriesService){

      let activeRoute:any = this.route;
      if(activeRoute){
        this.categoryId = activeRoute.parent.parent.snapshot.paramMap.get('id');
      }

      this.getDTOptions();
  }

  ngOnInit() {
    $.fn.dataTable.ext.errMode = 'none';
    /* $(window).on('resize', () => {
      this.rerender();
    }); */
  }

  openAddModal(){
    this._subcategoryAddEditModalService.setData({event:'ADD',data:{category_id:this.categoryId}})
    this.modalRef = this.modalService.show(SubcategoriesAddEditModalComponent,{class:'modal-full-lg'});
    this.modalRef.content.onEventCompleted.subscribe(()=>{
        this.rerender();
    });
  }

  openEditModal(id:any){
    let data:any = this.CategoryTableData.find((item:any)=>item.id == id);
    data.category_id=this.categoryId;
    this._subcategoryAddEditModalService.setData({event:'EDIT',data:data});
    this.modalRef = this.modalService.show(SubcategoriesAddEditModalComponent,{class:'modal-full-lg'});
    this.modalRef.content.onEventCompleted.subscribe(()=>{
      this.rerender();
    });
  }


  getDTOptions(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      paging: true,
      serverSide: true,
      // processing: true,
      search: true,
      searching: true,
      autoWidth: true,
      ordering: true,
      order: [[2, 'desc']],
      ajax: (dataTablesParameters: any, callback) => {
        this.blockDataTable.start();
        this._http
          .post<any>(
            'api/admin/subcategories/list/'+this.categoryId,
            dataTablesParameters,
            {})
          .subscribe((resp) => {
            this.CategoryTableData = resp.data;
            this.blockDataTable.stop();
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: resp.data
            });
          });
      },
      columns: [
        {
          data:'image_url',
          title: 'Image',
          orderable: false,
          className: 'text-center  font-weight-normal',
          render: (data) => {
            if (data) {
              let url = environment.api_url + data;
              return `<img src=${url} height="80" width="80" />`;
            } else {
              return `-`;
            }
          }
        },
        {
          data: 'name',
          title: 'SubCategory Name',
          className: 'text-center  font-weight-normal'
        },
        {
          data: 'is_active',
          title: 'Active',
          className: 'text-center  font-weight-normal',
          render: (data) => {
            if (data) {
              return `<i class="fa fa-check text-success"></img>`;
            } else {
              return `<i class="fa fa-times text-danger"></i>`;
            }
          }
        },
        {
          data:'min_shipping_weight',
          title: 'Min Shipping Weight',
          className: 'text-left  font-weight-normal',
          render: (data: any) => {
            if (data) {
              return data+' grams'
            } else {
              return `-`;
            }
          }
        },
        {
          data:'max_shipping_weight',
          title: 'Max Shipping Weight',
          className: 'text-left  font-weight-normal',
          render: (data: any) => {
            if (data) {
              return data+' grams'
            } else {
              return `-`;
            }
          }
        },
        {
          data: 'created_at',
          title: 'Created At',
          className: 'text-center  font-weight-normal',
          render: (data) => {
            if (data) {
              return this._helper.getFormattedDate(data, 'DD/MM/YYYY');
            } else {
              return '<span>-</span>';
            }
          }
        },
        {
          data: 'updated_at',
          title: 'Updated At',
          className: 'text-center  font-weight-normal',
          render: (data) => {
            if (data) {
              return this._helper.getFormattedDate(data, 'DD/MM/YYYY');
            } else {
              return '<span>-</span>';
            }
          }
        },
        {
          title: 'Action',
          className: 'text-center  font-weight-normal',
          render: function (data: any, type: any, full: any) {
            return `<button type="button" class="btn btn-sm btn-primary m-0"  categoryEditId="${full.id}">Edit</button>`;
          },
          orderable: false
        }
      ]
    };
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  listenerFn:any;
  ngAfterViewInit(): void {
    this.dtTrigger.next();
    let that=this;
    this.listenerFn = this._renderer.listen('document', 'click', (event:any) => {
      if (event.target.hasAttribute('categoryEditId')) {
        that.openEditModal(event.target.getAttribute('categoryEditId'))
      }else{

      }
    });

  }

  ngOnDestroy(): void {
		// Do not forget to unsubscribe the event
		if(this.dtTrigger){
			this.dtTrigger.unsubscribe();
    }
    if(this.dtElement && this.dtElement.dtInstance){
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
      });
    }
    if(this.blockDataTable){this.blockDataTable.unsubscribe();}
    this.listenerFn();
	}


}
