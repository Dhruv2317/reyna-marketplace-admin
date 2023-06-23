import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Helper } from 'src/app/services/helper.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.scss']
})
export class ProductReviewsComponent implements OnInit {

  @BlockUI('loader') blockDataTable!: NgBlockUI;
  
  starsArray = [1, 2, 3, 4, 5];
  loading = false;
  config: any;
  collection: any = { count: 0, data: [] };
  hasMorePages: boolean = false;
  selectedReviews: any[] = [];
  api_url = environment.api_url;
  productId: any;
  routeSubscribe:any;
  ratingCounts:any;
  constructor(
    public _http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    public _helper:Helper,
    public _changeDetectorRef: ChangeDetectorRef) {

      this.routeSubscribe = this.router.events.subscribe((event:any) => {
        if (event instanceof NavigationEnd) {
          let activatedRoute:any = this.route;
          this.productId = activatedRoute.parent.parent.snapshot.paramMap.get('id');
          this.getReviews(this.config.currentPage, this.config.itemsPerPage, this.config.sortBy, this.config.filterBy, this.config.status);

        }
    });

    let url = this.router.url;
    let url_parts = url.split('?');
    let queryPart = url_parts.length > 0 ? url_parts[1] : null;
    let key = queryPart ? queryPart.split('=')[0] : '';
    let value = queryPart ? queryPart.split('=')[1] : '';

    this.config = {
      id: 'pagination-controls___reviews',
      status: 'not_approved',
      sortBy: 'newest',
      filterBy: 'all-stars',
      queryFilter: {
        key: key,
        value: value
      },
      itemsPerPage: 20,
      currentPage: 1,
      totalItems: this.collection.count
    };

  }

  ngOnInit() {

  }

  pageChanged(event: any) {
    this.config.currentPage = event;
    this.getReviews(this.config.currentPage, this.config.itemsPerPage, this.config.sortBy, this.config.filterBy, this.config.status);
  }


  setRating(rating:number){
    this.config.filterBy=`${rating}-stars`;
    this.config.currentPage=1;
    this.getReviews(this.config.currentPage, this.config.itemsPerPage, this.config.sortBy, this.config.filterBy, this.config.status);
  }

  getReviews(page: number, limit: number, sortBy: string = 'created_at', filterBy: any, status: any) {
    this.blockDataTable.start();
    this._http.get<any>(`api/admin/products/reviews/${this.productId}/all?page=${page}&limit=${limit}&sortBy=${sortBy}&filterBy=${filterBy}&status=${status}&queryFilterKey=${this.config.queryFilter.key}&queryFilterValue=${this.config.queryFilter.value}`).subscribe((resp: any) => {
      this.blockDataTable.stop();
      this.ratingCounts = resp.ratings;
      this.collection.data = resp.reviews.data;
      this.collection.count = resp.reviews.total;
      this.config.itemsPerPage = resp.reviews.perPage;
      this.config.totalItems = resp.reviews.total;
      this.config.currentPage = resp.reviews.currentPage;
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }, (err: any) => {
      this.blockDataTable.stop();
    });
  }

  approveReviews() {
    this._http.post<any>(`api/admin/products/reviews/${this.productId}/approve`, {
      ids: this.selectedReviews
    }).subscribe((resp) => {
      this.selectedReviews = [];
      this.getReviews(this.config.currentPage, this.config.itemsPerPage, this.config.sortBy, this.config.filterBy, this.config.status);
    });
  }

  deleteReviews() {
    this._http.post<any>(`api/admin/products/reviews/${this.productId}/delete`, {
      ids: this.selectedReviews
    }).subscribe((resp) => {
      this.selectedReviews = [];
      this.getReviews(this.config.currentPage, this.config.itemsPerPage, this.config.sortBy, this.config.filterBy, this.config.status);
    });
  }

  markAsFeatured() {
    this._http.post<any>(`api/admin/products/reviews/${this.productId}/markAsFeatured`, {
      ids: this.selectedReviews
    }).subscribe((resp) => {
      this.selectedReviews = [];
      this.getReviews(this.config.currentPage, this.config.itemsPerPage, this.config.sortBy, this.config.filterBy, this.config.status);
    });
  }

  onImgError(event: any) {
    event.target.src = 'assets/img/no-product.jpeg'
  }

  isSelected(id: any) {
    return this.selectedReviews.filter((itm: any) => itm == id).length == 0 ? false : true;
  }

  onSelectReview(id: any) {
    let index = this.selectedReviews.findIndex((itm: any) => itm == id);
    if (this.selectedReviews.filter((itm: any) => itm == id).length == 0) {
      this.selectedReviews.push(id);
    } else {
      this.selectedReviews.splice(index, 1);
    }
  }
}
