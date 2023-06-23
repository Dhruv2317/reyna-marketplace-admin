import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesOrdersRoutingModule } from './sales-orders-routing.module';
import { SalesOrdersComponent } from './sales-orders.component';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [SalesOrdersComponent],
  imports: [
    CommonModule,
    SalesOrdersRoutingModule,
    HighchartsChartModule,
  ]
})
export class SalesOrdersModule { }
