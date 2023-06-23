import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShippingInsuranceService {


	constructor(private _http: HttpClient) {}

  async createShippingInsurance(data:any):Promise<any>{
    return await this._http.post(`api/admin/shipping_insurance/create`,data).toPromise();
  }

  async updateShippingInsurance(data:any):Promise<any>{
    return await this._http.post(`api/admin/shipping_insurance/update/${data.id}`,data).toPromise();
  }

  async findAllShippingInsurances():Promise<any>{
    return await this._http.get(`api/admin/shipping_insurance/list`).toPromise();
  }

  async findByIdShippingInsurance(id:number):Promise<any>{
    return await this._http.get(`api/admin/shipping_insurance/view/${id}`).toPromise();
  }


}
