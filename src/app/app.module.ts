import { NgModule } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpInterceptorModule } from './interceptors/http.interceptor.module';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { notificationHelper} from 'src/app/services/notificationHelper.service';
import { MsgService } from 'src/app/services/msgService';
import { WebsocketService } from 'src/app/services/WebsocketService';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    HttpClientModule,
    HttpInterceptorModule,
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot({
			preventDuplicates: true
		}),
    AppRoutingModule
  ],
  providers: [notificationHelper,MsgService,WebsocketService,CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
