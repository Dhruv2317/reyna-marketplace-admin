import { ChangeDetectorRef, EventEmitter, Component, OnInit, Output, OnDestroy } from '@angular/core';
import { BrandAddEditModalService } from './brand-add-edit-modal.service';
import { UntypedFormGroup, UntypedFormControl, Validators,UntypedFormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal'
import { environment } from 'src/environments/environment';
import { Helper } from 'src/app/services/helper.service';

import { ReplaySubject, Subject } from 'rxjs';
import {tap, filter, takeUntil, switchMap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-brand-add-edit-modal',
  templateUrl: './brand-add-edit-modal.component.html',
  styleUrls: ['./brand-add-edit-modal.component.scss']
})
export class BrandAddEditModalComponent implements OnInit, OnDestroy {
  @Output() onEventCompleted: EventEmitter<any> = new EventEmitter();
  modalEvent: any;
  brandForm: UntypedFormGroup;

  imageUrl: any = '../../../../../assets/img/no_preview.png';
  selectedImageFile: any

  selectedCoverImageFile: any
  categoriesDetails: any[] = [];


  protected manufacturers: any[] = [];
  public manufacturerCtrl: UntypedFormControl = new UntypedFormControl();
  public manufacturerFilteringCtrl: UntypedFormControl = new UntypedFormControl();
  public searching = false;
  public filteredManufacturers: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  protected _onDestroy = new Subject<void>();

  constructor(
    private _http: HttpClient,
    private _helper:Helper,
    private _bsModalRef:BsModalRef,
    private formBuilder: UntypedFormBuilder,
    private _changeDetectorRef: ChangeDetectorRef,
    private _brandAddEditModalService: BrandAddEditModalService
  ) {
    this.brandForm = this.formBuilder.group({
      'id':new UntypedFormControl(null, []),
      'name': new UntypedFormControl(null, [Validators.required]),
      'description': new UntypedFormControl(null, []),
      'image_url': new UntypedFormControl(null, []),
      'is_active': new UntypedFormControl(true, []),
      'is_featured': new UntypedFormControl(null, []),
      'categories': new UntypedFormControl([], []),
      'name_fr': new UntypedFormControl(null,[]),
      'name_nl': new UntypedFormControl(null,[]),
      'name_es': new UntypedFormControl(null,[]),
      'name_pt': new UntypedFormControl(null,[]),
      'description_fr': new UntypedFormControl(null,[]),
      'description_nl': new UntypedFormControl(null,[]),
      'description_es': new UntypedFormControl(null,[]),
      'description_pt': new UntypedFormControl(null,[]),
    });
  }

  get id() { return this.brandForm.get('id'); }
  get name() { return this.brandForm.get('name'); }
  get description() { return this.brandForm.get('description'); }
  get image_url() { return this.brandForm.get('image_url'); }
  get is_active() { return this.brandForm.get('is_active'); }
  get is_featured() { return this.brandForm.get('is_featured'); }
  get categories() { return this.brandForm.get('categories'); }

  get name_fr() { return this.brandForm.get('name_fr'); }
  get name_nl() { return this.brandForm.get('name_nl'); }
  get name_es() { return this.brandForm.get('name_es'); }
  get name_pt() { return this.brandForm.get('name_pt'); }
  get description_fr() { return this.brandForm.get('description_fr'); }
  get description_nl() { return this.brandForm.get('description_nl'); }
  get description_es() { return this.brandForm.get('description_es'); }
  get description_pt() { return this.brandForm.get('description_pt'); }

  ngOnInit(): void {
    this.getCategories();
    this.manufacturerFilteringCtrl.valueChanges
      .pipe(
        filter(search => !!search),
        tap(() => this.searching = true),
        takeUntil(this._onDestroy),
        switchMap((search:any) => {
          return this.filterManufacturesResults(search);
        }),
        takeUntil(this._onDestroy)
      )
      .subscribe((filteredBanks:any) => {
        this.searching = false;
        this.filteredManufacturers.next(filteredBanks);
      },
        error => {
          // no errors in our simulated example
          this.searching = false;
          // handle error...
        });

    let details = this._brandAddEditModalService.getData();
    this.modalEvent = details.event;
    if(details.event == 'EDIT'){
      this.brandForm.patchValue({
        id:details.data.id,
        name:details.data.name,
        description:details.data.description,
        is_active:details.data.is_active,
        is_featured:details.data.is_featured,
        manufacturer_id:details.data.manufacturer_id ? details.data.manufacturer_id.id:null,
        categories:details.data.categories ? details.data.categories.map((item:any)=>item.id):[],
        name_fr:details.data.name_fr,
        name_nl:details.data.name_nl,
        name_es:details.data.name_es,
        name_pt:details.data.name_pt,
        description_fr:details.data.description_fr,
        description_nl:details.data.description_nl,
        description_es:details.data.description_es,
        description_pt:details.data.description_pt
      });
      this.imageUrl = details.data.image ? environment.api_url + details.data.image : `../../../../../assets/img/no_preview.png`;
      if(details.data.manufacturer_id){
        this.filteredManufacturers.next([details.data.manufacturer_id]);
      }
    }


  }

  async filterManufacturesResults(token: string) {
    return this._brandAddEditModalService.getAllManufacturers(token).then((data:any)=>{
      return data;
    });
  }


  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  getCategories(){
    const url = 'api/admin/categories/all';
    this._http.get(url).subscribe((res: any) => {
        this.categoriesDetails = res;
      },(err) => {
        this.categoriesDetails =[];
      });
  }

  async saveBrand(formValid:boolean){
    if(formValid){
      const formData: FormData = new FormData();
      let formVal = this.brandForm.value;
      formVal.manufacturer_id = this.manufacturerCtrl.value;
      formData.append('brand',JSON.stringify(formVal));
      formData.append('logo', this.selectedImageFile);

      if(this.modalEvent == 'ADD') {
        let create = await  this._brandAddEditModalService.addNewBrand(formData);
      } else if (this.modalEvent == 'EDIT') {
        let update = await  this._brandAddEditModalService.editBrand(this.brandForm.value.id,formData);
      }
      this.onEventCompleted.emit(true);
      this.closeModal()
      this.brandForm.reset();
    } else {
      this._helper.markFormGroupTouched(this.brandForm);
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
