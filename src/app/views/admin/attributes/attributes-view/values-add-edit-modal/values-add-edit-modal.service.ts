import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValuesAddEditModalService {
  editDataObj: any = {};

  constructor(private _http: HttpClient) {}

  setData(data: any){
    this.editDataObj = data;
  }

  getData(){
    return this.editDataObj;
  }

  async addNewValues(bodyData: any):Promise<any>{
    return await this._http.post(environment.api_url+'api/AttributeValues/AddUpdateAttributeValue', bodyData).toPromise();
  }

  async editValues(id: number, bodyData: any):Promise<any>{
		return await this._http.post('api/admin/attributes_values/update/'+id, bodyData).toPromise();
  }
}
