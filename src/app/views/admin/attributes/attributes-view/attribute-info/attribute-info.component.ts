import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Toastr } from 'src/app/services/toastr.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AttributesAddEditModalService } from '../../attributes-add-edit-modal/attributes-add-edit-modal.service';
import { AttributesAddEditModalComponent } from '../../attributes-add-edit-modal/attributes-add-edit-modal.component';

@Component({
  selector: 'app-attribute-info',
  templateUrl: './attribute-info.component.html',
  styleUrls: ['./attribute-info.component.scss']
})
export class AttributeInfoComponent implements OnInit {

  attributeId: any;
  AttributeDetails:any;
  modalRef!: BsModalRef;
  constructor(
    public http: HttpClient,
    private route: ActivatedRoute,
    public _toastr: Toastr,
    private modalService: BsModalService,
    private _hcAddEditModalService: AttributesAddEditModalService,
    private _changeDetectorRef: ChangeDetectorRef){
      let activeRoute:any = this.route;
      if(activeRoute){
         this.attributeId = activeRoute.parent.parent.snapshot.paramMap.get('id');
      }
  }

  ngOnInit(){
    this.getAttributeDetails();
  }

  getAttributeDetails(){
    const url = 'api/admin/attributes/view/' + this.attributeId;
    this.http.get(url).subscribe((res: any) => {
      this.AttributeDetails = res;
      this._changeDetectorRef.detectChanges();
    }, (err:any) => {

    });
  }

  openEditModal(){
    this._hcAddEditModalService.setData({event:'EDIT',data:this.AttributeDetails});
    this.modalRef = this.modalService.show(AttributesAddEditModalComponent,{class:'modal-lg'});
    this.modalRef.content.onEventCompleted.subscribe(()=>{
      this.getAttributeDetails();
    });
  }
}
