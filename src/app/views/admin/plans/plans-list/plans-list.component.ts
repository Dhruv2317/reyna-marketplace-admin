import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { PlansAddEditModalComponent } from '../plans-add-edit-modal/plans-add-edit-modal.component';
import {  PlansAddEditModalService } from '../plans-add-edit-modal/plans-add-edit-modal.service';
import { Router } from '@angular/router';
import { Helper } from 'src/app/services/helper.service';

@Component({
  selector: 'app-plans-list',
  templateUrl: './plans-list.component.html',
  styleUrls: ['./plans-list.component.scss']
})
export class  PlansListComponent implements OnInit, AfterViewInit, OnDestroy {
  modalRef!: BsModalRef;
  plansList: any[] = [];
  countriesList:any[]=[];

  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};

  @BlockUI('datatable') blockDataTable!: NgBlockUI;
  constructor(
    private router:Router,
    private _renderer:Renderer2,
    private _http: HttpClient,
    private modalService: BsModalService,
    private _helper:Helper,
    private _hcAddEditModalService:  PlansAddEditModalService
  ) {
     this.getCountries();
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
      if (event.target.hasAttribute('planEditId')) {
         that.openEditModal(event.target.getAttribute('planEditId'));
      }else if (event.target.hasAttribute('planViewId')) {
        that.goToDetailsPage(event.target.getAttribute('planViewId'));
      }
    });
  }

  goToDetailsPage(categoryId: any): any {
    this.router.navigate(['admin', 'plans', 'view', categoryId]);
  }

  ngOnDestroy() {
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }
    if (this.blockDataTable) { this.blockDataTable.unsubscribe(); }
    this.listenerFn();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  private async getCountries() {
    this._http.get<any>('api/geo/countries').subscribe((resp) => {
      this.countriesList = resp;
    }, (err:any)=> {

    });
  }

  openAddModal(){
    this._hcAddEditModalService.setData({event:'ADD',countriesList:this.countriesList})
    this.modalRef = this.modalService.show( PlansAddEditModalComponent,{class:'modal-lg'});
    this.modalRef.content.onEventCompleted.subscribe(()=>{
        this.rerender();
    });
  }

  openEditModal(id:any){
    let data = this.plansList.find((item:any)=>item.id == id);
    this._hcAddEditModalService.setData({event:'EDIT',data:data,countriesList:this.countriesList});
    this.modalRef = this.modalService.show( PlansAddEditModalComponent,{class:'modal-lg'});
    this.modalRef.content.onEventCompleted.subscribe(()=>{
      this.rerender();
    });
  }

  getDTOptions() {
    let that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      paging: true,
      serverSide: true,
      search: true,
      searching: true,
      autoWidth: true,
      ordering: true,
      order: [[0, 'desc']],
      ajax: (dataTablesParameters: any, callback) => {
        this.blockDataTable.start();
        this._http
          .post<any>(
            environment.api_url+'api/SubscriptionPlan/GetSubscriptionPlans',
            dataTablesParameters,
            {}
          )
          .subscribe((resp:any) => {
            this.plansList = resp.data.data;

            this.blockDataTable.stop();
            callback({
              recordsTotal: resp.data.recordsTotal,
              recordsFiltered: resp.data.recordsFiltered,
              data: resp.data.data
            });
          });
      },
      columns: [
        {
          data: 'name',
          title: 'Name',
          className: 'text-left  font-weight-normal'
        },
        {
          data: 'planFor',
          title: 'Plan for',
          className: 'text-left  font-weight-normal'
        },
        {
          data: 'duration',
          title: 'Duration',
          render: function (data: any, type: any, full: any) {
            return `${full.duration} ${full.durationUnit}`
          }
        },
        {
          data: 'price',
          title: 'Price',
          render: function (data: any, type: any, full: any) {
            return that._helper.getInINRFormat(full.currency ! =null ? full.currency : 'INR',full.price)
          }
        },
        {
          data: 'isActive',
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
          data: 'createdAt',
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
          data: 'updatedAt',
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
          data:'',
          title: 'Action',
          className: 'text-center  font-weight-normal',
          render: function (data: any, type: any, full: any) {
            return `<button type="button" class="btn btn-sm btn-primary"  planEditId="${full.id}">Edit</button>`;
          },
          orderable: false
        }
      ]
    };

  }



}
