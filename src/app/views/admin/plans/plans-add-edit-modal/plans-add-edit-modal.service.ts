import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    return await this._http.post('api/admin/subscription_plans/create', bodyData).toPromise();
  }

  async editPlan(id: number, bodyData: any):Promise<any>{
		return await this._http.post('api/admin/subscription_plans/update/'+id, bodyData).toPromise();
  }
}
