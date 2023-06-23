import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent implements OnInit {


  productId: any;
  constructor(private route: ActivatedRoute){
    let activatedRoute:any  = this.route;
    this.productId = activatedRoute.parent.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
  }

}
