import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleCategoriesAddEditModalService {
  editDataObj: any = {};

  constructor(private _http: HttpClient) {}

  setData(data: any){
    this.editDataObj = data;
  }

  getData(){
    return this.editDataObj;
  }

  async addNewCategories(bodyData: any):Promise<any>{
    return await this._http.post('api/admin/article_categories/create', bodyData).toPromise();
  }

  async editCategories(id: number, bodyData: any):Promise<any>{
		return await this._http.post('api/admin/article_categories/update/'+id, bodyData).toPromise();
  }
}
