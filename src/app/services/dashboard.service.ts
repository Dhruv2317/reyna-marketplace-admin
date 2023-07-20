import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {MarketplaceApiEndpoints} from 'src/app/constants/MarketplaceApiEndpoints';

@Injectable()
export class DashboardService {

  constructor(private _http: HttpClient) {

  }

  async getDashboardDetails(): Promise<any> {
      return await this._http.get<any>(MarketplaceApiEndpoints.ADMIN_DASHBOARD).toPromise();
  }

}
