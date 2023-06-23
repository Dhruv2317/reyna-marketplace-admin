import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Editor, toDoc,toHTML } from 'ngx-editor';
import { Helper } from 'src/app/services/helper.service';
import { Toastr } from 'src/app/services/toastr.service';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { NewsletterTemplatePreviewService } from '../newsletter-template-preview/newsletter-template-preview.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NewsletterTemplatePreviewComponent } from '../newsletter-template-preview/newsletter-template-preview.component';

@Component({
  selector: 'app-newsletter-templates-editor',
  templateUrl: './newsletter-templates-editor.component.html',
  styleUrls: ['./newsletter-templates-editor.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class NewsletterTemplatesEditorComponent implements OnInit {
  //editor: Editor;
  contentText:any;
  public emailTemplateForm!: UntypedFormGroup;
  templateId:any=null;
  templateDetails:any;

  htmlContent:any;
  modalRef!: BsModalRef;

  constructor(
    private _toastr: Toastr,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private activeRoute:ActivatedRoute,
    private _http: HttpClient,
    private _service:NewsletterTemplatePreviewService,
    private modalService: BsModalService,
    private sanitizer: DomSanitizer,
    private _helper: Helper){


    //this.editor = new Editor();
    this.templateId = this.activeRoute.snapshot.paramMap.get('id');
    if(this.templateId){
        this.getDetails();
    }
  }

  ngOnInit(){
    this.emailTemplateForm = new UntypedFormGroup({
      'template_name': new UntypedFormControl([],[Validators.required]),
      'email_subject': new UntypedFormControl(null, [Validators.required]),
      'email_content': new UntypedFormControl(null, [Validators.required]),
      'status': new UntypedFormControl(null, [Validators.required])
    });
  }

  ngOnDestroy(): void {
    //this.editor.destroy();
  }

  getDetails(){
    let url = 'api/admin/newsletter_templates/view/'+this.templateId;
    this._http.get(url).subscribe((data: any) => {
        this.templateDetails = data;
        this.emailTemplateForm.patchValue({
          template_name: data.template_name,
          email_subject: data.email_subject,
          email_content: data.email_content,
          status: data.status
        })
        let fullHTML = this.templateDetails.email_content;
        this.htmlContent = data.email_content;
        //let body:any = this.extract_body(fullHTML);
        //this.contentText = toDoc(body);

    },
    (err:any) => {

    });
  }

  extract_body = (html_string:string) => {
    // asuming html_content contains just one body element
    let parser = new DOMParser();
    let dom_document = parser.parseFromString(html_string, "text/html");
    let body_element = dom_document.getElementsByTagName("body")[0];
    return body_element.innerHTML;
  }

  get template_name() { return this.emailTemplateForm.get('template_name'); }
  get email_subject() { return this.emailTemplateForm.get('email_subject'); }
  get email_content() { return this.emailTemplateForm.get('email_content'); }
  get status() { return this.emailTemplateForm.get('status'); }

  patchAnswer(){
    this.emailTemplateForm.patchValue({
      email_content:this.contentText
    });
  }

  saveTemplate(){
    let reqData:any ={};
    if(this.emailTemplateForm.invalid){
      this._helper.markFormGroupTouched(this.emailTemplateForm);
      return;
    }
    let url='';
    if(this.templateId){
      url = 'api/admin/newsletter_templates/update/'+this.templateId;
      reqData = this.emailTemplateForm.value;
      //reqData.email_content = toHTML(reqData.email_content);
    }else{
      url = 'api/admin/newsletter_templates/create';
      reqData = this.emailTemplateForm.value;
    }
    this._http.post(url, reqData).subscribe((data: any) => {
      if(this.templateId){
          this.previewTemplate();
      }else{
        this._router.navigate(['/admin/newsletter-templates/editor/',data.insertId],{queryParams:{action:'preview'}});
      } 
      this._toastr.showSuccess('Save Successfully!');
    },
    (err:any) => {
      this._toastr.showError('Unable to save Template!');
    });
  }

  handleChange(event:any){
    this.htmlContent = event.target.value;
  }

  previewTemplate(){
    this._service.setData(this.templateDetails);
    this.modalRef = this.modalService.show(NewsletterTemplatePreviewComponent,{class:'modal-full-lg'});
    /* this.modalRef.content.onEventCompleted.subscribe(()=>{
        
    }); */
  }
}
