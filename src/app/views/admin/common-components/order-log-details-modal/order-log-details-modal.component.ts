import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal'
import { OrderLogDetailsModalService } from '../order-log-details-modal/order-subscription-modal.service';

@Component({
  selector: 'app-order-log-details-modal',
  templateUrl: './order-log-details-modal.component.html',
  styleUrls: ['./order-log-details-modal.component.scss']
})
export class OrderLogDetailsModalComponent implements OnInit {
  logDetails: any;

  constructor(
    private _bsModalRef:BsModalRef,
    private _orderLogDetailsModalService: OrderLogDetailsModalService) { }

  ngOnInit() {
    let details = this._orderLogDetailsModalService.getFormData();
    if (details) {
      this.logDetails = details
    }
  }

  closeModal(){
    this._bsModalRef.hide();
  }
}
