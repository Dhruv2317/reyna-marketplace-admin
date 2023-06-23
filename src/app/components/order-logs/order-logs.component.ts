import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { Toastr } from '../../services/toastr.service';
import { Helper } from 'src/app/services/helper.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OrderLogDetailsModalComponent } from '../order-log-details-modal/order-log-details-modal.component';
import { OrderLogDetailsModalService } from '../order-log-details-modal/order-subscription-modal.service';

@Component({
    selector: 'app-order-logs',
    templateUrl: './order-logs.component.html',
    styleUrls: ['./order-logs.component.scss']
  })
  export class OrderLogsComponent implements OnInit {
    modalRef!: BsModalRef;
    orderId: any;
    parentSub: any;
    userType: any = 'admin,user,seller,dealer';
    orderLogs: any[] = [];
    orderType: string = '';
    constructor(
      private router: Router,
      public _helper: Helper,
      private http: HttpClient,
      private toastr: Toastr,
      private route: ActivatedRoute,
      private modalService: BsModalService,
      private changeDetectorRef: ChangeDetectorRef,
      private _orderLogDetailsModalService: OrderLogDetailsModalService){
      this.orderId = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit() {
      this.getOrderLogs();
    }

    getOrderLogs(filterValue: any = this.userType){
      let url = `api/admin/orders/logs/${this.orderId}?user_types=${filterValue}`;
      this.http.get(url).subscribe((data: any) => {
        this.orderLogs = data;
      }, (err:any) => {

      });
    }

    showLogDetailsModal(log: any) {
      let formdata = {
        request: JSON.parse(log.request_input),
        response: JSON.parse(log.response_output),
        event_name: log.event,
        user_name: log.full_name,
        info: log.data,
        created_at: this._helper.getUTCtoLocalDateTime(log.created_at)
      }
      this._orderLogDetailsModalService.setFormData(formdata);
      this.modalRef = this.modalService.show(OrderLogDetailsModalComponent,{class:'modal-full-lg'});
    }
}
