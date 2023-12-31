import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, catchError, switchMap, filter, take } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { Toastr } from 'src/app/services/toastr.service';
import { cryptoHelperService } from 'src/app/services/cryptoHelper.service';

@Injectable()
export class InterceptedHttp implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
        null
    );
    constructor(
        private _router: Router,
        private _auth: AuthService,
        private _toastr: Toastr,
        private _cryptoHelperService: cryptoHelperService
    ) {

    }
    static requestCount: number = 0;
    // intercept1(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     // let url = req.url;
    //     // let _req: HttpRequest<any>;

    //     req = req.clone({
    //         withCredentials: false,
    //     });

    //     return next.handle(req).pipe(
    //         catchError((error) => {
    //             if (
    //                 error instanceof HttpErrorResponse &&
    //                 !req.url.includes('api/Auth/LoginAsync') &&
    //                 error.status === 401
    //             ) {
    //                 return this.handle401Error(req, next);
    //             }

    //             return throwError(() => error);
    //         })
    //     );
    // }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Modify the request here, add headers, handle authentication, etc.
        var ACCESS_TOKEN = localStorage.getItem('access_token');
        // For example, adding an Authorization header
        const modifiedRequest = request.clone({
            setHeaders: {
                Authorization: 'Bearer ' + ACCESS_TOKEN,
            },
        });

        // Pass the modified request to the next interceptor or the HTTP handler
        return next.handle(modifiedRequest);
    }
    // private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    // if (!this.isRefreshing) {
    //     this.isRefreshing = true;

    //     if (this.storageService.isLoggedIn()) {
    //         return this.authService.refreshToken().pipe(
    //             switchMap(() => {
    //                 this.isRefreshing = false;

    //                 return next.handle(request);
    //             }),
    //             catchError((error) => {
    //                 this.isRefreshing = false;

    //                 if (error.status == '403') {
    //                     this.eventBusService.emit(new EventData('logout', null));
    //                 }

    //                 return throwError(() => error);
    //             })
    //         );
    //     }
    // }

    //     return next.handle(request);
    // }
    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this._auth.refreshToken().pipe(
                switchMap((token: any) => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(token['result'].accessToken);
                    return next.handle(this.addToken(request, token['result'].accessToken));
                })
            );
        } else {
            return this.refreshTokenSubject.pipe(
                filter((token) => token != null),
                take(1),
                switchMap((jwt) => {
                    return next.handle(this.addToken(request, jwt));
                })
            );
        }
    }

}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptedHttp, multi: true },
];
