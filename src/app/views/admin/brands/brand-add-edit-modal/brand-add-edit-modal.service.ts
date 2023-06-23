import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BrandAddEditModalService {
  editDataObj: any = {};

  constructor(private _http: HttpClient) {}

  setData(data: any) {
    this.editDataObj = data;
  }

  getData() {
    return this.editDataObj;
  }

  async addNewBrand(bodyData: any) {
    return await this._http.post('api/admin/brands/create', bodyData).toPromise();
  }

  async editBrand(id: number, bodyData: any) {
		return await this._http.post('api/admin/brands/update/'+id, bodyData).toPromise();
  }

  async getAllManufacturers(searchTerm:string):Promise<any>{
    return await this._http.get(`api/admin/manufacturers/all`+`?search=${searchTerm}`).toPromise();
  }

}
