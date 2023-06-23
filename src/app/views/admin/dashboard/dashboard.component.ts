import { Component, OnInit, ViewChild, Renderer2, TemplateRef, ElementRef, Injector, ViewChildren, AfterViewInit, ChangeDetectorRef, OnDestroy,ViewEncapsulation } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements  OnInit, AfterViewInit, OnDestroy {

  constructor(private _http: HttpClient,
    private _router: Router,
    private _injector: Injector,
    private _changeDetectorRef: ChangeDetectorRef){


  }

  /*------- LIFE CYCLE METHODS -------*/
  ngOnInit(){
  }

  ngAfterViewInit(){
  }

  ngOnDestroy(): void{

  }
  /*------- END OF LIFE CYCLE METHODS ------*/


}
