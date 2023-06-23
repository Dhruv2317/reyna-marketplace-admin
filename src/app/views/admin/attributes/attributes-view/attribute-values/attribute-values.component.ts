import { Component, OnInit,ChangeDetectorRef, ViewChild, Renderer2, AfterViewInit,OnDestroy } from '@angular/core';
import {AttributeValuesService} from './attribute-values.service';
import {Helper} from 'src/app/services/helper.service';
import { DataTableDirective } from 'angular-datatables';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import {environment} from 'src/environments/environment';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ValuesAddEditModalComponent } from '../values-add-edit-modal/values-add-edit-modal.component';
import { ValuesAddEditModalService } from '../values-add-edit-modal/values-add-edit-modal.service';

@Component({
  selector: 'app-attribute-values',
  templateUrl: './attribute-values.component.html',
  styleUrls: ['./attribute-values.component.scss']
})
export class AttributeValuesComponent implements OnInit,AfterViewInit,OnDestroy {
  modalRef!: BsModalRef;
  TableData = [];
  dtOptions!: DataTables.Settings;
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  @BlockUI('datatable') blockDataTable!: NgBlockUI;
  dtTrigger: Subject<any> = new Subject();
  attributeId: any;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private _http: HttpClient,
    private router: Router,
    private _renderer: Renderer2,
    private _helper:Helper,
    private _changeDetectorRef: ChangeDetectorRef,
    private modalService: BsModalService,
    private _valuesAddEditModalService:ValuesAddEditModalService,
    private _CategoriesService:AttributeValuesService){

    let activeRoute:any = this.route;
    if(activeRoute){
      this.attributeId = activeRoute.parent.parent.snapshot.paramMap.get('id');
    }
    this.getDTOptions();
  }

  ngOnInit(){
    $.fn.dataTable.ext.errMode = 'none';
    /* $(window).on('resize', () => {
      this.rerender();
    }); */
  }

  openAddModal(){
    this._valuesAddEditModalService.setData({event:'ADD',data:{attribute_id:this.attributeId}})
    this.modalRef = this.modalService.show(ValuesAddEditModalComponent,{class:'modal-lg'});
    this.modalRef.content.onEventCompleted.subscribe(()=>{
        this.rerender();
    });
  }

  openEditModal(id:any){
    let data:any = this.TableData.find((item:any)=>item.id == id);
    data.attribute_id=this.attributeId;
    this._valuesAddEditModalService.setData({event:'EDIT',data:data});
    this.modalRef = this.modalService.show(ValuesAddEditModalComponent,{class:'modal-lg'});
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
      order: [[1, 'desc']],
      ajax: (dataTablesParameters: any, callback) => {
        this.blockDataTable.start();
        this._http
          .post<any>(
            'api/admin/attributes_values/list/'+this.attributeId,
            dataTablesParameters,
            {})
          .subscribe((resp) => {
            this.TableData = resp.data;
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
          title: 'Value Name',
          className: 'text-center  font-weight-normal'
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
          title: 'Action',
          className: 'text-center  font-weight-normal',
          render: function (data: any, type: any, full: any) {
            return `<button type="button" class="btn btn-sm btn-primary m-0"  valueEditId="${full.id}">Edit</button>`;
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
      if (event.target.hasAttribute('valueEditId')) {
        that.openEditModal(event.target.getAttribute('valueEditId'))
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
