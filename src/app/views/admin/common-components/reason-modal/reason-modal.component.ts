import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ReasonModalService } from './reason-modal.service';

@Component({
  selector: 'app-reason-modal',
  templateUrl: './reason-modal.component.html',
  styleUrls: ['./reason-modal.component.scss']
})
export class ReasonModalComponent implements OnInit {
  @Output() onEventCompleted: EventEmitter<any> = new EventEmitter();
  reasonForm:UntypedFormGroup

  constructor(
    private _bsModalRef: BsModalRef,
    private _reasonModalService: ReasonModalService
  ) {
    this.reasonForm = new UntypedFormGroup({
      'reason':new UntypedFormControl(null, [Validators.required]),
    });
  }

  get reason(){return this.reasonForm.get('reason');}

  ngOnInit(): void {
  
  }

  reasonFormSubmit(form: any) {
    if(form.valid) {
      this.onEventCompleted.emit(form.value.reason);
      this.closeModal();
    }
  }

  closeModal() {
    this._bsModalRef.hide();
  }
}
