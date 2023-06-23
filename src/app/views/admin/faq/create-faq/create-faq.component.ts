import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Toastr } from 'src/app/services/toastr.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Helper } from '../../../../services/helper.service';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-create-faq',
  templateUrl: './create-faq.component.html',
  styleUrls: ['./create-faq.component.scss']
})
export class CreateFaqComponent implements OnInit,OnDestroy {
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
  
  public FAQForm!: UntypedFormGroup;
  public FAQgroup:any=[];
  public eventInfo!: string;

  constructor(
    private _toastr: Toastr,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private _http: HttpClient,
    private _helper: Helper){
    this.editor = new Editor();
    this.editor_fr = new Editor();
    this.editor_nl = new Editor();
    this.editor_es = new Editor();
    this.editor_pt = new Editor();
    
  }

  getFAQGroups(){
    const url = 'api/admin/faqs/all-group';
    this._http.get(url).subscribe((data: any) => {
      this.FAQgroup = data;
    },(err)=>{

    });
  }

  ngOnInit() {
    this.getFAQGroups();
    this.FAQForm = new UntypedFormGroup({
      'group_id': new UntypedFormControl([],[Validators.required]),
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
  
  get is_active() { return this.FAQForm.get('is_active'); }

  patchAnswer(){
    this.FAQForm.patchValue({
      answer:this.answerText,
      answer_fr:this.answerText_fr,
      answer_nl:this.answerText_nl,
      answer_es:this.answerText_es,
      answer_pt:this.answerText_pt
    });
  }

  saveFAQ() {
    if (this.FAQForm.invalid) {
      this._helper.markFormGroupTouched(this.FAQForm);
      return;
    }
    const url = 'api/admin/faqs/create';
    const reqData = this.FAQForm.value;
    this._http.post(url, reqData).subscribe((data: any) => {
        this._router.navigate(['/admin/faq']);
        this._toastr.showSuccess('Save Successfully!');
      },
      (err:any) => {
        this._toastr.showError('Unable to save FAQ!');
      });
  }
}
