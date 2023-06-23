import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Toastr } from 'src/app/services/toastr.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Lightbox } from 'ngx-lightbox';
import * as moment from 'moment';
import { Helper } from 'src/app/services/helper.service';
import b64toBlob from 'b64-to-blob';
import { environment } from 'src/environments/environment'
import { orderHelper } from 'src/app/services/orderHelper.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { RefundDrugModalComponent } from '../../common-components/refund-drug-modal/refund-drug-modal.component';
import { RefundDrugModalService } from '../../common-components/refund-drug-modal/refund-drug-modal.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';


@Component({
  selector: 'app-orders-view',
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.scss']
})
export class OrdersViewComponent implements OnInit, OnDestroy {
  @BlockUI('order') blockOrderUI!: NgBlockUI;
  modalRef!: BsModalRef;
  orderId: any;
  parentSub: any;
  orderDetails: any;
  api_url: string = environment.api_url;

  iframeMapURL: string = `https://www.google.com/maps/embed/v1/place`;
  @ViewChild('mapIframe') input: any;
  imageUrl: any = '../../../../../assets/img/no-image.png';
  _albums = [{
    src: this.imageUrl,
    caption: 'License image',
    thumb: this.imageUrl
  }];


  all_drugs_for_refund_length = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: Toastr,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private lightbox: Lightbox,
    public helper: Helper,
    public cdr: ChangeDetectorRef,
    public _orderHelper: orderHelper,
    private modalService: BsModalService,
    private _refundDrugModalService: RefundDrugModalService) {

    this.orderId = this.route.snapshot.paramMap.get('id');
    this.getOrderDetails();

  }


  ngOnInit() {
  }

  openRefundModal() {
    this._refundDrugModalService.setData({
      order: this.orderDetails,
      all_drugs_for_refund_length: this.all_drugs_for_refund_length
    })
    this.modalRef = this.modalService.show(RefundDrugModalComponent)
    this.modalRef.content.onEventCompleted.subscribe((refundOrderForm: any) => {
      this.refundOrderFormSubmit(refundOrderForm)
    })
  }

  refundOrderFormSubmit(form: any) {
    if (form.valid) {
      // this.drugorderDetailsLoader.start();
      const apiURL = 'api/admin/orders/refund_request/' + this.orderId;
      const obj = {
        initiated_by: 'admin',
        order_id: this.orderId,
        selected_drug_ids: form.value.selected_drug_ids,
        refund_reason: form.value.refund_reason
      };
      this.http.post(apiURL, obj).subscribe((data: any) => {
        // this.drugorderDetailsLoader.stop();
        this.toastr.showSuccess('Refund request send successfully');
        this.getOrderDetails();
      }, (err: any) => {
        // this.drugorderDetailsLoader.stop();
        this.toastr.showError('Unable to send refund request');
      });
      return true;
    } else {
      return false;
    }
  }
 

  getOrderDetails(){
    this.blockOrderUI.start();
    const url = 'api/admin/orders/view/' + this.orderId;
    this.http.get(url).subscribe((data: any) => {
      this.blockOrderUI.stop();
      this.orderDetails = data;
    },
    (err:any) => {
        this.blockOrderUI.stop();
        this.toastr.showError('Unable to fetch order detials');
    });
  }

  goToUserDetails() {
    this.router.navigate(['admin', 'customers', 'view', this.orderDetails.user.id, 'orders']);
  }

  goToDetails(role:string) {
    let goto= role=='seller'?'sellers':'dealers'; 
    this.router.navigate(['admin', goto, 'view', this.orderDetails.seller_dealer_address.user_id, 'info']);
  }


  async getImage(path: string) {
    await this.http.post('api/document/preview', { path: path }, { responseType: 'blob' }).toPromise().then((result) => {
      const fr = new FileReader();
      fr.readAsDataURL(result);
      fr.onloadend = () => {
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(fr.result + '');
        this._albums = [];
        this._albums.push({
          src: this.imageUrl,
          caption: 'License image',
          thumb: this.imageUrl
        });
      }
    }).catch((err:any) => {
        this.imageUrl = '../../../../../assets/img/no-image.png';
        this._albums = [];
        this._albums.push({
          src: this.imageUrl,
          caption: 'License image',
          thumb: this.imageUrl
        });
      })
  }

  open(): void {
    this.lightbox.open(this._albums, 0, { centerVertically: true });
  }

  ngOnDestroy(){
    if(this.parentSub){this.parentSub.unsubscribe();}
    if(this.blockOrderUI){this.blockOrderUI.unsubscribe();}
  }


  /*---------------------------------------------------------------------------- */
  /*------------------------ DOWNLOAD BILLING STATEMENT FUNCTIONS  ------------------------  */
  /*---------------------------------------------------------------------------- */

  async downloadReceipt(type: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    const url = 'api/admin/orders/download?order_number=' + this.orderDetails.order_number_text + '&fileType=' + type + '&orderId=' + this.orderId;
    await this.http.get(url, { headers: headers, responseType: 'arraybuffer' }).toPromise().then((result) => {
      let fileName = type == 'refund_receipt' ? 'refund_receipt' : 'statement';
      fileName += '_order_' + this.orderDetails.order_number_text + '.pdf';
      this.writeContents(result, fileName, 'application/pdf');
    });
  }

  writeContents(content: any, fileName: string, contentType: any) {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

}
