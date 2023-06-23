import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-brand-view',
  templateUrl: './brand-view.component.html',
  styleUrls: ['./brand-view.component.scss']
})
export class BrandViewComponent implements OnInit {
  selectedBrandId: any;
  brandsList: any[] = [];

  constructor(
    private router: Router,
    private _http: HttpClient,
    private route: ActivatedRoute,
    private _cdr: ChangeDetectorRef
  ) {
    this.selectedBrandId = this.route?.parent?.snapshot.paramMap.get('brand_id') ? parseInt(this.route?.parent?.snapshot.paramMap.get('brand_id') || '') : null;
  }

  ngOnInit() {
    this.getAllBrandsList();
  }

  public getAllBrandsList() {
    const url = 'api/admin/brands/all';
    this._http.get(url)
      .subscribe((resp: any) => {
        this.brandsList = resp;
        this._cdr.detectChanges();
      }, (err:any) => {
        
      });
  }

  public onBrandChange (brandId: number) {
    this.router.navigate(['admin', 'brands', 'view', brandId, 'info'])
  }

}
