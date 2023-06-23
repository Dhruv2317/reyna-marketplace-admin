import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FAQGroupService {


	constructor(private _http: HttpClient) {}

  async createFAQGroup(data:any):Promise<any>{
    return await this._http.post(`api/admin/faqs/create-group`,data).toPromise();
  }

  async updateFAQGroup(data:any):Promise<any>{
    return await this._http.post(`api/admin/faqs/update-group/${data.id}`,data).toPromise();
  }

  async findAllFAQGroups():Promise<any>{
    return await this._http.get(`api/admin/faqs/list-group`).toPromise();
  }

  async findByIdFAQGroup(id:number):Promise<any>{
    return await this._http.get(`api/admin/faqs/view-group/${id}`).toPromise();
  }


}
