import { Component, OnInit, ViewChild, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { Helper } from 'src/app/services/helper.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dealer-list',
  templateUrl: './dealer-list.component.html',
  styleUrls: ['./dealer-list.component.scss']
})
export class DealerListComponent implements OnInit, AfterViewInit,OnDestroy {
  dtOptions!: DataTables.Settings;
  patientsTableData: any[] = [];
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  @BlockUI('datatable') blockDataTable!: NgBlockUI;
  dtTrigger: Subject<any> = new Subject();
  public counts : any;

  customer_config:any = {
    filter: {
      COUNTRY:'',
      STATE:'',
      CITY:'',
    }
  };
  countriesList:any[] = [];
  statesList:any[] = [];
  citiesList:any[] = [];

  constructor(
    public _http: HttpClient,
    public _helper: Helper,
    private router: Router,
    private _renderer: Renderer2
  ) {
    this.getDTOptions();
  }

  ngOnInit() {
    $.fn.dataTable.ext.errMode = 'none';
    $(window).on('resize', () => {
      this.rerender();
    });
  }

  listenerFn:any;
  ngAfterViewInit(): void {
    this.dtTrigger.next();
    this.listenerFn = this._renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute('dealerID')) {
        this.goToDealerDetailsPage(event.target.getAttribute('dealerID'));
      }
      
    });
  }

  ngOnDestroy(){
    if (this.dtTrigger){
      this.dtTrigger.unsubscribe();
    }
    if (this.blockDataTable) { this.blockDataTable.unsubscribe(); }
    this.listenerFn();
  }

  
  public handleCheckAll (event:any, flag:any) {
    /* if (event.checked) {
      this.customer_config.filter.STATE = this.countriesList.map(({_id}) => _id);
    } else {
      this.customer_config.filter.STATE = [];
    } */
    $('#dealersList').DataTable().ajax.reload();
  } 

  goToDealerDetailsPage(dealerID: any): any {
    this.router.navigate(['admin', 'dealers', 'view', dealerID, 'info']);
  }
  

  getDTOptions(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      paging: true,
      serverSide: true,
      // processing: true,
      search: true,
      searching: true,
      autoWidth: true,
      ordering: true,
      order: [[0, 'desc']],
      ajax: (dataTablesParameters: any, callback) => {
        /* set manual filters in req body */
        dataTablesParameters.filter = {};

        this.blockDataTable.start();
        this._http
          .post<any>(
            'api/admin/dealers/list',
            dataTablesParameters,
            {}
          )
          .subscribe((resp) => {
            this.patientsTableData = resp.data;
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
          data: 'company_name',
          title: 'Company name',
          className: 'text-left  font-weight-normal',
          render: (data: any, type: any, record: any) => {
            if (data) {
              return `<a class="text-primary font-weight-bold" href="javascript:void(0);" dealerID=${record.id}>${data}</a>`;
            } else {
              return `<span>-</span>`;
            }
          }
        },
        {
          data: 'first_name',
          title: 'Name',
          className: 'text-left  font-weight-normal',
          render: (data: any, type: any, record: any) => {
            if (data) {
              return `<a class="text-primary font-weight-bold" href="javascript:void(0);" dealerID=${record.id}>${data.charAt(0).toUpperCase() + data.slice(1) +' '+record.last_name}</a>`;
            } else {
              return `<span>-</span>`;
            }
          }
        },
        {
          data:'business_type',
          title: 'Business type',
          className: 'text-left  font-weight-normal'
        },
        {
          data: 'phone_number',
          title: 'Phone',
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
          data: 'country',
          title: 'Country',
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
          data: 'state',
          title: 'State',
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
          data: 'city_name',
          title: 'City',
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
          data: 'zip_code',
          title: 'ZipCode',
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
          data:'vat_number',
          title: 'Vat number',
          className: 'text-left  font-weight-normal',
          render: (data: any, type: any, record: any) => {
            if (data) {
              return `<span>${data}</span>`;
            } else {
              return `<span>-</span>`;
            }
          }
        },
        {
          data: 'website',
          title: 'website',
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
          data: 'created_at',
          title: 'Member Since',
          className: 'text-center  font-weight-normal',
          render: (data: any) => {
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
          render: function (data: any, type: any, record: any) {
            return `<button class="btn btn-primary btn-sm m-0" dealerID=${record.id}>View</button>`;
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

  handleChange(event: string, value: any) {
    $('#dealersList').DataTable().ajax.reload();
  }

  clearFilter() {
    this.customer_config = {filter: {COUNTRY:'', STATE:'',CITY:''}}
    $('#dealersList').DataTable().ajax.reload();
  }
}
