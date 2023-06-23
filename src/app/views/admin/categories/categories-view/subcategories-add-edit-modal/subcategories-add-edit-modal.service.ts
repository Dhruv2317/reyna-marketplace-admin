import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesAddEditModalService {
  editDataObj: any = {};

  constructor(private _http: HttpClient) {}

  setData(data: any){
    this.editDataObj = data;
  }

  getData(){
    return this.editDataObj;
  }

  async addNewSubcategories(bodyData: any):Promise<any>{
    return await this._http.post('api/admin/subcategories/create', bodyData).toPromise();
  }

  async editSubcategories(id: number, bodyData: any):Promise<any>{
		return await this._http.post('api/admin/subcategories/update/'+id, bodyData).toPromise();
  }
}
