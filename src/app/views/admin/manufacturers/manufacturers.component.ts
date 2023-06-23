import { Component, OnInit, ViewChild, Renderer2,AfterViewInit,OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ManufacturerAddEditModalComponent } from './manufacturer-add-edit-modal/manufacturer-add-edit-modal.component';
import { ManufacturerAddEditModalService } from './manufacturer-add-edit-modal/manufacturer-add-edit-modal.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Helper } from 'src/app/services/helper.service';

@Component({
  selector: 'app-anufacturers',
  templateUrl: './manufacturers.component.html',
  styleUrls: ['./manufacturers.component.scss']
})
export class ManufacturersComponent implements OnInit,AfterViewInit,OnDestroy {
  manufacturersTableData = [];
  dtOptions!: DataTables.Settings;
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  @BlockUI('datatable') blockDataTable!: NgBlockUI;
  dtTrigger: Subject<any> = new Subject();
  modalRef!: BsModalRef;


  constructor(
    private _http: HttpClient,
    private _helper:Helper,
    private modalService: BsModalService,
    private _manufacturerAddEditModalService: ManufacturerAddEditModalService,
    private _renderer: Renderer2) {
    this.getDTOptions();
  }


  ngOnInit() {
    $.fn.dataTable.ext.errMode = 'none';
  }

  getDTOptions() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 100,
      paging: true,
      serverSide: true,
      // processing: true,
      search: true,
      searching: true,
      autoWidth: true,
      ordering: true,
      order: [[4, 'desc']],
      ajax: (dataTablesParameters: any, callback) => {
        this.blockDataTable.start();
        this._http
          .post<any>(
            'api/admin/manufacturers/list',
            dataTablesParameters,
            {}
          )
          .subscribe((resp:any) => {
            this.manufacturersTableData = resp.data;
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
          data: 'name',
          title: 'Name',
          className: 'text-center  font-weight-normal'
        },
        {
          data: 'address',
          title: 'Address',
          className: 'text-center  font-weight-normal',
          render: (data: any, type: any, record: any) => {
            if (data) {
              return `<span>${data}</span>`;
            } else {
              return `<span>-</span>`;
            }
          }
        },
        {
          data: 'contact_number',
          title: 'Contact number',
          className: 'text-center  font-weight-normal',
          render: (data: any, type: any, record: any) => {
            if (data) {
              return `<span>${data}</span>`;
            } else {
              return `<span>-</span>`;
            }
          }
        },
        {
          data: 'is_active',
          title: 'Active',
          className: 'text-center  font-weight-normal',
          render: (data) => {
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
            return `<button class="btn btn-sm btn-primary m-0" stateEditId=${full.id}>Edit</button>`;
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
    this.listenerFn = this._renderer.listen('document', 'click', (event:any) => {
      if (event.target.hasAttribute('stateEditId')) {
        this.openEditModal(event.target.getAttribute('stateEditId'));
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

  openAddModal(){
    this._manufacturerAddEditModalService.setData({event:'ADD'})
    this.modalRef = this.modalService.show(ManufacturerAddEditModalComponent);
    this.modalRef.content.onEventCompleted.subscribe(()=>{
        this.rerender();
    });
  }

  openEditModal(id:any){
    let data = this.manufacturersTableData.find((item:any)=>item.id == id);
    this._manufacturerAddEditModalService.setData({event:'EDIT',data:data});
    this.modalRef = this.modalService.show(ManufacturerAddEditModalComponent);
    this.modalRef.content.onEventCompleted.subscribe(()=>{
      this.rerender();
    });
  }

}
