import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'

import { ViewCustomerService } from './view-customer.service';
import { Toastr } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss']
})
export class ViewCustomerComponent implements OnInit {
  modalRef!: BsModalRef;
  public customerDetails: any;
  public customerId: any;

  constructor(public http: HttpClient,
    private route: ActivatedRoute,
    private _toastr: Toastr,
    private modalService: BsModalService,
    public viewCustomerService:ViewCustomerService
  ){
    viewCustomerService.customerDetailsSubscribed$.subscribe(customer => {
        viewCustomerService.publishCustomerDetails(this.customerDetails);
    });
  }

  ngOnInit(){
    this.customerId = this.route.snapshot.params.id;
    this.getCustomerDetails();
  }

  getCustomerDetails(){
    const url = 'api/admin/users/view/' + this.customerId;
    this.http.get(url).subscribe((customer: any) => {
        this.customerDetails=customer;
        this.viewCustomerService.publishCustomerDetails(customer);
      }, (err:any) => {});
  }

  
  uploadDocuments(uploadedFiles: any) {
    const fd: FormData = new FormData();
    let formData = {
      documents: uploadedFiles.file_inputs
    }
    fd.append('docs', JSON.stringify(formData));
    for(let file of uploadedFiles.selectedFiles){
      fd.append('documents', file, file.name);
    }

    const url = 'api/documents/upload/' + this.customerId;
    this.http.post(url, fd)
      .subscribe((resp: any) => {
        this._toastr.showSuccess(`Total ${uploadedFiles.selectedFiles.length} Documents Uploaded Successfully!`)
        this.getCustomerDetails();
      }, (err:any) => {
        this._toastr.showError(`Documents Upload Failed!`)
      });
  }
}
