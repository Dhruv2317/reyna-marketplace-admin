import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports-navbar',
  templateUrl: './reports-navbar.component.html'
})
export class ReportsNavbarComponent implements OnInit {

  selectedRoute!:string;
  constructor(private router: Router) { }

  ngOnInit() {
    this.selectedRoute = this.router.url;
  }

}
