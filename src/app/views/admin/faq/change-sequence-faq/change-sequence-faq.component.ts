import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-sequence-faq',
  templateUrl: './change-sequence-faq.component.html',
  styleUrls: ['./change-sequence-faq.component.scss']
})
export class ChangeSequenceFaqComponent implements OnInit {
  public categories: any[] = [
    {name: 'Home', value: 'HOME'},
    {name: 'Order', value: 'ORDER'},
  ];
  public originalQuestions: any = [];
  public questions: any = [];
  public selectedCategory!: number;
  public isPriorityUpdated = false;
  public priorityArray: {
    question_id: number;
    priority: number;
    category: number;
  }[] = [];
  constructor(
    public http: HttpClient,
    public _toastr: ToastrService,
    public cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {}

  public getQuestionsList() {
    if (!this.selectedCategory) {
      return;
    }
    const url = 'api/admin/faqs/get-all-question/' + this.selectedCategory;
    this.http.get(url)
      .subscribe((data: any) => {
        this.questions = data;
        this.originalQuestions =  this.questions;
        this.cdr.detectChanges();
      }, (err:any) => {

      });
  }

  public resetSequence() {
    this.questions =  this.originalQuestions.slice(0);
    this.isPriorityUpdated = false;
  }

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
    this.isPriorityUpdated = true;
  }

  public saveUpdatedSequence() {
    this.priorityArray = [];
    this.questions.forEach((que: any, index: any) => {
      this.priorityArray.push({ question_id: que.id, priority: (index + 1), category: this.selectedCategory });
    });

    const url = 'api/admin/faqs/update_priority';
    this.http.post(url, { questions: this.priorityArray })
      .subscribe(data => {

        this._toastr.success('Sequence Updated Successfully');
        this.priorityArray = [];
        this.questions = [];
        this.isPriorityUpdated = false;
      }, (err:any) => {

        this._toastr.error('Unable to update sequence. Please try again');
      });
  }

}
