import { Component, OnInit } from '@angular/core';
import * as Chartist from "chartist";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {HelperService} from "../_helpers/helper.service";
import {AccountService} from "../_services";
import jwtDecode from "jwt-decode";
import {User} from "../_models";
import {NewtDTO} from "../_models/newDTO";
import {ResponseTotalKind} from "../_models/ResponseTotalKind";
declare var $: any;
@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
  listConvertKeyWord={"1":"Đại Học FPT",
    "2":"FPT University",
    "3":"Trường Đại Học FPT",
    "4":"Trường FPT",
    "5":"Sinh Viên FPT",
    "6":"Students in FPT",
    "7":"Education in FPT University",
    "8":"Technology in FPT University",
    "9":"IT in FPT University",
    "10":"Computer in FPT University",
    "11":"Engineering in FPT University",
    "12":"Programming in FPT University",
    "13":"Software in FPT University",
    "14":"Innovation in FPT University",
    "15":"Campus in FPT University",
    "16":"Study in FPT University",
    "17":"Degree in FPT University",
    "18":"Learning in FPT University",
    "19":"Career in FPT University",
    "20":"Networking in FPT University",
    "21":"Internship in FPT University",
    "22":"Research in FPT University",
    "23":"Skills in FPT University",
    "24":"Academics in FPT University",
    "25":"Students in FPT University",
    "26":"Alumni in FPT University",
    "27":"Industry in FPT University",
    "28":"Partnership in FPT University",
    "29":"Global in FPT University",
    "30":"Opportunities in FPT University",
    "31":"Entrepreneurship in FPT University",
    "32":"Collaboration in FPT University",
    "33":"Projects in FPT University",
    "34":"Digital in FPT University",
    "35":"Development in FPT University",
    "36":"Học phí đại học FPT",
    "37":"Giáo viên đại học FPT",
    "38":"Phòng trọ Đại học FPT",
    "39":"Kí túc xá đại học FPT",
    "40":"Drama đại học FPT",
    "41":"Câu lạc bộ Đại học FPT",
    "42":"Thư viện đại học FPT",
    "43":"Chỗ để xe đại học FPT",
    "44":"Xe bus đại học FPT",
    "45":"Tình nguyện viên đại học FPT",
    "46":"Sự kiện đại học FPT",
    "47":"Vấn đề của sinh viên",
    "48":"Tuyển sinh đại học FPT",
    "49":"Quốc phòng của sinh viên FPT",
    "50":"Thực tập của sinh viên FPT",
    "51":"Coursera của đại học FPT"};
  username:string;
  user:User;
  listKeyWord: string[] ;
  listCount : any[];
  listCount2 : any[];

  constructor(private http: HttpClient,private helperService: HelperService, private accountService:AccountService) { }
  startAnimationForLineChart(chart){
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function(data) {
      if(data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if(data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };
  startAnimationForBarChart(chart){
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function(data) {
      if(data.type === 'bar'){
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };

  ngOnInit() {
    this.getUserName();
    this.getUser();
  }
  genChart(){
    // var datawebsiteViewsChart = {
    //   labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    //   series: [
    //     [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]
    //
    //   ]
    // };
    var datawebsiteViewsChart = {
      labels:this.listCount.map(x=>{
        return String(x.keyword);
      }),
      series: [
        this.listCount.map(x=>{
          return Number(x.count);
        })
      ]
    };
    var optionswebsiteViewsChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 1000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
    };
    var responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);
  }
  genDailyChart(){
    const dataDailySalesChart: any = {
      labels:this.listCount2.map(x=>{
        return String(x.keyword);
      }),
      series: [
        this.listCount2.map(x=>{
          return Number(x.count);
        })
      ]
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 800, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
    }

    var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);
  }
  public getUserName(){
    let token = jwtDecode<any>(localStorage.getItem("user"));
    this.username = token.sub;
    console.log(this.username = token.sub);
  }
  public getUser(){
    this.accountService.getByUsername(this.username).subscribe((res: User)=>{
          this.user = res;
          if(this.user.listKeyWord ===null){
            this.user.listKeyWord =[];
          }
          if(this.user.listNewSave ===null){
            this.user.listNewSave =[];
          }
          this.listKeyWord=this.user.listKeyWord;
          if(this.user.listNewSave){
            // this.dataSource = new MatTableDataSource(this.user.listKeyWord);
            // this.dataSource.paginator = this.paginator;
          }
          if(this.user.listKeyWord.length >0){
            this.getAllCountOfKind();
            this.getAllCountOfKind2();
          }else{
            this.showNotification2(4,"Bạn phải thêm keyWord để thống kê",'top','right');
          }
        },(error: HttpErrorResponse)=>{
          alert(error.message);
        }
    );
  }
  public getAllCountOfKind(): void{
    this.helperService.findTotalNewInKeyWord(this.user.listKeyWord,"new","").subscribe((res: ResponseTotalKind[])=>{
          this.listCount = res;
          if(this.listCount.length>0){
            this.genChart();
          }else{
            this.showNotification2(4,"Không tìm thấy số lượng bài viết để thông kê vui lòng xem lại","top","right")
          }
        },(error: HttpErrorResponse)=>{
          alert(error.message);
        }
    );
  }
  public getAllCountOfKind2(): void{
    this.helperService.findTotalNewInKeyWord(this.user.listKeyWord,"facebook","").subscribe((res: ResponseTotalKind[])=>{
          this.listCount2 = res;
          if(this.listCount2.length>0){
            this.genDailyChart();
          }else{
            this.showNotification2(4,"Không tìm thấy số lượng bài viết để thông kê vui lòng xem lại","top","right")
          }
        },(error: HttpErrorResponse)=>{
          alert(error.message);
        }
    );
  }
  convertKeyWord(keyword:string){
    return this.listConvertKeyWord[`${keyword}`];

  }
  showNotification2(kind,mess,from, align){
    const type = ['','info','success','warning','danger'];

    // const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      icon: "notifications",
      message: mess,

    },{
      type: type[kind],
      timer: 4000,
      placement: {
        from: from,
        align: align
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
    });
  }

}
