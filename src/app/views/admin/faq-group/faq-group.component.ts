import { Component, OnInit, ViewChild, Renderer2,AfterViewInit,OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { FAQGroupAddEditModalComponent } from './faq-group-add-edit-modal/faq-group-add-edit-modal.component';
import { FAQGroupAddEditModalService } from './faq-group-add-edit-modal/faq-group-add-edit-modal.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-faq-group',
  templateUrl: './faq-group.component.html',
  styleUrls: ['./faq-group.component.scss']
})
export class FAQGroupComponent implements OnInit,AfterViewInit,OnDestroy {
  manufacturersTableData = [];
  dtOptions!: DataTables.Settings;
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  @BlockUI('datatable') blockDataTable!: NgBlockUI;
  dtTrigger: Subject<any> = new Subject();
  modalRef!: BsModalRef;


  constructor(
    private _http: HttpClient,
    private modalService: BsModalService,
    private _manufacturerAddEditModalService: FAQGroupAddEditModalService,
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
      order: [[0, 'desc']],
      ajax: (dataTablesParameters: any, callback) => {
        this.blockDataTable.start();
        this._http
          .post<any>(
            'api/admin/faqs/list-group',
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
          data: 'heading',
          title: 'Heading',
          className: 'text-center  font-weight-normal'
        },
        {
          data: 'subheading',
          title: 'Subheading',
          className: 'text-center  font-weight-normal'
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
    this.modalRef = this.modalService.show(FAQGroupAddEditModalComponent,{class:'modal-x-lg'});
    this.modalRef.content.onEventCompleted.subscribe(()=>{
        this.rerender();
    });
  }

  openEditModal(id:any){
    let data = this.manufacturersTableData.find((item:any)=>item.id == id);
    this._manufacturerAddEditModalService.setData({event:'EDIT',data:data});
    this.modalRef = this.modalService.show(FAQGroupAddEditModalComponent,{class:'modal-x-lg'});
    this.modalRef.content.onEventCompleted.subscribe(()=>{
      this.rerender();
    });
  }

}
