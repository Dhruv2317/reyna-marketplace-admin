
/*Importing inbuilt modules & components provided by Angular*/
import { NgModule } from '@angular/core';
import { HttpClientModule,HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/* Import the custom module or components */
import { InterceptedHttp } from './http.interceptor';
import {cryptoHelperService} from '../services/cryptoHelper.service';
/** Http interceptor providers */
export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptedHttp, multi: true },
];

@NgModule({
    declarations: [],
    imports: [
        HttpClientModule,
    ],
    providers: [httpInterceptorProviders,cryptoHelperService],
    exports: [HttpClientModule]
})
export class HttpInterceptorModule { }
