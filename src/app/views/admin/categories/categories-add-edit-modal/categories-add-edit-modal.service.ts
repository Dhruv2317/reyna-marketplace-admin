import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesAddEditModalService {
  editDataObj: any = {};

  constructor(private _http: HttpClient) {}

  setData(data: any){
    console.log("setData : ",data);
    this.editDataObj = data;
  }

  getData(){
    console.log("getData : ",this.editDataObj);
    return this.editDataObj;
  }

  async addNewCategories(bodyData: any):Promise<any>{
    console.log("Bodydata : ",bodyData);
    
    return await this._http.post(environment.api_url+'api/Category/AddCategory', bodyData).toPromise();
  }

  async editCategories(id: number, bodyData: any):Promise<any>{
    console.log("Bodydata : ",bodyData);

    return await this._http.post(environment.api_url+'api/Category/AddCategory', bodyData).toPromise();
		// return await this._http.post('api/admin/categories/update/'+id, bodyData).toPromise();
  }
}
