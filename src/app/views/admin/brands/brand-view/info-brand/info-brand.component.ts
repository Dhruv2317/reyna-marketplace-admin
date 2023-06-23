import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, Event } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-info-brand',
  templateUrl: './info-brand.component.html',
  styleUrls: ['./info-brand.component.scss']
})
export class InfoBrandComponent implements OnInit, OnDestroy {
  brandDetails: any = {
    name: '',
    slug: '',
    is_active: true
  };
  brandId: any;
  imageUrl: any = '../../../../../../../assets/img/no_preview.png'

  routeSubscribe: any;
  constructor(
    private router: Router,
    private _http: HttpClient,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private _changeDetectorRef: ChangeDetectorRef
    ) {
    this.routeSubscribe = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.brandId = this.route?.parent?.parent?.snapshot.paramMap.get('brand_id');
        console.log(this.brandId)
        this.findByIdBrand(this.brandId);
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.routeSubscribe) {
      this.routeSubscribe.unsubscribe();
    }
  }

  async findByIdBrand(id: any) {
    this._http.get(`api/admin/brands/view/${id}`).toPromise().then((result: any) => {
      if (result && result.id) {
        this.brandDetails = result;
        this.getImage(result.image, 'LOGO');
        this._changeDetectorRef.detectChanges();
      }
    }).catch((err:any) => {
      this.imageUrl = '../../../../../../assets/img/no_preview.png';
    })
  }

  getImage(path:string, type: string) {
    this._http.post('api/documents/preview', { path: path }, { responseType: 'blob' }).toPromise().then((result) => {
      const fr = new FileReader();
      fr.readAsDataURL(result);
      fr.onloadend = () => {
        if (type == 'LOGO') {
          this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(fr.result + '');
        }
      }
      }).catch((err:any) => {
        if (type == 'LOGO') {
          this.imageUrl = '../../../../../../assets/img/no_preview.png';
        }
      })
    return this.imageUrl
  }

}
