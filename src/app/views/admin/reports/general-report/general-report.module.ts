
import { NgModule } from '@angular/core';
import { GeneralReportComponent } from './general-report.component';
import { GeneralReportRoutingModule } from './general-report-routing.module';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
// import { AgmCoreModule } from '@agm/core';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [GeneralReportComponent], 
  imports: [
    SharedModule,
    GeneralReportRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxDaterangepickerMd.forRoot(),
    HighchartsChartModule,
    /* AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey:environment.google_map_api_key
    }) */
  ]
})
export class GeneralReportModule { }
