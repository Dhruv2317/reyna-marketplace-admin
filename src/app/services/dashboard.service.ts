import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {GolfedApiEndpoints} from 'src/app/constants/GolfedApiEndpoints';

@Injectable()
export class DashboardService {

  constructor(private _http: HttpClient) {

  }

  async getDashboardDetails(): Promise<any> {
      return await this._http.get<any>(GolfedApiEndpoints.ADMIN_DASHBOARD).toPromise();
  }

}
