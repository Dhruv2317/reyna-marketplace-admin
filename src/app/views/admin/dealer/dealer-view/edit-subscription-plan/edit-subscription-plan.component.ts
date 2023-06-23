import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EditSubscriptionPlanService } from './edit-subscription-plan.service';

@Component({
  selector: 'app-edit-subscription-plan',
  templateUrl: './edit-subscription-plan.component.html',
  styleUrls: ['./edit-subscription-plan.component.scss']
})
export class EditSubscriptionPlanComponent implements OnInit {
  @Output() onEventCompleted: EventEmitter<any> = new EventEmitter();
  modalEvent: any;
  editSubscriptionPlanForm: UntypedFormGroup;
  minDate: Date;

  constructor(
    private _http: HttpClient,
    private _bsModalRef:BsModalRef,
    private formBuilder: UntypedFormBuilder,
    private _changeDetectorRef:ChangeDetectorRef,
    private _editSubscriptionPlanService: EditSubscriptionPlanService){ 
    this.minDate = new Date();

    this.editSubscriptionPlanForm = this.formBuilder.group({
      'subscription_activated_on': new UntypedFormControl(null, []),
      'subscription_expire_on': new UntypedFormControl(null, []),
      'subscription_status': new UntypedFormControl(null, [Validators.required])
    });
  }

  get subscription_activated_on(){return this.editSubscriptionPlanForm.get('subscription_activated_on');}
  get subscription_expire_on(){return this.editSubscriptionPlanForm.get('subscription_expire_on');}
  get subscription_status(){return this.editSubscriptionPlanForm.get('subscription_status');}
  

  ngOnInit(): void {
    let details = this._editSubscriptionPlanService.getData();
    this.editSubscriptionPlanForm.patchValue({
      subscription_activated_on:details.subscription_activated_on,
      subscription_expire_on:details.subscription_expire_on,
      subscription_status:details.subscription_status
    });
  }

  saveSubscriptionPlan(valid:boolean){
      if(valid){
        this.onEventCompleted.emit(this.editSubscriptionPlanForm.value);
        this.closeModal();
      }else{
        return ;
      }
  }

  closeModal(){
    this._bsModalRef.hide();
  }

}
