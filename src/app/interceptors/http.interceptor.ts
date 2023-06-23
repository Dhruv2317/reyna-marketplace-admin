import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { Toastr } from 'src/app/services/toastr.service';
import {cryptoHelperService} from 'src/app/services/cryptoHelper.service';

@Injectable()
export class InterceptedHttp implements HttpInterceptor {
    constructor(
        private _router: Router,
        private _auth: AuthService,
        private _toastr: Toastr,
        private _cryptoHelperService:cryptoHelperService
    ){

    }
    static requestCount: number = 0;
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let url = req.url;
        let _req: HttpRequest<any>;

        if (req.url.indexOf('is_third_party_api') == -1){
          _req = req.clone({ url: environment.api_url + url });
        }else{
            url = url.replace('&is_third_party_api','');
            url = url.replace('?is_third_party_api','');
            _req = req.clone({ url:url});
        }

        if (req.url.indexOf('api/auth/login') == -1 && req.url.indexOf('is_third_party_api') == -1){
            // Get the auth token from the service.
            const authToken = this._auth.getAuthorizationToken();

            // Clone the request and set the new header in one step.
            let  authReq = _req.clone({withCredentials:true,setHeaders:  {Authorization:'Bearer ' + authToken} });
            // _req.clone({headers: req.headers.append('Authorization', 'Bearer ' + authToken) });

            InterceptedHttp.requestCount++;
            // send cloned request with header to the next handler.
            return next.handle(authReq)
                .pipe(
                    map((event: HttpEvent<any>) => {
                        if (event instanceof HttpResponse) {

                        }
                        return event;
                    }),
                    catchError((error: HttpErrorResponse) => {
                        if (error.status == 200) {
                            //if(EncryptedRoutes.ENCRYPTED_ROUTE_LIST.indexOf(req.url)!=-1){
                                return of(new HttpResponse({ status: 200, body: this._cryptoHelperService.decryptJSON(error.error.text)}));
                            //}
                        }

                        if (error.status == 401) {
                            this._toastr.showError('Your Session has expired. Please sign in');
                            this._auth.clearStorage();
                            this._auth.changeIsLogoutClicked(true);
                            this._router.navigate(['account','login']);
                        }
                        return throwError(error);
                    }));
        } else {
            const req = _req.clone({ setHeaders: { 'Content-Type': 'application/x-www-form-urlencoded' } });
            return next.handle(req);
        }
    }



}
