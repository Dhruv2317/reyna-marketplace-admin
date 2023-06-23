import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Helper } from 'src/app/services/helper.service';
import { Toastr } from 'src/app/services/toastr.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { CustomImageCropperComponent } from 'src/app/components/custom-image-cropper/custom-image-cropper.component';
import { CustomImageCropperService } from 'src/app/components/custom-image-cropper/custom-image-cropper.service';
 
import { ChangePasswordModalComponent } from 'src/app/components/change-password-modal/change-password-modal.component';
import { ChangePasswordModalService } from 'src/app/components/change-password-modal/change-password-modal.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit,OnDestroy {
  @BlockUI('customer') blockCustomerUI!: NgBlockUI;
   modalRef!: BsModalRef;
  public customerDetails: any;
  public customerId: any;
  addresses: any[] = [];

  fullFaceImage: any;
  submitted: boolean = false;
  fullFaceEditMode = false;

  licenseImage!: File;
  licenseEntered!: boolean;

  deviceList: any[] = [];
  states: any[] = [];

  imageUrl: any = '../../../../../assets/img/no-image.png';
  _albums = [{
    src: this.imageUrl,
    caption: 'Full Face Image',
    thumb: this.imageUrl
  }];

  constructor(
    public http: HttpClient,
    private route: ActivatedRoute,
    private _router: Router,
    public helper: Helper,
    private _toastr: Toastr,
    private _changeDetectorRef: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private modalService: BsModalService,
    private _customImageCropperService: CustomImageCropperService,
     private _changePasswordModalService: ChangePasswordModalService){

    }

  ngOnInit(){
    let activeRoute:any = this.route;
    if(activeRoute){
      activeRoute.parent.parent.params.subscribe((params:any) => {
        this.customerId = params['id'];
        this.getCustomerDetails();
        //this._getState();
      });
    }
  }

  ngOnDestroy(): void {
      if(this.blockCustomerUI){this.blockCustomerUI.unsubscribe();}
  }

  getCustomerDetails(){
    this.blockCustomerUI.start();
    const url = 'api/admin/users/view/' + this.customerId;
    this.http.get(url).subscribe(async (customer: any) => {
      this.blockCustomerUI.stop();
      this.customerDetails = customer;
      this.addresses = this.customerDetails.addresses;
    }, (err:any) => {
      this.blockCustomerUI.stop();
    });
  }

   _getState(){
    const url = 'api/system_states/all';
    this.http.get(url).subscribe((data: any) => {
        this.states = data;
    },
    (err) => {
    });
  }

  loginAsUser() {
    let url = 'api/users/temp-user/' + this.customerDetails.id;
    this.http.get(url).subscribe((res: any) => {
      window.open(environment.client_app_url + 'bypass-login?' + res.urlQuery);
    }, (err: any) => {
    });
  }

  manageAccount(stauts: any){
    const url = 'api/general/manage-account-login';
    this.http.post(url, {user_id: this.customerId, is_active: stauts}).subscribe((result: any) => {
        this._toastr.showSuccess(result.message);
        // reload user details only
         this.getCustomerDetails();
      }, (err:any) => {
        this._toastr.showError('Error Updating Account Status');
      });
  }


  deleteAddress(address_id: number){
    const url = 'api/customers/delete_address/' +  this.customerId;
    this.http.post(url, { address_id: address_id }).subscribe((data: any) => {
      this.getMyAddresses();
    },
    (err) => {

    });
  }

  getMyAddresses(){
    const url = `api/customers/address/${this.customerId}`;
    this.http.get(url).subscribe((data: any) => {
      this.addresses = data;
      this._changeDetectorRef.detectChanges();
    },(err) => {

    });
  }

  async openImageCropperModal(eventName: string) {
    let path_to_load = eventName == 'PROFILE' ? (this.customerDetails.profile_picture ? this.customerDetails.profile_picture : null) : (this.customerDetails.license_image ? this.customerDetails.license_image : null);
    let field_name = eventName == 'PROFILE' ? 'profile_photo' : 'license_photo';
    let file_name: string = path_to_load ? path_to_load.split("/").pop() : null;
    this.loadImage(path_to_load).then((result) => {
      const fr = new FileReader();
      fr.readAsDataURL(result);
      fr.onloadend = () => {
        let loadedImage: any = this.sanitizer.bypassSecurityTrustUrl(fr.result + '');
        loadedImage = loadedImage.changingThisBreaksApplicationSecurity;
        this._customImageCropperService.setFormData({ event_name: eventName, base64image: loadedImage, file_name: file_name });
        this.modalRef = this.modalService.show(CustomImageCropperComponent, { class: 'modal-lg' });
        this.modalRef.content.onImageSaved.subscribe((file: any) => {
          this.uploadFullFaceImage(file)
        });
      }
    }).catch((err: any) => {

    });
  }

  async loadImage(path: string) {
    return await this.http.post('api/documents/preview', { path: path }, { responseType: 'blob' }).toPromise();
  }

  uploadFullFaceImage(file: any){
    this.submitted = true;
    const formData: FormData = new FormData();
    this.fullFaceImage = file;
    const url = `api/customers/update_profile_photo/${this.customerId}`;
    formData.append('profile',this.fullFaceImage,this.fullFaceImage.name);
    this.http.post(url, formData).subscribe((data: any) => {
      this.submitted = true;
      this.fullFaceEditMode = false;
      this.getCustomerDetails();
    },
    (error:any) => {
      this._toastr.showError('Face Photo upload failed');
      this.submitted = false;
    });
  }
 
  openChangePasswordModal(){
    this._changePasswordModalService.setFormData({user_id: this.customerId});
    this.modalRef = this.modalService.show(ChangePasswordModalComponent, { class: 'modal-lg' });
    this.modalRef.content.onEventCompleted.subscribe((resp: any) => {
      /* CALL METHOD TO MAKE API CALL TO SAVE PASSWORD */
    });
  }

}
