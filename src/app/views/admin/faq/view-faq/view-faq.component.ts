import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Toastr } from 'src/app/services/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Helper } from 'src/app/services/helper.service';

@Component({
  selector: 'app-view-faq',
  templateUrl: './view-faq.component.html',
  styleUrls: ['./view-faq.component.scss']
})
export class ViewFaqComponent implements OnInit {
  public FAQId: any;
  public FAQDetails: any;
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public _helper: Helper,
    private _http: HttpClient,
    public activeRoute: ActivatedRoute
  ) {
    this.FAQId = this.activeRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getFAQDetails();
  }

  getFAQDetails() {
    const url = 'api/admin/faqs/view/' + this.FAQId;
    this._http.get(url).subscribe((res: any) => {
        this.FAQDetails = res;
        this._changeDetectorRef.detectChanges();
      }, (err:any) => {

      });
  }
}
