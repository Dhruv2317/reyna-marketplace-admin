import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Toastr } from 'src/app/services/toastr.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CategoriesAddEditModalService } from '../../categories-add-edit-modal/categories-add-edit-modal.service';
import { CategoriesAddEditModalComponent } from '../../categories-add-edit-modal/categories-add-edit-modal.component';

@Component({
  selector: 'app-category-info',
  templateUrl: './category-info.component.html',
  styleUrls: ['./category-info.component.scss']
})
export class CategoryInfoComponent implements OnInit {

  categoryId: any;
  CategoryDetails:any;
  modalRef!: BsModalRef;
  constructor(
    public http: HttpClient,
    private route: ActivatedRoute,
    public _toastr: Toastr,
    private modalService: BsModalService,
    private _hcAddEditModalService: CategoriesAddEditModalService,
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
    const url = 'api/admin/categories/view/' + this.categoryId;
    this.http.get(url).subscribe((res: any) => {
         this.CategoryDetails = res;
        this._changeDetectorRef.detectChanges();
      }, (err:any) => {

      });
  }

  openEditModal(){
    this._hcAddEditModalService.setData({event:'EDIT',data:this.CategoryDetails});
    this.modalRef = this.modalService.show(CategoriesAddEditModalComponent,{class:'modal-lg'});
    this.modalRef.content.onEventCompleted.subscribe(()=>{
      this.getCategoryDetails();
    });
  }

}
