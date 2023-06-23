import { EventEmitter, Component, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder, FormArray } from '@angular/forms';
import { Helper } from 'src/app/services/helper.service';
import { BsModalRef } from 'ngx-bootstrap/modal'
import { ArticleCategoriesAddEditModalService } from './article-categories-add-edit-modal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-article-categories-add-edit-modal',
  templateUrl: './article-categories-add-edit-modal.component.html',
  styleUrls: ['./article-categories-add-edit-modal.component.scss']
})
export class ArticleCategoriesAddEditModalComponent implements OnInit {
  @Output() onEventCompleted: EventEmitter<any> = new EventEmitter();
  modalEvent: any;
  treatmentConditionForm: UntypedFormGroup;

  imageUrl: any = '../../../../../assets/img/no_preview.png';
  selectedImageFile: any

  constructor(
    private _helper:Helper,
    private _bsModalRef:BsModalRef,
    private formBuilder: UntypedFormBuilder,
    private _changeDetectorRef:ChangeDetectorRef,
    private _tcAddEditModalService: ArticleCategoriesAddEditModalService
  ) {
    this.treatmentConditionForm = this.formBuilder.group({
      'id':new UntypedFormControl(null, []),
      'name': new UntypedFormControl(null, [Validators.required]),
      'is_active': new UntypedFormControl(null, []),
      'description': new UntypedFormControl(null, []),
      'image_url': new UntypedFormControl(null, []),
    });
  }

  get id() { return this.treatmentConditionForm.get('id'); }
  get name() { return this.treatmentConditionForm.get('name'); }
  get is_active() { return this.treatmentConditionForm.get('is_active'); }
  get description() { return this.treatmentConditionForm.get('description'); }
  get image_url() { return this.treatmentConditionForm.get('image_url'); }

  ngOnInit(): void {
    let details = this._tcAddEditModalService.getData();
    this.modalEvent = details.event;
    if(details.event == 'EDIT'){
      this.treatmentConditionForm.patchValue({
        id:details.data.id,
        name:details.data.name,
        is_active:details.data.is_active,
        description:details.data.description
      });
      this.imageUrl = details.data.image ? environment.api_url + details.data.image : `../../../../../assets/img/no_preview.png`
    }
  }

  async saveTreatmentCondition(formValid:boolean){
    if(formValid){
      var formData: FormData = new FormData();
      let categoryVal = this.treatmentConditionForm.value;
      categoryVal.image = this.imageUrl;
      formData.append('category', JSON.stringify(categoryVal));
      formData.append('image_url', this.selectedImageFile);

      if(this.modalEvent == 'ADD') {
        let create = await  this._tcAddEditModalService.addNewCategories(formData);
      } else if (this.modalEvent == 'EDIT') {
        let update = await  this._tcAddEditModalService.editCategories(categoryVal.id,formData);
      }

      this.onEventCompleted.emit(true);
      this.closeModal();
      this.treatmentConditionForm.reset();
    } else {
      this._helper.markFormGroupTouched(this.treatmentConditionForm);
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
