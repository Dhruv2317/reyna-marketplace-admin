import { ChangeDetectorRef, EventEmitter, Component, OnInit, Output, OnDestroy } from '@angular/core';
import { SponsorAddEditModalService } from './sponsor-add-edit-modal.service';
import { UntypedFormGroup, UntypedFormControl, Validators,UntypedFormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal'
import { environment } from 'src/environments/environment';
import { Helper } from 'src/app/services/helper.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sponsor-add-edit-modal',
  templateUrl: './sponsor-add-edit-modal.component.html',
  styleUrls: ['./sponsor-add-edit-modal.component.scss']
})
export class SponsorAddEditModalComponent implements OnInit, OnDestroy {
  @Output() onEventCompleted: EventEmitter<any> = new EventEmitter();
  modalEvent: any;
  sponsorForm: UntypedFormGroup;

  imageUrl: any = '../../../../../assets/img/no_preview.png';
  selectedImageFile: any

  constructor(
    private _http: HttpClient,
    private _helper:Helper,
    private _bsModalRef:BsModalRef,
    private formBuilder: UntypedFormBuilder,
    private _changeDetectorRef: ChangeDetectorRef,
    private _sponsorAddEditModalService: SponsorAddEditModalService
  ) {
    this.sponsorForm = this.formBuilder.group({
      'id':new UntypedFormControl(null, []),
      'name': new UntypedFormControl(null, [Validators.required]),
      'description': new UntypedFormControl(null, []),
      'image_url': new UntypedFormControl(null, []),
      'is_active': new UntypedFormControl(true, []),
    });
  }

  get id() { return this.sponsorForm.get('id'); }
  get name() { return this.sponsorForm.get('name'); }
  get description() { return this.sponsorForm.get('description'); }
  get image_url() { return this.sponsorForm.get('image_url'); }
  get is_active() { return this.sponsorForm.get('is_active'); }

  ngOnInit(): void {
    let details = this._sponsorAddEditModalService.getData();
    this.modalEvent = details.event;
    if(details.event == 'EDIT'){
      this.sponsorForm.patchValue({
        id:details.data.id,
        name:details.data.name,
        description:details.data.description,
        is_active:details.data.is_active,
        image_url:details.data.image
      });
      this.imageUrl = details.data.image ? environment.api_url + details.data.image : `../../../../../assets/img/no_preview.png`;
    }
  }

  ngOnDestroy() {
  }


  async saveSponsor(formValid:boolean){
    if(formValid){
      const formData: FormData = new FormData();
      let formVal = this.sponsorForm.value;
      if(formVal)
      formData.append('sponsor',JSON.stringify(formVal));
      if(this.selectedImageFile){
        formData.append('logo', this.selectedImageFile);
      }

      if(this.modalEvent == 'ADD'){
        let create = await  this._sponsorAddEditModalService.addNewSponsor(formData);
      } else if (this.modalEvent == 'EDIT'){
        let update = await  this._sponsorAddEditModalService.editSponsor(this.sponsorForm.value.id,formData);
      }
      this.onEventCompleted.emit(true);
      this.closeModal()
      this.sponsorForm.reset();
    } else {
      this._helper.markFormGroupTouched(this.sponsorForm);
    }
  }

  onFileChange(event:any, type: string) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
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

  closeModal(){
    this._bsModalRef.hide();
  }

}