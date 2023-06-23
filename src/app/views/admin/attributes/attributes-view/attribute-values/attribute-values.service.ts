import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttributeValuesService {


	constructor(private _http: HttpClient) {}

  async createOTCSubCategory(data:any):Promise<any>{
    return await this._http.post(`api/admin/categories/add-subcategory`,data).toPromise();
  }

  async updateOTCSubCategory(id:number,data:any):Promise<any>{
    return await this._http.post(`api/admin/categories/update-subcategory/${id}`,data).toPromise();
  }

  async findAllOTCSubCategory(id:number,data:any):Promise<any>{
    return await this._http.post(`api/admin/categories/all-subcategories-by-category/${id}`,data).toPromise();
  }

  async findByIdOTCSubCategory(id:number):Promise<any>{
    return await this._http.get(`api/admin/categories/subcategory-details/${id}`).toPromise();
  }



}
