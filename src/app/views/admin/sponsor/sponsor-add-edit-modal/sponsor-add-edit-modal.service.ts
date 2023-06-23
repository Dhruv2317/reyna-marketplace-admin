import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SponsorAddEditModalService {
  editDataObj: any = {};

  constructor(private _http: HttpClient) {}

  setData(data: any) {
    this.editDataObj = data;
  }

  getData() {
    return this.editDataObj;
  }

  async addNewSponsor(bodyData: any) {
    return await this._http.post('api/admin/sponsors/create', bodyData).toPromise();
  }

  async editSponsor(id: number, bodyData: any) {
		return await this._http.post('api/admin/sponsors/update/'+id, bodyData).toPromise();
  }

}
