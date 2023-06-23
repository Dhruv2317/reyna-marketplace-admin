import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FAQGroupAddEditModalService {
  editDataObj: any = {};

  constructor(private _http: HttpClient) {}

  setData(data: any){
    this.editDataObj = data;
  }

  getData(){
    return this.editDataObj;
  }

  async addNewFAQGroup(bodyData: any):Promise<any>{
    return await this._http.post('api/admin/faqs/create-group', bodyData).toPromise();
  }

  async editFAQGroup(id: any, bodyData: any):Promise<any>{
		return await this._http.post('api/admin/faqs/update-group/'+id, bodyData).toPromise();
  }
}
