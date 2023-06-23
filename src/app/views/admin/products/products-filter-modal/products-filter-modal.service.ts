import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsFilterModalService {
  editDataObj: any = {};

  constructor(private _http: HttpClient) {}

  setData(data: any){
    this.editDataObj = data;
  }

  getData(){
    return this.editDataObj;
  }

}
