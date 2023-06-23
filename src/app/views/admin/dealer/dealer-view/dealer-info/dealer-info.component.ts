import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccountVerifyModalComponent } from 'src/app/components/account-verify-modal/account-verify-modal.component';
import { EditSubscriptionPlanService } from '../edit-subscription-plan/edit-subscription-plan.service';
import { EditSubscriptionPlanComponent } from '../edit-subscription-plan/edit-subscription-plan.component';

@Component({
  selector: 'app-dealer-info',
  templateUrl: './dealer-info.component.html',
  styleUrls: ['./dealer-info.component.scss']
})
export class DealerInfoComponent implements OnInit,OnDestroy {

  modalRef!: BsModalRef;
  @BlockUI('dealer') blockDealerUI!: NgBlockUI;
 
  dealerId:any;
  dealerDetails:any;
  routerSubscription:any;

  constructor(
    public http: HttpClient,
    private route: ActivatedRoute,
    private _router: Router,
    private modalService: BsModalService,
    private _editSubscriptionPlanModalService:EditSubscriptionPlanService,
    private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(){
    let activeRoute:any = this.route;
    if(activeRoute){
      this.routerSubscription = activeRoute.parent.parent.params.subscribe((params:any) => {
        this.dealerId = params['id'];
        this.getDealerDetails();
      });
    }
  }

  getDealerDetails(){
    this.blockDealerUI.start();
    const url = 'api/admin/dealers/view/' + this.dealerId;
    this.http.get(url).subscribe(async (data: any) => {
      this.blockDealerUI.stop();
      this.dealerDetails = data;
    }, (err:any) => {
      this.blockDealerUI.stop();
    });
  }


  openVerifyModal(){
    this.modalRef = this.modalService.show(AccountVerifyModalComponent,{class:'modal-sm'});
    this.modalRef.content.onFormSubmitted.subscribe((val:any)=>{
        this.markAsAccount(val);
    });
  }
  
  markAsAccount(val:any){
    this.blockDealerUI.start();
    const url = 'api/admin/users/mark_account_verified/' + this.dealerDetails.personal_info.id;
    this.http.post(url,val).subscribe(async (data: any) => {
      this.blockDealerUI.stop();
      this.getDealerDetails();
    }, (err:any) => {
      this.blockDealerUI.stop();
    });
  }

  ngOnDestroy(){
     if(this.routerSubscription){
      this.routerSubscription.unsubscribe();
     }
     if(this.blockDealerUI){this.blockDealerUI.unsubscribe();}
  }

  updateAccount(val:any){
    this.blockDealerUI.start();
    const url = 'api/admin/users/update_subscription_status/' + this.dealerDetails.personal_info.id;
    this.http.post(url,val).subscribe(async (data: any) => {
      this.blockDealerUI.stop();
      this.getDealerDetails();
    }, (err:any) => {
      this.blockDealerUI.stop();
    });
  }

  openEditSubscriptionPlanModal(){
    this._editSubscriptionPlanModalService.setData({
      subscription_activated_on:this.dealerDetails.personal_info.subscription_activated_on,
      subscription_expire_on:this.dealerDetails.personal_info.subscription_expire_on,
      subscription_status:this.dealerDetails.personal_info.subscription_status
    });
    this.modalRef = this.modalService.show(EditSubscriptionPlanComponent,{class:'modal-sm'});
    this.modalRef.content.onEventCompleted.subscribe((data:any)=>{
        this.updateAccount(data);
    });
  }
}
