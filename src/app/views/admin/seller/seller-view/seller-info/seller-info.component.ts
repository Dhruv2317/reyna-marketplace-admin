import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccountVerifyModalComponent } from 'src/app/components/account-verify-modal/account-verify-modal.component';

@Component({
  selector: 'app-seller-info',
  templateUrl: './seller-info.component.html',
  styleUrls: ['./seller-info.component.scss']
})
export class SellerInfoComponent implements OnInit,OnDestroy {
  modalRef!: BsModalRef;

  @BlockUI('seller') blockSellerUI!: NgBlockUI;
 
  sellerId:any;
  sellerDetails:any;
  routerSubscription:any;

  constructor(
    public http: HttpClient,
    private route: ActivatedRoute,
    private _router: Router,
    private modalService: BsModalService,
    private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(){
    let activeRoute:any = this.route;
    if(activeRoute){
      this.routerSubscription = activeRoute.parent.parent.params.subscribe((params:any) => {
        this.sellerId = params['id'];
        console.log('this.sellerId',this.sellerId)
        this.getSellerDetails();
      });
    }
  }

  ngOnDestroy(){
    if(this.routerSubscription){
      this.routerSubscription.unsubscribe();
     }
    if(this.blockSellerUI){this.blockSellerUI.unsubscribe();}
  }

  getSellerDetails(){
    this.blockSellerUI.start();
    const url = 'api/admin/sellers/view/' + this.sellerId;
    this.http.get(url).subscribe(async (data: any) => {
      this.blockSellerUI.stop();
      this.sellerDetails = data;
    }, (err:any) => {
      this.blockSellerUI.stop();
    });
  }

  openVerifyModal(){
    this.modalRef = this.modalService.show(AccountVerifyModalComponent,{class:'modal-sm'});
    this.modalRef.content.onFormSubmitted.subscribe((val:any)=>{
          this.markAsAccount(val);
    });
  }

  markAsAccount(val:any){
    this.blockSellerUI.start();
    const url = 'api/admin/users/mark_account_verified/' + this.sellerId;
    this.http.post(url,val).subscribe(async (data: any) => {
      this.blockSellerUI.stop();
      this.getSellerDetails();
    }, (err:any) => {
      this.blockSellerUI.stop();
    });
  }

}
