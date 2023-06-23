import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';
import { Toastr } from '../../../../services/toastr.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import * as Highcharts from 'highcharts';
import HighchartsExport from 'highcharts/modules/exporting';
import { Subscription } from 'rxjs';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
HighchartsExport(Highcharts);

interface marker {
	lat: number;
	lng: number;
  label?: string;
  city?: string;
  address_line_1?: string;
  address_line_2?: string;
  zip_code?: number;
  full_name?: string;
	draggable: boolean;
}

@Component({
  selector: 'app-general-report',
  templateUrl: './general-report.component.html'
})
export class GeneralReportComponent implements OnInit,OnDestroy {
  // google maps zoom level
  zoom: number = 8;

  // initial center position for the map
  lat: number = 27.6648;
  lng: number = -81.5158;

  markers: marker[] = [];

  selectedDateRange:any;
  selectedCustomDate:any;
  reportConfig!:any[];
  reportTypes!:any[];
  selectedReportType:string='';
  availableTimeUnits!:any[];
  selectedTimeUnit:string='THIS_MONTH';

  cutomFilterList:any[] = [];
  selectedCustomFilter:any;

  pageLimitList:any[] = [];
  selectedPageLimit:any;
  reportData:any;
  config:any= {
    itemsPerPage:50,
    currentPage: 1,
    totalItems:0
  };
  collection = { count: 0, data: [] };
  availableLimits: number[] = [10,20,50,100,200];
  selectedLimit = 50;

  chart: any;
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor: string = 'chart';
  chartOptions: Highcharts.Options = {};
  chartCallback: any;
  updateFlag = false;
  oneToOneFlag = true;

  routerSub:Subscription;
  inputReportType: any = '';
  inputReportTimeUnit: any = '';
  inputReportLimit: number = 50;

