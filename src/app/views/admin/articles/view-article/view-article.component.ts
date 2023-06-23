import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Toastr } from 'src/app/services/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Helper } from 'src/app/services/helper.service';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.scss']
})
export class ViewArticleComponent implements OnInit {
  public ArticleId: any;
  public ArticleDetails: any;
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public _helper: Helper,
    private _http: HttpClient,
    public activeRoute: ActivatedRoute
  ) {
    this.ArticleId = this.activeRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getArticleDetails();
  }

  getArticleDetails(){
    const url = 'api/admin/articles/view/' + this.ArticleId;
    this._http.get(url).subscribe((res: any) => {
        this.ArticleDetails = res;
      }, (err:any) => {

      });
  }
}
