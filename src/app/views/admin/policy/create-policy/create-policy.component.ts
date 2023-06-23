import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Toastr } from 'src/app/services/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Helper } from 'src/app/services/helper.service';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-create-policy',
  templateUrl: './create-policy.component.html',
  styleUrls: ['./create-policy.component.scss']
})
export class CreatePolicyComponent implements OnInit {
  editor: Editor;
  answerText:string='';
  public FAQId: any;
  public FAQForm!: UntypedFormGroup;
  public eventInfo!: string;

  constructor(
    private _toastr: Toastr,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private _http: HttpClient,
    public activeRoute: ActivatedRoute,
    private _helper: Helper){
    this.editor = new Editor();
    this.FAQId = this.activeRoute.snapshot.paramMap.get('id');

  }

  ngOnInit() {
    this.FAQForm = new UntypedFormGroup({
      'title': new UntypedFormControl(null, [Validators.required]),
      'policy_text': new UntypedFormControl(null, [Validators.required]),
      'is_active': new UntypedFormControl(true)
    });

    if(this.FAQId){
       this.getFAQDetails();
    }

  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  get title() { return this.FAQForm.get('title'); }
  get policy_text() { return this.FAQForm.get('policy_text'); }
  get is_active() { return this.FAQForm.get('is_active'); }

  patchAnswer(){
    this.FAQForm.patchValue({
      policy_text:this.answerText
    });
  }

  getFAQDetails(){
    const url = 'api/admin/policy/view/' + this.FAQId;
    this._http.get(url).subscribe((res: any) => {
        this.FAQForm.patchValue({
          title: res.title,
          policy_text: res.policy_text,
          is_active:  res.is_active
        })
        this.answerText = res.policy_text;
      }, (err:any) => {

      });
  }

  saveFAQ(){
    if (this.FAQForm.invalid){
      this._helper.markFormGroupTouched(this.FAQForm);
      return;
    }

    const url = this.FAQId ? 'api/admin/policy/update/'+this.FAQId:'api/admin/policy/create';
    const reqData = this.FAQForm.value;
    this._http.post(url, reqData).subscribe((data: any) => {
        this._router.navigate(['/admin/policy']);
        this._toastr.showSuccess('Save Successfully!');
    },
    (err:any) => {
        this._toastr.showError('Unable to save Policy !');
    });
  }

}
