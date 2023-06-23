import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Toastr } from 'src/app/services/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Helper } from 'src/app/services/helper.service';

@Component({
  selector: 'app-view-policy',
  templateUrl: './view-policy.component.html',
  styleUrls: ['./view-policy.component.scss']
})
export class ViewPolicyComponent implements OnInit {
  public PolicyId: any;
  public PolicyDetails: any;
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public _helper: Helper,
    private _http: HttpClient,
    public activeRoute: ActivatedRoute
  ) {
    this.PolicyId = this.activeRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getPolicyDetails();
  }

  getPolicyDetails(){
    const url = 'api/admin/policy/view/' + this.PolicyId;
    this._http.get(url).subscribe((res: any) => {
        this.PolicyDetails = res;
      }, (err:any) => {

      });
  }
}
