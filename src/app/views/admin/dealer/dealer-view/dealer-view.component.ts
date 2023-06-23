import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dealer-view',
  templateUrl: './dealer-view.component.html',
  styleUrls: ['./dealer-view.component.scss']
})
export class DealerViewComponent implements OnInit {

  dealerId:any;
  constructor(
    private route: ActivatedRoute,
    private _router: Router){

  }

  ngOnInit(): void {
    this.dealerId = this.route.snapshot.params.id;
  }

}
