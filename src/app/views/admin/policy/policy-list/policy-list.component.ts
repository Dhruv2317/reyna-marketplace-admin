import { Component, OnInit, ViewChild, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Helper } from 'src/app/services/helper.service';

@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.scss']
})
export class PolicyListComponent implements OnInit, AfterViewInit,OnDestroy {
  faqTableData = [];
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
    this.getAllFaqQuestions();
  }

  ngOnInit() {
    $.fn.dataTable.ext.errMode = 'none';
    $(window).on('resize', () => {
      this.rerender();
    });
  }

  getAllFaqQuestions() {
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
      order: [[3, 'desc']],
      ajax: (dataTablesParameters: any, callback) => {
        this.blockDataTable.start();
        this._http
          .post<any>(
            'api/admin/policy/list',
            dataTablesParameters,
            {}
          )
          .subscribe((resp) => {
            this.faqTableData = resp.data;
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
          data: 'title',
          title: 'Title',
          className: 'text-left  font-weight-normal'
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
          className: 'text-center',
          render: function (data: any, type: any, full: any) {
            return `
            <button class="btn btn-sm btn-primary m-0" policyViewId=${full.id}>View <i class="ml-2 fa fa-eye"></i></button>
            <button class="btn btn-sm btn-primary m-0" policyEditId=${full.id}>Edit <i class="ml-2 fa fa-edit"></i></button>
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

  listenerFn:any;
  ngAfterViewInit(): void {
    this.dtTrigger.next();
    this.listenerFn = this._renderer.listen('document', 'click', (event: any) => {
      if (event.target.hasAttribute('policyViewId')) {
        this.goToViewPage(event.target.getAttribute('policyViewId'));
      }
      if (event.target.hasAttribute('policyEditId')) {
        this.goToEditPage(event.target.getAttribute('policyEditId'));
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

  goToEditPage(policyEditId: any): any {
    this.router.navigate(['admin', 'policy', 'edit', policyEditId]);
  }
  
  goToViewPage(policyViewId: any): any {
    this.router.navigate(['admin', 'policy', 'view', policyViewId]);
  }

}
