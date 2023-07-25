import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlansAddEditModalService {
  editDataObj: any = {};

  constructor(private _http: HttpClient) {}

  setData(data: any){
    this.editDataObj = data;
  }

  getData(){
    return this.editDataObj;
  }

  async addNewPlan(bodyData: any):Promise<any>{
    return await this._http.post(environment.api_url+'api/SubscriptionPlan/AddUpdateSubscriptionPlan', bodyData).toPromise();
  }

  async editPlan(id: number, bodyData: any):Promise<any>{
		return await this._http.post('api/admin/subscription_plans/update/'+id, bodyData).toPromise();
  }
}
