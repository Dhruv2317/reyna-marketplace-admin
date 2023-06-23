import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShippingPricingAddEditModalService {
  editDataObj: any = {};

  constructor(private _http: HttpClient) {}

  setData(data: any){
    this.editDataObj = data;
  }

  getData(){
    return this.editDataObj;
  }

  async addNewShippingPricing(bodyData: any):Promise<any>{
    return await this._http.post('api/admin/shipping_pricing/create', bodyData).toPromise();
  }

  async editShippingPricing(id: any, bodyData: any):Promise<any>{
		return await this._http.post('api/admin/shipping_pricing/update/'+id, bodyData).toPromise();
  }
}
