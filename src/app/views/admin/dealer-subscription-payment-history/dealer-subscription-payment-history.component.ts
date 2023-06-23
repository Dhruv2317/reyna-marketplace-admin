import { Component, OnInit, ViewChild, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Helper } from 'src/app/services/helper.service';

@Component({
  selector: 'app-dealer-subscription-payment-history',
  templateUrl: './dealer-subscription-payment-history.component.html',
  styleUrls: ['./dealer-subscription-payment-history.component.scss']
})
export class DealerSubscriptionPaymentHistoryComponent implements OnInit, AfterViewInit, OnDestroy {
  dtOptions!: DataTables.Settings;
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  @BlockUI('datatable') blockDataTable!: NgBlockUI;
  dtTrigger: Subject<any> = new Subject();
  constructor(
    private route: ActivatedRoute,
    private _http: HttpClient,
    public _helper: Helper,
    private router: Router,
    private _renderer: Renderer2){
      this.getData();
  }

  ngOnInit() {
    $.fn.dataTable.ext.errMode = 'none';
    $(window).on('resize', () => {
      this.rerender();
    });
  }

  getData() {
    let that = this;
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
            'api/admin/dealers/subscription-payment-history',
            dataTablesParameters,
            {}
          )
          .subscribe((resp:any) => {
            this.blockDataTable.stop();
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: resp.data
            });
          }, (err: any) => {
            callback({
              recordsTotal: 0,
              recordsFiltered: 0,
              data: []
            });
          });
      },
      columns: [
        {
          data: 'dealer_name',
          title: 'Dealer Name',
          className: 'text-left  font-weight-normal',
          render: (data: any, type: any, record: any) => {
            if (data) {
              return `<a class="text-primary font-weight-bold" href="javascript:void(0);" dealerID=${record.dealer_id}>${data}</a>`;
            } else {
              return `<span></span>`;
            }
          }
        },
        {
          data: 'name',
          title: 'Plan Name',
          className: 'text-left  font-weight-normal'
        },
        {
          data: 'charged_amount',
          title: 'Charged amount',
          className: 'text-left  font-weight-normal',
          render: function (data: any, type: any, full: any) {
            return that._helper.getInINRFormat(full.currency, full.charged_amount)
          }
        },
        {
          data: 'stripe_charge_id',
          title: 'Stripe Charge',
          className: 'text-left  font-weight-normal',
          render: (data: any, type: any, record: any) => {
            if (data) {
              return `<a class="text-primary font-weight-bold" href="javascript:void(0);" chargeId=${record.stripe_charge_id}>${data}</a>`;
            } else {
              return `<span></span>`;
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
          title: 'Action',
          className: 'text-center',
          render: function (data: any, type: any, full: any) {
            return `
            <button class="btn btn-sm btn-primary m-0" receiptId=${full.receipt_url}>View Receipt</button>
            `;
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

  listenerFn: any;
  ngAfterViewInit(): void {
    this.dtTrigger.next();
    this.listenerFn = this._renderer.listen('document', 'click', (event: any) => {
      if (event.target.hasAttribute('dealerID')){
        this.goToDealerDetailsPage(event.target.getAttribute('dealerID'));
      }
      if (event.target.hasAttribute('receiptId')) {
        this.goToViewPage(event.target.getAttribute('receiptId'));
      }
      if (event.target.hasAttribute('chargeId')) {
        this.gotoStripeCharge(event.target.getAttribute('chargeId'));
      }
    });
  }


  ngOnDestroy() {
    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }
    this.listenerFn();
    if (this.blockDataTable) { this.blockDataTable.unsubscribe(); }
  }

  goToViewPage(receiptUrl: any): any {
    window.open(receiptUrl, '_blank');
  }

  gotoStripeCharge(charge_id: any) {
    window.open('https://dashboard.stripe.com/payments/' + charge_id, '_blank');
  }

  goToDealerDetailsPage(dealerID: any): any {
    this.router.navigate(['admin', 'dealers', 'view', dealerID, 'info']);
  }
  

}
