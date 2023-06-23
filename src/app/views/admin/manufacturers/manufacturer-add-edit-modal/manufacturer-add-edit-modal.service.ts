import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerAddEditModalService {
  editDataObj: any = {};

  constructor(private _http: HttpClient) {}

  setData(data: any){
    this.editDataObj = data;
  }

  getData(){
    return this.editDataObj;
  }

  async addNewManufacturer(bodyData: any):Promise<any>{
    return await this._http.post('api/admin/manufacturers/create', bodyData).toPromise();
  }

  async editManufacturer(id: any, bodyData: any):Promise<any>{
		return await this._http.post('api/admin/manufacturers/update/'+id, bodyData).toPromise();
  }
}
