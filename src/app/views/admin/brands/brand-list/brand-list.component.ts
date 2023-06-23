import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DataTableDirective } from 'angular-datatables';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subject } from 'rxjs';

import { BrandAddEditModalComponent } from '../brand-add-edit-modal/brand-add-edit-modal.component';
import { BrandAddEditModalService } from '../brand-add-edit-modal/brand-add-edit-modal.service';
import { Router } from '@angular/router';
import { Helper } from 'src/app/services/helper.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit, AfterViewInit, OnDestroy {
  modalRef!: BsModalRef;
  brandsList: any[] = [];

  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};

  @BlockUI('datatable') blockDataTable!: NgBlockUI;
  constructor(
    private router: Router,
    private _renderer:Renderer2,
    private _http: HttpClient,
    private _helper:Helper,
    private modalService: BsModalService,
    private _brandAddEditModalService: BrandAddEditModalService) {
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
      if (event.target.hasAttribute('brandEditId')) {
         that.openEditModal(event.target.getAttribute('brandEditId'));
      }
      if (event.target.hasAttribute('brandViewId')) {
         that.router.navigate(['admin', 'brands', 'view', event.target.getAttribute('brandViewId')])
      }
    });
  }

  ngOnDestroy() {
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }
    this.listenerFn();
    if(this.blockDataTable){
      this.blockDataTable.unsubscribe();
    }
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  openAddModal(){
    this._brandAddEditModalService.setData({event:'ADD'})
    this.modalRef = this.modalService.show(BrandAddEditModalComponent, {class: 'modal-x-lg'});
    this.modalRef.content.onEventCompleted.subscribe(()=>{
      this.rerender();
    });
  }

  openEditModal(brandId: any){

    this._http.get(`api/admin/brands/view/${brandId}`).toPromise().then((result: any) => {
      let data = result;
      this._brandAddEditModalService.setData({event:'EDIT',data:data});
      this.modalRef = this.modalService.show(BrandAddEditModalComponent, {class: 'modal-x-lg'});
      this.modalRef.content.onEventCompleted.subscribe(()=>{
        this.rerender();
      });
    });
  }

  getDTOptions() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      paging: true,
      serverSide: true,
      search: true,
      searching: true,
      autoWidth: true,
      ordering: true,
      order: [[2, 'desc']],
      ajax: (dataTablesParameters: any, callback) => {
        this.blockDataTable.start();
        this._http
          .post<any>(
            'api/admin/brands/list',
            dataTablesParameters,
            {}
          )
          .subscribe((resp:any) => {
            this.brandsList = resp.data;

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
          data:'image',
          title: 'Image',
          orderable: false,
          className: 'text-left  font-weight-normal',
          render: (data: any) => {
            if (data) {
              let url = environment.api_url + data;
              return `<img src=${url} height="80" width="80" />`;
            } else {
              return `-`;
            }
          }
        },
        {
          data:'cover_image',
          title: 'Cover Image',
          orderable: false,
          className: 'text-left  font-weight-normal',
          render: (data: any) => {
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
          title: 'Brand Name',
          className: 'text-left  font-weight-normal'
        },
        {
          data: 'slug',
          title: 'Slug',
          className: 'text-center  font-weight-normal'
        },
        {
          data: 'manufacturer_name',
          title: 'Manufacturer Name',
          className: 'text-left  font-weight-normal',
          render: function (data: any, type: any, full: any){
            if (data){
              return `${full.manufacturer_name}`;
            }else{
              return '-'
            }
          }
        },
        {
          data: 'is_active',
          title: 'Active',
          className: 'text-center  font-weight-normal',
          render: (data: any) => {
            if (data) {
              return `<i class="fa fa-check text-success"></img>`;
            } else {
              return `<i class="fa fa-times text-danger"></i>`;
            }
          }
        },
        {
          data: 'is_featured',
          title: 'Featured',
          className: 'text-center  font-weight-normal',
          render: (data: any) => {
            if (data) {
              return `<i class="fa fa-check text-success"></img>`;
            } else {
              return `<i class="fa fa-times text-danger"></i>`;
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
            return `<button type="button" class="btn btn-sm btn-primary mr-1"  brandViewId="${full.id}">View</button> <button type="button" class="btn btn-sm btn-primary m-0"  brandEditId="${full.id}">Edit</button>`;
          },
          orderable: false
        }
      ]
    };

  }

}
