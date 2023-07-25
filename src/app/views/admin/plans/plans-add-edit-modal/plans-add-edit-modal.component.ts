import { EventEmitter, Component, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder, FormArray } from '@angular/forms';
import { Helper } from 'src/app/services/helper.service';
import { BsModalRef } from 'ngx-bootstrap/modal'
import { PlansAddEditModalService } from './plans-add-edit-modal.service';

@Component({
  selector: 'app-plans-add-edit-modal',
  templateUrl: './plans-add-edit-modal.component.html',
  styleUrls: ['./plans-add-edit-modal.component.scss']
})
export class PlansAddEditModalComponent implements OnInit {
  @Output() onEventCompleted: EventEmitter<any> = new EventEmitter();
  modalEvent: any;
  subscriptionPlanForm: UntypedFormGroup;
  countriesList: any[] = [];

  imageUrl: any = '../../../../../assets/img/no_preview.png';
  selectedImageFile: any

  constructor(
    private _helper: Helper,
    private _bsModalRef: BsModalRef,
    private formBuilder: UntypedFormBuilder,
    private _changeDetectorRef: ChangeDetectorRef,
    private _tcAddEditModalService: PlansAddEditModalService
  ) {
    this.subscriptionPlanForm = this.formBuilder.group({
      'id': new UntypedFormControl(0, []),
      'name': new UntypedFormControl(null, [Validators.required]),
      'plan_for': new UntypedFormControl(null, [Validators.required]),
      'description': new UntypedFormControl(null, [Validators.required]),
      'duration': new UntypedFormControl(null, [Validators.required]),
      'duration_unit': new UntypedFormControl(null, [Validators.required]),
      'charge': new UntypedFormControl(null, [Validators.required]),
      'currency': new UntypedFormControl(null, [Validators.required]),
      'is_active': new UntypedFormControl(null, []),
      'name_fr': new UntypedFormControl(null, []),
      // 'name_nl': new UntypedFormControl(null, []),
      // 'name_es': new UntypedFormControl(null, []),
      // 'name_pt': new UntypedFormControl(null, []),
      'description_fr': new UntypedFormControl(null, []),
      // 'description_nl': new UntypedFormControl(null, []),
      // 'description_es': new UntypedFormControl(null, []),
      // 'description_pt': new UntypedFormControl(null, []),
    });
  }

  get id() { return this.subscriptionPlanForm.get('id'); }
  get name() { return this.subscriptionPlanForm.get('name'); }
  get plan_for() { return this.subscriptionPlanForm.get('plan_for'); }
  get description() { return this.subscriptionPlanForm.get('description'); }
  get duration() { return this.subscriptionPlanForm.get('duration'); }
  get duration_unit() { return this.subscriptionPlanForm.get('duration_unit'); }
  get charge() { return this.subscriptionPlanForm.get('charge'); }
  get currency() { return this.subscriptionPlanForm.get('currency'); }
  get is_active() { return this.subscriptionPlanForm.get('is_active'); }
  // get name_fr() { return this.subscriptionPlanForm.get('name_fr'); }
  // get description_fr() { return this.subscriptionPlanForm.get('description_fr'); }

  ngOnInit(): void {
    let details = this._tcAddEditModalService.getData();
    this.modalEvent = details.event;
    this.countriesList = details.countriesList;
    if (details.event == 'EDIT') {
      this.subscriptionPlanForm.patchValue({
        id: details.data.id,
        name: details.data.name,
        plan_for: details.data.planFor,
        description: details.data.description,
        duration: details.data.duration,
        duration_unit: details.data.durationUnit,
        charge: details.data.price,
        currency: details.data.currency,
        is_active: details.data.isActive,
        // name_fr: details.data.name_fr,
        // description_fr: details.data.description_fr,
      });
    }
  }

  async saveTreatmentCondition(formValid: boolean) {
    console.log("Formvalid",formValid);
    console.log("this.subscriptionPlanForm.value",this.subscriptionPlanForm.value);
    
    
    debugger
    if (formValid) {
      let categoryVal = this.subscriptionPlanForm.value;
      var planModel: any = {};
      planModel.id = categoryVal.id;
      planModel.name = categoryVal.name;
      planModel.planFor = categoryVal.plan_for;
      planModel.description = categoryVal.description;
      planModel.duration = categoryVal.duration.toString();
      planModel.durationUnit = categoryVal.duration_unit;
      planModel.price = categoryVal.charge;
      planModel.currency = categoryVal.currency;
      planModel.isActive = categoryVal.is_active;
      planModel.status = 'Under Progress';
      if (this.modalEvent == 'ADD') {
        planModel.id = 0;
        let create = await this._tcAddEditModalService.addNewPlan(planModel);
      } else if (this.modalEvent == 'EDIT') {
        let update = await this._tcAddEditModalService.addNewPlan(planModel);

        // let update = await  this._tcAddEditModalService.editPlan(categoryVal.id,categoryVal);
      }
      this.onEventCompleted.emit(true);
      this.closeModal();
      this.subscriptionPlanForm.reset();
    } else {
      this._helper.markFormGroupTouched(this.subscriptionPlanForm);
    }
  }

  onFileChange(event: any, type: string) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (type == 'IMAGE') {
          this.imageUrl = reader.result;
          this.selectedImageFile = file;
        }
        this._changeDetectorRef.markForCheck();
      }
    }
  }

  closeModal() {
    this._bsModalRef.hide();
  }
}
