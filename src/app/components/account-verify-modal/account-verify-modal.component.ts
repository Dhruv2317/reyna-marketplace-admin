import { EventEmitter, Component, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { Helper } from 'src/app/services/helper.service';
import { BsModalRef } from 'ngx-bootstrap/modal'
import { AccountVerifyModalService } from './account-verify-modal.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'account-verify-modal',
  templateUrl: './account-verify-modal.component.html',
  styleUrls: ['./account-verify-modal.component.scss']
})
export class AccountVerifyModalComponent implements OnInit {
  @Output() onFormSubmitted: EventEmitter<any> = new EventEmitter();
  modalEvent: any;
  accountVerifyForm: UntypedFormGroup;

  constructor(
    private _http: HttpClient,
    private _helper:Helper,
    private _bsModalRef:BsModalRef,
    private formBuilder: UntypedFormBuilder,
    private _changeDetectorRef:ChangeDetectorRef,
    private _tcAddEditModalService: AccountVerifyModalService){

    this.accountVerifyForm = this.formBuilder.group({
      'status':new UntypedFormControl(null, [Validators.required]),
      'comment': new UntypedFormControl(null, [])
    });
  }

  get status() { return this.accountVerifyForm.get('status'); }
  get comment() { return this.accountVerifyForm.get('comment'); }

  ngOnInit(): void {
    let details = this._tcAddEditModalService.getData();
    this.modalEvent = details.event;
  }


  async saveForm(formValid:boolean){
    if(formValid){
      this.onFormSubmitted.emit(this.accountVerifyForm.value);
      this.closeModal();
      this.accountVerifyForm.reset();
    } else {
      this._helper.markFormGroupTouched(this.accountVerifyForm);
    }
  }

  closeModal(){
    this._bsModalRef.hide();
  }
}
