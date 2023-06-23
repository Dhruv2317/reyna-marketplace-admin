import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShippingPricingService {


	constructor(private _http: HttpClient) {}

  async createShippingPricing(data:any):Promise<any>{
    return await this._http.post(`api/admin/shipping_pricing/create`,data).toPromise();
  }

  async updateShippingPricing(data:any):Promise<any>{
    return await this._http.post(`api/admin/shipping_pricing/update/${data.id}`,data).toPromise();
  }

  async findAllShippingPricings():Promise<any>{
    return await this._http.get(`api/admin/shipping_pricing/list`).toPromise();
  }

  async findByIdShippingPricing(id:number):Promise<any>{
    return await this._http.get(`api/admin/shipping_pricing/view/${id}`).toPromise();
  }


}