  @BlockUI('reportLoader') blockReportLoader!: NgBlockUI;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _route: ActivatedRoute,
    private toastr: Toastr) {
      const self = this;

       /* Get query string params from URL and auto load report data*/
       this.routerSub = this._route.queryParams.subscribe(params => {
          this.inputReportType = params['report_type'];
          this.inputReportTimeUnit = params['time_unit'];
          this.inputReportLimit = params['limit'] || this.selectedLimit;

          this.selectedReportType=  this.inputReportType;
          this.selectedTimeUnit =  this.inputReportTimeUnit;    
       });

      this.chartCallback = (chart: any) => {
        self.chart = chart;
      };
    }

  ngOnInit(){
    this.config = {
      itemsPerPage:this.selectedLimit,
      currentPage: 1,
      totalItems: this.collection.count
    };
    this.getReportConfig();
    if(this.inputReportType){
      this.getReport();      
    }
  }

  ngOnDestroy(){
     if(this.routerSub){
       this.routerSub.unsubscribe();
     }
  }

  public onMouseOver(infoWindow: any, $event: MouseEvent) {
    infoWindow.open();
  }

  public onMouseOut(infoWindow: any, $event: MouseEvent) {
    infoWindow.close();
  }

  public clickedMarker(markerInfo: any) {
    window.open(`https://www.google.com/maps/dir/'28.5483592,-81.5886492'/${markerInfo.lat},${markerInfo.lng}`)
  }


  public onTimeUnitChange (val: any) {
    this.selectedDateRange = null
  }

  public getReportConfig(){
    this.http.get<any>(`api/admin/reports/getConfig`)
    .subscribe(resp => {
        this.reportConfig=resp;
        if(this.inputReportType){
          this.selectedReportType= resp[0]['reportType'];
          this.onReportTypeChanged(this.selectedReportType);
        }else{
          this.selectedReportType= resp[0]['reportType'];
          this.onReportTypeChanged(resp[0]['reportType']);
        }
    });
  }

  public loadChartData(chartOptions:any){
    const self = this,
    chart = this.chart;

    self.chartOptions = chartOptions;
    self.updateFlag = true;
  }

  public getMyChart(ChartType:string,ChartTitle:string='',XTitle:string,YTitle:string,XData:any[],YData:any[]){
    let chartOptions;
    if(ChartType === 'column'){
      chartOptions =  {
        title: {
          text: ChartTitle
        },
        xAxis: {
          categories: XData,
          title: {
            text: XTitle
          }
        },
        chart: {
          type: ChartType
        },
        subtitle: {
            text: ''
        },
        yAxis: {
          min: 0,
          title: {
            text: YTitle,
            align: 'high'
          },
          labels: {
            overflow: 'justify'
          },
          tickInterval: 1
        },
        plotOptions: {
          column: {
            pointWidth: 20
          }
        },
       series: YData,
        exporting: {
          enabled: true
        }
      };
    }else if(ChartType === 'line'){
      chartOptions =  {
        chart: {
          type: ChartType
        },
        title: {
          text: ChartTitle
        },
        subtitle: {
            text: ''
        },
        xAxis: {
          categories: XData,
          title: {
            text: XTitle
          }
        },
    yAxis: {
        title: {
            text: YTitle
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: true
        }
    },
     series:YData,
      exporting: {
        enabled: true
      }
      };
    }else if(ChartType === 'bar'){
      chartOptions =  {
        chart: {
          type: ChartType
        },
        title: {
          text: ChartTitle
        },
        subtitle: {
            text: ''
        },
        xAxis: {
          categories: XData,
          title: {
              text: XTitle
          }
        },
        yAxis: {
          min: 0,
          title: {
              text: YTitle,
              align: 'high'
          },
          labels: {
              overflow: 'justify'
          }
      },
      plotOptions: {
          bar: {
              dataLabels: {
                  enabled: true
              }
          }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions?.legend?.backgroundColor || '#FFFFFF',
        shadow: true
       },
      credits: {
        enabled: false
      },
      series:YData,
      exporting: {
        enabled: true
      }
      };
    }
    return chartOptions;
  }

  public getReport(){
    this.blockReportLoader.start();
    if (this.selectedCustomDate instanceof Date) {
        this.selectedCustomDate = this.selectedCustomDate.getFullYear() + '-' + (this.selectedCustomDate.getMonth() + 1) + '-' +this.selectedCustomDate.getDate()
    }
    if (this.selectedDateRange) {
        this.selectedDateRange.start = new Date(this.selectedDateRange.start).getFullYear() + '-' + (new Date(this.selectedDateRange.start).getMonth() + 1) + '-' + new Date(this.selectedDateRange.start).getDate()
        this.selectedDateRange.end = new Date(this.selectedDateRange.end).getFullYear() + '-' + (new Date(this.selectedDateRange.end).getMonth() + 1) + '-' + new Date(this.selectedDateRange.end).getDate()
    }
    let that = this;
    let url = `api/admin/reports/getReportData?reportType=${this.selectedReportType}&timeUnit=${this.selectedTimeUnit}&page=${this.config.currentPage}&limit=${this.selectedLimit}`;
    this.selectedTimeUnit === 'CUSTOM_RANGE' ? url += `&timeValue=${this.selectedDateRange.start+','+this.selectedDateRange.end}` : url;
    this.selectedTimeUnit === 'CUSTOM_DATE' ? url += `&timeValue=${this.selectedCustomDate}` : url;

    this.http
    .get<any>(url)
    .subscribe(res => {
        this.blockReportLoader.stop();
        this.reportData = res;
        console.log('res=',res)
        this.collection.count = res.total;
        this.collection.data = res.data;
        this.config.itemsPerPage =  res.perPage;
				this.config.totalItems = res.total;
        this.config.currentPage  =  res.currentPage;
        if(this.selectedReportType === 'USER_REGISTERED') {
          if(this.selectedTimeUnit === 'MONTH_WISE') {
            let xData : any[] = res.data.map((obj: any)=>obj.month_year);
            let yData : any[] = [
              {
              name : 'Users',
              data : res.data.map((obj: any)=>obj.users)
              }
            ]
            const myChart: any =  that.getMyChart('column','MonthWise User Registered','Month-Year','Users',xData,yData);
            myChart.tooltip = {
              pointFormatter: function() {
                var point = this;
                return '<span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': <b>' + point.y  + '</b><br/>';
              }
            }
            this.loadChartData(myChart);
          }
          else if (this.selectedTimeUnit === 'CITY_WISE') {
            let xData : any[] = res.data.map((obj: any)=>obj.city);
            let yData : any[] = [
              {
                name : 'Users',
                data : res.data.map((obj: any)=>obj.users)
              }
            ]
            const myChart: any =  that.getMyChart('line','City Wise User Registered','City Name','No. of Users',xData,yData);
            myChart.tooltip = {
              crosshairs: true,
              pointFormatter: function() {
                var point = this;
                return '<span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': <b>' + point.y  + '</b><br/>';
              }
            }
            this.loadChartData(myChart);
          }
          else if (this.selectedTimeUnit === 'STATE_WISE') {
            let xData : any[] = res.data.map((obj: any)=>obj.state);
            let yData : any[] = [
              {
                name : 'Users',
                data : res.data.map((obj: any)=>obj.users)
              }
            ]
            const myChart: any =  that.getMyChart('line','State Wise User Registered','State Name','No. of Users',xData,yData);
            myChart.tooltip = {
              crosshairs: true,
              pointFormatter: function() {
                var point = this;
                return '<span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': <b>' + point.y  + '</b><br/>';
              }
            }
            this.loadChartData(myChart);
          }
          else if (this.selectedTimeUnit === 'MAP_VIEW'){
            this.markers = res.data;
         }
          else{
            let xData : any[] = res.chartData.map((obj: any)=>obj.month_year);
            let yData : any[] = [
              {
                name : 'Users',
                data : res.chartData.map((obj: any)=>obj.users)
              }
            ]
            const myChart: any =  that.getMyChart('column','User Registered','Date Joined','Users',xData,yData);
            myChart.tooltip = {
              pointFormatter: function() {
                var point = this;
                return '<span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': <b>' + point.y  + '</b><br/>';
              }
            }
            this.loadChartData(myChart);
          }
        } else if(this.selectedReportType === 'ORDERS_PLACED') {
          if(this.selectedTimeUnit === 'MONTH_WISE') {
            let xData : any[] = res.data.map((obj: any)=>obj.month_year);
            let yData : any[] = [
              {
              name : 'Orders',
              data : res.data.map((obj: any)=>obj.orders)
              },
              {
                name : 'Sales ($)',
                data : res.data.map((obj: any)=>+obj.sales.substr(1))
              }
            ]
            const myChart: any =  that.getMyChart('line','MonthWise Order Placed And Sales','Month-Year','Sales',xData,yData);
            myChart.tooltip = {
              shared: true,
              crosshairs: true,
              pointFormatter: function() {
                var point = this;
                return '<span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': <b>' + point.y  + '</b><br/>';
              }
            }
            this.loadChartData(myChart);
          }else if (this.selectedTimeUnit === 'CITY_WISE') {
            let xData : any[] = res.data.map((obj: any)=>obj.city);
            let yData : any[] = [
              {
              name : 'Orders',
              data : res.data.map((obj: any)=>obj.orders)
              }
            ]
            const myChart: any =  that.getMyChart('line','City Wise Order Placed','City Name','No. of Orders',xData,yData);
            myChart.tooltip = {
              shared: true,
              crosshairs: true,
              pointFormatter: function() {
                var point = this;
                return '<span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': <b>' + point.y  + '</b><br/>';
              }
            }
            this.loadChartData(myChart);
          } else{
            let xData : any[] = res.chartData.map((obj: any)=>obj.order_date);
            let yData : any[] = [
              {
              name : 'Orders',
              data : res.chartData.map((obj: any)=>obj.orders)
              },
              {
                name : 'Sales ($)',
                data : res.chartData.map((obj: any)=>+obj.order_sales)
              }
            ]
            const myChart: any =  that.getMyChart('line','Datewise Order Placed And Sales','Order Date','Sales',xData,yData);
            myChart.tooltip = {
              shared: true,
              crosshairs: true,
              pointFormatter: function() {
                var point = this;
                return '<span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': <b>' + point.y  + '</b><br/>';
              }
            }
            this.loadChartData(myChart);
          }
        } else if(this.selectedReportType === 'ORDERS_INCOMPLETE'){
          if(this.selectedTimeUnit === 'MONTH_WISE') {
            let xData : any[] = res.data.map((obj: any)=>obj.month_year);
            let yData : any[] = [
              {
              name : 'Orders',
              data : res.data.map((obj: any)=>obj.orders)
              }
            ]
            const myChart: any =  that.getMyChart('column','MonthWise Incomplete Orders','Month-Year','Orders',xData,yData);
            myChart.tooltip = {
              pointFormatter: function() {
                var point = this;
                return '<span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': <b>' + point.y  + '</b><br/>';
              }
            }
            this.loadChartData(myChart);
          } else if (this.selectedTimeUnit === 'STATUS_WISE') {
          } else {
            let xData : any[] = res.chartData.map((obj: any)=>obj.order_date);
            let yData : any[] = [
              {
              name : 'Orders',
              data : res.chartData.map((obj: any)=>obj.orders)
              }
            ]
            const myChart: any =  that.getMyChart('column','Incomplete Orders','Order Date','Orders',xData,yData);
            myChart.tooltip = {
              pointFormatter: function() {
                var point = this;
                return '<span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': <b>' + point.y  + '</b><br/>';
              }
            }
            this.loadChartData(myChart);
          }
        }else if(this.selectedReportType ==='MOST_PURCHASED_PRODUCT'){
          if(this.selectedTimeUnit === 'MONTH_WISE'){
            let xData : any[] = Array.from(new Set(res.data.map((obj: any)=>obj.month_year)));
            let allKitNames = Array.from(new Set(res.data.map((obj: any)=>obj.product_name)));
            let yData : any[] =[];
            allKitNames.forEach(kitName=>{
              let monthKitData: any = [];
              xData.forEach(month=>{
                    let found = res.data.find((kitData: any)=>{
                      return  kitData.product_name == kitName && kitData.month_year == month
                    })
                    if(found){
                      monthKitData.push(+found.product_sales.substring(1));
                    }else{
                      monthKitData.push(0);
                    }
              });

              yData.push({
                name:kitName,
                data:monthKitData
              });
            });

            const myChart: any =  that.getMyChart('column','MonthWise Most Purchased Kit','Month-Year','Sales',xData,yData);
            myChart.tooltip = {
              pointFormatter: function() {
                var point = this;
                return '<span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': <b>$' + point.y  + '</b><br/>';
              }
            }
            this.loadChartData(myChart);
          }
          else if (this.selectedTimeUnit === 'CITY_WISE') {
            let xData : any[] = Array.from(new Set(res.data.map((obj: any)=>obj.city)));
            let allKitNames = Array.from(new Set(res.data.map((obj: any)=>obj.product_name)));
            let yData : any[] =[];
            allKitNames.forEach(kitName=>{
              let monthKitData: any = [];
              xData.forEach(city=>{
                    let found = res.data.find((kitData: any)=>{
                      return  kitData.product_name == kitName && kitData.city == city
                    })
                    if(found){
                      monthKitData.push(found.kit_orders);
                    }else{
                      monthKitData.push(0);
                    }
              });

              yData.push({
                name:kitName,
                data:monthKitData
              });

            });
            const myChart: any = that.getMyChart('column','City Wise Most Purchased Kit','City Name','Orders',xData,yData);
            myChart.tooltip = {
              shared: true,
              crosshairs: true,
              pointFormatter: function() {
                var point = this;
                return '<span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': <b> ' + point.y  + '</b><br/>';
              }
            }
            this.loadChartData(myChart);
          }  else {

            let xData : any[] = res.chartData.map((obj: any)=>obj.product_name);
            let yData : any[] = [
              {
                name : 'Orders',
                data : res.chartData.map((obj: any)=>obj.kit_orders)
              },
              {
                name : 'Sales ($)',
                data : res.chartData.map((obj: any)=>+obj.kit_sales)
              }
            ]
            const myChart: any = that.getMyChart('column','Most Purchased Kit','Kit Name','Order & Sales',xData,yData);
            myChart.tooltip = {
              pointFormatter: function() {
                var point = this;
                return '<span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': <b> $' + point.y  + '</b><br/>';
              }
            }
            this.loadChartData(myChart);
          }
        } else if (this.selectedReportType === 'ORDERS_REFUNDED') {
          if(this.selectedTimeUnit === 'MONTH_WISE') {
            let xData : any[] = res.data.map((obj: any)=>obj.month_year);
            let yData : any[] = [
              {
              name : 'Orders',
              data : res.data.map((obj: any)=>obj.orders)
              }
            ]
            const myChart: any =  that.getMyChart('column','MonthWise Refunded Orders','Month-Year','Orders',xData,yData);
            myChart.tooltip = {
              pointFormatter: function() {
                var point = this;
                return '<span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': <b>' + point.y  + '</b><br/>';
              }
            }
            this.loadChartData(myChart);
          } else {
            let xData : any[] = res.chartData.map((obj: any)=>obj.order_date);
            let yData : any[] = [
              {
              name : 'Orders',
              data : res.chartData.map((obj: any)=>obj.orders)
              }
            ]
            const myChart: any =  that.getMyChart('column','Refunded Orders','Order Date','Orders',xData,yData);
            myChart.tooltip = {
              pointFormatter: function() {
                var point = this;
                return '<span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': <b>' + point.y  + '</b><br/>';
              }
            }
            this.loadChartData(myChart);
          }
        }
        else {
            let xData : any[] = res.chartData.map((obj: any)=>obj.name);
            let yData : any[] = [
              {
                name : 'Orders',
                data : res.chartData.map((obj: any)=>obj.user_orders)
              },
              {
                name : 'Sales ($)',
                data : res.chartData.map((obj: any)=>+obj.user_sales)
              }
            ]
            const myChart: any =  that.getMyChart('line','User Wise Order Placed And Sales','Month-Year','Sales',xData,yData);
            myChart.tooltip = {
              shared: true,
              crosshairs: true,
              pointFormatter: function() {
                var point = this;
                return '<span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': <b>' + point.y  + '</b><br/>';
              }
            }
            this.loadChartData(myChart);
        }
    },(err:any)=>{
      this.blockReportLoader.stop();
      this.toastr.showError('Error Loading Data');
    });
  }

  pageChanged(event: any){
    this.config.currentPage = event;
    this.getReport();
  }


  public onReportTypeChanged(reportType:string){
     let selectedObj = this.reportConfig.find((obj: any)=>obj.reportType==reportType);
     this.availableTimeUnits = selectedObj.allowedTimeUnit;
     this.config.currentPage = 1;
  }
}
