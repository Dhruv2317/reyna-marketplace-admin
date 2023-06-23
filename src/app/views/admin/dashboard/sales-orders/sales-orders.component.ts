import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as Highcharts from "highcharts";

import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-orders',
  templateUrl: './sales-orders.component.html',
  styleUrls: ['./sales-orders.component.scss']
})
export class SalesOrdersComponent implements OnInit, AfterViewInit {

  public counts: any = {};
  public detstats: any;
  public AgeData: any[] = [];
  public UserOsData: any[] = [];
  public UserBrowserData: any[] = [];
  public UserDeviceTypeData: any[] = [];
  public UserExperienceLevelData:any[]=[];

  chart:any;
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor: string = 'chart';
  chartOptionsline: Highcharts.Options = {};
  chartOptionsUserOs: Highcharts.Options = {};
  chartOptionsUserBrowser: Highcharts.Options = {};
  chartOptionsDeviceType: Highcharts.Options = {};
  chartOptionsUserExperienceLevel: Highcharts.Options = {};

  chartCallback:any;
  updateFlag = false;
  oneToOneFlag = true;

  constructor(private http: HttpClient, private router: Router) {
    const self = this;

    this.chartCallback = (chart:any) => {
      self.chart = chart;
    };
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getDashbordStats();
    this.getDashborddetStats();
    this.getDashborddetStatsline();
  }


  public loadChartData(chartOptions: any, whichChart: string) {
    const self = this,
      chart = this.chart;

      if (whichChart == 'OsPie') {
      self.chartOptionsUserOs = chartOptions;
    } else if (whichChart == 'BrowserPie') {
      self.chartOptionsUserBrowser = chartOptions;
    } 
    else if (whichChart == 'ExperienceLevelPie') {
      self.chartOptionsUserExperienceLevel = chartOptions;
    } 
    else if (whichChart == 'DeviceTypePie') {
      self.chartOptionsDeviceType = chartOptions;
    } else {
      self.chartOptionsline = chartOptions;
    }

    self.updateFlag = true;
  }


  public getMyChartbar(ChartType: string, ChartTitle: string = '', XTitle: string, YTitle: string, XData: any[], YData: any[]) {
    let chartOptions;
    if (ChartType === 'column') {
      chartOptions = {
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
        credits: {
          enabled: false
        },
        exporting: {
          enabled: true
        }
      };
    } else if (ChartType === 'line') {
      chartOptions = {
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
        labels: {
          items: [{
            html: 'Total sales',
            style: {
              left: '50px',
              top: '18px',
              color:'black'
            }
          }]
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
        series: YData,
        credits: {
          enabled: false
        },
        exporting: {
          enabled: true
        }
      };
    } else if (ChartType === 'bar') {
      chartOptions = {
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
          backgroundColor:'#FFFFFF',
          shadow: true
        },
        credits: {
          enabled: false
        },
        series: YData,
        exporting: {
          enabled: true
        }
      };
    }
    return chartOptions;
  }


  public getMyChart(ChartTitle: string = '', series: any[]) {
    let chartOptions;
    chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: ChartTitle
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: ChartTitle == 'Age Wise Patients Group' ? '<b>{point.name}</b> Years: {point.y}' : '<b>{point.name}</b>: {point.y}'
          },
          showInLegend: true
        }
      },
      credits: {
        enabled: false
      },
      series: series
    };
    return chartOptions;
  }

  getDashbordStats() {
    const url = 'api/admin/reports/counts';
    this.http.get(url).subscribe((res: any) => {
        this.counts = res;
        console.log('counts=',res);
      }, (err:any) => {

      })
  }

  getDashborddetStats() {
    const url = 'api/admin/reports/statistics';
    this.http.get(url)
      .subscribe((res: any) => {
        console.log('detstats=',res);
        this.detstats = res;
        
        res.user_device_details.group_by_os.filter((obj:any) => {
          this.UserOsData.push({
            name: obj.os,
            showInLegend: true,
            y: obj.users
          })
        })
        let userOsChartoptions = this.getMyChart('Operating System Used By Users', [{
          name: 'Users',
          colorByPoint: true,
          data: this.UserOsData
        }]);
        this.loadChartData(userOsChartoptions, 'OsPie');
        res.user_experience_level.filter((itm:any)=>{
            this.UserExperienceLevelData.push({
               name:itm.value,
               showInLegend: true,
               y:itm.count
            });
        });
        let userExperienceChangeOptions = this.getMyChart('Users By Experience Level',[{
          name:'Users',
          colorByPoint:true,
          data:this.UserExperienceLevelData
        }]);
        this.loadChartData(userExperienceChangeOptions, 'ExperienceLevelPie');
        res.user_device_details.group_by_browser.filter((obj:any) => {
          this.UserBrowserData.push({
            name: obj.browser_name,
            y: obj.users
          })
        });
        let userBrowserChartoptions = this.getMyChart('Browser Used By Users', [{
          name: 'Users',
          colorByPoint: true,
          data: this.UserBrowserData
        }]);
        this.loadChartData(userBrowserChartoptions, 'BrowserPie');


        res.user_device_details.group_by_device_type.filter((obj:any) => {
          this.UserDeviceTypeData.push({
            name: obj.device_type.charAt(0).toUpperCase() + obj.device_type.slice(1),
            y: obj.users
          })
        });

        let userDeviceTypeChartOptions = this.getMyChart('Device Used By Users', [{
          name: 'Users',
          colorByPoint: true,
          data: this.UserDeviceTypeData
        }]);

        this.loadChartData(userDeviceTypeChartOptions, 'DeviceTypePie');
      }, (err:any) => {

      });
  }

  getDashborddetStatsline() {
    const url = 'api/admin/reports/getMixChartData?reportType=MIX_CHART&timeUnit=LAST_30_DAYS';
    this.http.get(url)
      .subscribe((res: any) => {

        let xData = res.xData;
        let yData = [
          ...res.yData,
          , {
            type: 'pie',
            name: 'Total sales',
            data: [{
              name: 'Orders',
              y: res.orderSales,
              color: 'blue'
            },
            {
              name: 'Top Listing Subscription',
              y: res.topListingSales,
              color: 'green'
            },
            {
              name: 'Dealer Account Subscription',
              y: res.dealerAccountSales,
              color: 'orange'
            }],
            center: [100, 80],
            size: 100,
            showInLegend: false,
            dataLabels: {
              enabled: false
            }
          }
        ]

        var myChart:any = this.getMyChartbar('line', 'Datewise Order Placed And Sales', 'Date', 'Sales', xData, yData);
        myChart.tooltip = {
          shared: true,
          crosshairs: true,
          pointFormatter: function () {
            var point = this;
            return '<span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': <b>' + point.y + '</b><br/>';
          }
        }
        this.loadChartData(myChart, 'line');
      }, (err:any) => {

      });
  }


}
