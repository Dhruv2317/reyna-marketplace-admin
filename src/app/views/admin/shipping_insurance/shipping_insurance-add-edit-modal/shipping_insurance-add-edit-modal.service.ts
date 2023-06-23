import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShippingInsuranceAddEditModalService {
  editDataObj: any = {};

  constructor(private _http: HttpClient) {}

  setData(data: any){
    this.editDataObj = data;
  }

  getData(){
    return this.editDataObj;
  }

  async addNewShippingInsurance(bodyData: any):Promise<any>{
    return await this._http.post('api/admin/shipping_insurance/create', bodyData).toPromise();
  }

  async editShippingInsurance(id: any, bodyData: any):Promise<any>{
		return await this._http.post('api/admin/shipping_insurance/update/'+id, bodyData).toPromise();
  }
}
