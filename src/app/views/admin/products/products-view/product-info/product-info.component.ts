import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Toastr } from 'src/app/services/toastr.service';
import { environment } from 'src/environments/environment';
import { Helper } from 'src/app/services/helper.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ReasonModalComponent } from '../../../common-components/reason-modal/reason-modal.component';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
  @BlockUI('product') blockProductUI!: NgBlockUI;
  environmentUrl: any = environment
  productId: any;
  product: any;
  pdfIcon: string = '../../../../../../../assets/img/pdf_file_icon.png'
  videoIcon: string = '../../../../../../../assets/img/video-play-icon.png'
  public imageUrl: any = '../../../../../../../assets/img/no_preview.png';
  routeSubscribe:any;

  constructor(
    public http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
    public _helper:Helper,
    private modalService: BsModalService,
    public _toastr: Toastr){
    this.routeSubscribe = this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationEnd) {
        let activatedRoute:any = this.route;
        this.productId = activatedRoute.parent.parent.snapshot.paramMap.get('id');
        this.getProductDetails();
      }
    });
  }

  ngOnInit(){
  }

  ngOnDestroy(){
    if (this.routeSubscribe) { this.routeSubscribe.unsubscribe(); }
  }

  getProductDetails(){
    this.blockProductUI.start();
    const url = 'api/admin/products/view/' + this.productId;
    this.http.get(url).subscribe((res: any) => {
        this.blockProductUI.stop();
        this.product = res;
    },(err:any) => {
        this.blockProductUI.stop();
    });
  }
  modalRef!: BsModalRef;
  
  openReasonModal(status:string){
    this.modalRef = this.modalService.show(ReasonModalComponent)
    this.modalRef.content.onEventCompleted.subscribe((reason: any) => {
      this.updateStatus(status,reason);
    })
  }

  updateStatus(status:string,reason:string=''){
    const url = 'api/admin/products/update-status';
    this.http.post(url,{status:status,reason:reason,ids:[ this.productId]}).subscribe((res: any) => {
       this.getProductDetails();
    },(err:any) => {

    });
  }

  updateSequence (event: any) {
    let dataToSend: any = []
    event.data.forEach((obj: any) => {
        dataToSend.push({ ...obj.item, sequence:obj.sequence });
    });
    let url: string = `api/admin/products/update_sequence/${this.productId}`;
    this.http.post(url, { mode: event.mode, sequences: dataToSend }).subscribe((data:any) => {
        this._toastr.showSuccess('Sequence Updated Successfully');
      }, (err:any) => {
        this._toastr.showError('Unable to update sequence. Please try again');
      });
  }

  getUrl(url: string) {
    return environment.api_url + url
  }
}
