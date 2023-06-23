import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {GolfedApiEndpoints} from "src/app/constants/GolfedApiEndpoints";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private _http: HttpClient) {}

  async login(body:any): Promise<any> {


    const BASIC_HEADER_TOKEN = 'Basic YWRtaW46c2VjcmV0T0F1dGgyYWRtaW4=';
   

    let headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization':BASIC_HEADER_TOKEN });
    let options = { headers: headers };

    var result = await this._http
      .post<any>(GolfedApiEndpoints.LOGIN,body,options)
      .toPromise()
      .catch((err:any) => {
        console.log('error=',err);
        return err.error;
      });
    return result;
  }

  async getLoggedInUser(): Promise<any> {
    var result = await this._http.get<any>(GolfedApiEndpoints.ME).toPromise();
    return result;
  }


}
