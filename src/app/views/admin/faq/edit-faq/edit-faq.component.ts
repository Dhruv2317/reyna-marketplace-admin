import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Toastr } from 'src/app/services/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Helper } from 'src/app/services/helper.service';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-edit-faq',
  templateUrl: './edit-faq.component.html',
  styleUrls: ['./edit-faq.component.scss']
})
export class EditFaqComponent implements OnInit {
  editor: Editor;
  editor_fr: Editor;
  editor_nl: Editor;
  editor_es: Editor;
  editor_pt: Editor;
  
  answerText:string=''; 
  answerText_fr:string='';
  answerText_nl:string='';
  answerText_es:string='';
  answerText_pt:string='';

  public FAQId: any;
  public FAQForm: UntypedFormGroup;
  public FAQDetailsObj: any;
  public FAQgroup:any=[];

  public eventInfo!: string;
  public selectedNotificationEvent!: number;
  constructor(
    private _toastr: Toastr,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private _http: HttpClient,
    public activeRoute: ActivatedRoute,
    private _helper: Helper
  ) {

    this.editor = new Editor();
    this.editor_fr = new Editor();
    this.editor_nl = new Editor();
    this.editor_es = new Editor();
    this.editor_pt = new Editor();
    
    this.FAQId = this.activeRoute.snapshot.paramMap.get('id');
    this.FAQForm = new UntypedFormGroup({
      'group_id': new UntypedFormControl([], [Validators.required]),
      'question': new UntypedFormControl(null, [Validators.required]),
      'answer': new UntypedFormControl(null, [Validators.required]),
      'question_fr': new UntypedFormControl(null,[]),
      'answer_fr': new UntypedFormControl(null,[]),
      'question_nl': new UntypedFormControl(null,[]),
      'answer_nl': new UntypedFormControl(null,[]),
      'question_es': new UntypedFormControl(null,[]),
      'answer_es': new UntypedFormControl(null,[]),
      'question_pt': new UntypedFormControl(null,[]),
      'answer_pt': new UntypedFormControl(null,[]),
      'is_active': new UntypedFormControl(true)
    });
  }


  getFAQGroups(){
    const url = 'api/admin/faqs/all-group';
    this._http.get(url).subscribe((data: any) => {
      this.FAQgroup = data;
    },(err)=>{

    });
  }
  ngOnInit(){
    this.getFAQGroups();
    this.FAQDetailsObj = {
      group_id: '',
      question: '',
      answer: '',
      question_fr: '',
      answer_fr: '',
      question_nl: '',
      answer_nl: '',
      question_es: '',
      answer_es: '',
      question_pt: '',
      answer_pt: '',
      is_active: true
    }
    this.getFAQDetails();
  }


  ngOnDestroy(): void {
    this.editor.destroy();
    this.editor_fr.destroy();
    this.editor_nl.destroy();
    this.editor_es.destroy();
    this.editor_pt.destroy();
  }

  get group_id() { return this.FAQForm.get('group_id'); }
  get question() { return this.FAQForm.get('question'); }
  get answer() { return this.FAQForm.get('answer'); }

  get question_fr() { return this.FAQForm.get('question_fr'); }
  get answer_fr() { return this.FAQForm.get('answer_fr'); }
  
  get question_nl() { return this.FAQForm.get('question_nl'); }
  get answer_nl() { return this.FAQForm.get('answer_nl'); }
  
  get question_es() { return this.FAQForm.get('question_es'); }
  get answer_es() { return this.FAQForm.get('answer_es'); }
  
  get question_pt() { return this.FAQForm.get('question_pt'); }
  get answer_pt() { return this.FAQForm.get('answer_pt'); }
  
  patchAnswer(){
    this.FAQForm.patchValue({
      answer:this.answerText,
      answer_fr:this.answerText_fr,
      answer_nl:this.answerText_nl,
      answer_es:this.answerText_es,
      answer_pt:this.answerText_pt
    });
  }

  getFAQDetails(){
    const url = 'api/admin/faqs/view/' + this.FAQId;
    this._http.get(url).subscribe((res: any) => {
        this.FAQDetailsObj = res;
        this.FAQForm.patchValue({
          group_id: this.FAQDetailsObj.group_id,
          question: this.FAQDetailsObj.question,
          answer: this.FAQDetailsObj.answer,
          question_fr: this.FAQDetailsObj.question_fr,
          answer_fr: this.FAQDetailsObj.answer_fr,
          question_nl: this.FAQDetailsObj.question_nl,
          answer_nl: this.FAQDetailsObj.answer_nl,
          question_es: this.FAQDetailsObj.question_es,
          answer_es: this.FAQDetailsObj.answer_es,
          question_pt: this.FAQDetailsObj.question_pt,
          answer_pt: this.FAQDetailsObj.answer_pt,
          is_active:  this.FAQDetailsObj.is_active
        })
        this.answerText = this.FAQDetailsObj.answer;
        this.answerText_fr = this.FAQDetailsObj.answer_fr;
        this.answerText_nl = this.FAQDetailsObj.answer_nl;
        this.answerText_es = this.FAQDetailsObj.answer_es;
        this.answerText_pt = this.FAQDetailsObj.answer_pt;
      }, (err:any) => {

      });
  }
 
  saveFAQ() {
    if (this.FAQForm.invalid) {
      this._helper.markFormGroupTouched(this.FAQForm);
      return;
    }
    const url = 'api/admin/faqs/update/' + this.FAQId;
    const req = this.FAQForm.value;
    this._http.post(url, req).subscribe((data: any) => {
      this._router.navigate(['/admin/faq/list']);
      this._toastr.showSuccess('Save Successfully!');
      this._changeDetectorRef.detectChanges();
    }, (err:any) => {
      this._toastr.showError('Unable To Update FAQ!');
      this._changeDetectorRef.detectChanges();
    });
  }
}
