import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { NewsletterTemplatePreviewService } from './newsletter-template-preview.service';
import { HttpClient } from '@angular/common/http';
import { Toastr } from 'src/app/services/toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newsletter-template-preview',
  templateUrl: './newsletter-template-preview.component.html',
  styleUrls: ['./newsletter-template-preview.component.scss']
})
export class NewsletterTemplatePreviewComponent implements OnInit {

  api_url:string =environment.api_url;
  initdetails:any;
  details:any;
  constructor(
    private _toastr: Toastr,
    private _router: Router,
    private _service:NewsletterTemplatePreviewService,
    private _bsModalRef:BsModalRef,
    private _http:HttpClient){

  }

  ngOnInit(): void {
     this.initdetails = this._service.getData();
     this.getDetails();
  }

  closeModal(){
    this._bsModalRef.hide();
  }

  getDetails(){
    let url = 'api/admin/newsletter_templates/view/'+this.initdetails.id;
    this._http.get(url).subscribe((data: any) => {
       this.details = data;
    });
  }

  send(){
     let url = 'api/admin/newsletter_templates/send/'+this.details.id;
    this._http.post(url,{}).subscribe((data: any) => {
      this._router.navigate(['/admin/newsletter-templates/list']);
      this._toastr.showSuccess('Email Send Successfully!');
      this.closeModal();
    },
    (err:any) => {
      this._toastr.showError('Unable to save Template!');
    });
  }

}
