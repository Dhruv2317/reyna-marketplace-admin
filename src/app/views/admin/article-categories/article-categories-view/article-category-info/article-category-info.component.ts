import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Toastr } from 'src/app/services/toastr.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ArticleCategoriesAddEditModalService } from '../../article-categories-add-edit-modal/article-categories-add-edit-modal.service';
import { ArticleCategoriesAddEditModalComponent } from '../../article-categories-add-edit-modal/article-categories-add-edit-modal.component';

@Component({
  selector: 'app-article-category-info',
  templateUrl: './article-category-info.component.html',
  styleUrls: ['./article-category-info.component.scss']
})
export class ArticleCategoryInfoComponent implements OnInit {

  categoryId: any;
  CategoryDetails:any;
  modalRef!: BsModalRef;
  constructor(
    public http: HttpClient,
    private route: ActivatedRoute,
    public _toastr: Toastr,
    private modalService: BsModalService,
    private _hcAddEditModalService: ArticleCategoriesAddEditModalService,
    private _changeDetectorRef: ChangeDetectorRef){
      let activeRoute:any = this.route;
      if(activeRoute){
         this.categoryId = activeRoute.parent.parent.snapshot.paramMap.get('id');
      }
  }

  ngOnInit(){
    this.getCategoryDetails();
  }

  getCategoryDetails(){
    const url = 'api/admin/article_categories/view/' + this.categoryId;
    this.http.get(url).subscribe((res: any) => {
         this.CategoryDetails = res;
        this._changeDetectorRef.detectChanges();
      }, (err:any) => {

      });
  }

  openEditModal(){
    this._hcAddEditModalService.setData({event:'EDIT',data:this.CategoryDetails});
    this.modalRef = this.modalService.show(ArticleCategoriesAddEditModalComponent,{class:'modal-lg'});
    this.modalRef.content.onEventCompleted.subscribe(()=>{
      this.getCategoryDetails();
    });
  }

  updateSequence (event: any) {
    let dataToSend: any = []
     event.data.forEach((obj: any) => {
        dataToSend.push({ ...obj.item, sequence:obj.sequence });
    });
    let url: string = `api/admin/article_categories/update_sequence/${this.categoryId}`;
    this.http.post(url, { mode: event.mode, sequences: dataToSend })
      .subscribe(data => {
        this.getCategoryDetails();
        this._toastr.showSuccess('Sequence Updated Successfully');
      }, (err:any) => {
        this._toastr.showError('Unable to update sequence. Please try again');
      });
  }

}
