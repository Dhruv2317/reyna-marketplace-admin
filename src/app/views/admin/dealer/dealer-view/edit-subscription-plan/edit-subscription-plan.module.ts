import { NgModule } from '@angular/core';
import { EditSubscriptionPlanComponent } from './edit-subscription-plan.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditSubscriptionPlanService } from './edit-subscription-plan.service';



@NgModule({
  declarations: [
    EditSubscriptionPlanComponent
  ],
  imports: [
    SharedModule
  ],
  providers:[EditSubscriptionPlanService],
  exports:[EditSubscriptionPlanComponent]
})
export class EditSubscriptionPlanModule { }
