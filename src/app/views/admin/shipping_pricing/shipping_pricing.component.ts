import { Component, OnInit, ViewChild, Renderer2,AfterViewInit,OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ShippingPricingAddEditModalComponent } from './shipping_pricing-add-edit-modal/shipping_pricing-add-edit-modal.component';
import { ShippingPricingAddEditModalService } from './shipping_pricing-add-edit-modal/shipping_pricing-add-edit-modal.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-shipping_pricing',
  templateUrl: './shipping_pricing.component.html',
  styleUrls: ['./shipping_pricing.component.scss']
})
export class ShippingPricingComponent implements OnInit,AfterViewInit,OnDestroy {
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
    private _shippingPricingAddEditModalService: ShippingPricingAddEditModalService,
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
            'api/admin/shipping_pricing/list',
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
          data: 'retour',
          title: 'Retour',
          className: 'text-center  font-weight-normal'
        },
        {
          data: 'currency',
          title: 'Currency',
          className: 'text-center  font-weight-normal'
        },
        {
          data:'country',
          title: 'Country',
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
    this._shippingPricingAddEditModalService.setData({event:'ADD',countriesList:this.countriesList})
    this.modalRef = this.modalService.show(ShippingPricingAddEditModalComponent);
    this.modalRef.content.onEventCompleted.subscribe(()=>{
        this.rerender();
    });
  }

  openEditModal(id:any){
    let data = this.shhipingInsuranceTableData.find((item:any)=>item.id == id);
    this._shippingPricingAddEditModalService.setData({event:'EDIT',data:data,countriesList:this.countriesList});
    this.modalRef = this.modalService.show(ShippingPricingAddEditModalComponent);
    this.modalRef.content.onEventCompleted.subscribe(()=>{
      this.rerender();
    });
  }

}
