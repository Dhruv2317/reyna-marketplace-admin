import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seller-view',
  templateUrl: './seller-view.component.html',
  styleUrls: ['./seller-view.component.scss']
})
export class SellerViewComponent implements OnInit {

 
  sellerId:any;
  constructor(
    private route: ActivatedRoute,
    private _router: Router){

  }

  ngOnInit(): void {
    this.sellerId = this.route.snapshot.params.id;
  }


}
