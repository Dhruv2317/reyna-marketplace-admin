import { Component, OnInit, ViewChild, Renderer2,AfterViewInit,OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ShippingInsuranceAddEditModalComponent } from './shipping_insurance-add-edit-modal/shipping_insurance-add-edit-modal.component';
import { ShippingInsuranceAddEditModalService } from './shipping_insurance-add-edit-modal/shipping_insurance-add-edit-modal.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-shipping_insurance',
  templateUrl: './shipping_insurance.component.html',
  styleUrls: ['./shipping_insurance.component.scss']
})
export class ShippingInsuranceComponent implements OnInit,AfterViewInit,OnDestroy {
  shhipingInsuranceTableData = [];
  dtOptions!: DataTables.Settings;
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  @BlockUI('datatable') blockDataTable!: NgBlockUI;
  dtTrigger: Subject<any> = new Subject();
  modalRef!: BsModalRef;
  countriesList:any[]=[];


  constructor(
    private _http: HttpClient,
    private modalService: BsModalService,
    private _shippingInsuranceAddEditModalService: ShippingInsuranceAddEditModalService,
    private _renderer: Renderer2) {
    
      this.getCountries();
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
            'api/admin/shipping_insurance/list',
            dataTablesParameters,
            {}
          )
          .subscribe((resp:any) => {
            this.shhipingInsuranceTableData = resp.data;
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
          data: 'description',
          title: 'Description',
          className: 'text-center  font-weight-normal'
        },
        {
          data: 'home',
          title: 'Home',
          className: 'text-center  font-weight-normal'
        },
        {
          data: 'parcel',
          title: 'Parcel',
          className: 'text-center  font-weight-normal'
        },
        {
          data: 'currency',
          title: 'Currency',
          className: 'text-center  font-weight-normal'
        },
        {
          data: 'country_code',
          title: 'Country Code',
          className: 'text-center  font-weight-normal'
        },
        {
          title: 'Action',
          className: 'text-center  font-weight-normal',
          render: function (data: any, type: any, full: any) {
            return `<button class="btn btn-sm btn-primary m-0" recordEditId=${full.id}>Edit</button>`;
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
      if (event.target.hasAttribute('recordEditId')) {
        this.openEditModal(event.target.getAttribute('recordEditId'));
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

  private async getCountries() {
    this._http.get<any>('api/geo/countries').subscribe((resp) => {
      this.countriesList = resp;
    }, (err:any)=> {

    });
  }

  openAddModal(){
    this._shippingInsuranceAddEditModalService.setData({event:'ADD',countriesList:this.countriesList})
    this.modalRef = this.modalService.show(ShippingInsuranceAddEditModalComponent);
    this.modalRef.content.onEventCompleted.subscribe(()=>{
        this.rerender();
    });
  }

  openEditModal(id:any){
    let data = this.shhipingInsuranceTableData.find((item:any)=>item.id == id);
    this._shippingInsuranceAddEditModalService.setData({event:'EDIT',data:data,countriesList:this.countriesList});
    this.modalRef = this.modalService.show(ShippingInsuranceAddEditModalComponent);
    this.modalRef.content.onEventCompleted.subscribe(()=>{
      this.rerender();
    });
  }

}
