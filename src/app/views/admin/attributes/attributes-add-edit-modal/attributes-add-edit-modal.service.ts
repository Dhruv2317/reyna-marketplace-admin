import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttributesAddEditModalService {
  editDataObj: any = {};

  constructor(private _http: HttpClient) {}

  setData(data: any){
    this.editDataObj = data;
  }

  getData(){
    return this.editDataObj;
  }

  async addNewAttributes(bodyData: any):Promise<any>{
    return await this._http.post('api/admin/attributes/create', bodyData).toPromise();
  }

  async editAttributes(id: number, bodyData: any):Promise<any>{
		return await this._http.post('api/admin/attributes/update/'+id, bodyData).toPromise();
  }
}
