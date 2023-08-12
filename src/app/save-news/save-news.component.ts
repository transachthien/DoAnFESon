import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger} from '@angular/animations';
import jwtDecode from "jwt-decode";
import {User} from "../_models";
import {HelperService} from "../_helpers/helper.service";
import {AccountService} from "../_services";
import {FormControl} from "@angular/forms";
import {NewtDTO} from "../_models/newDTO";

declare var $: any;
@Component({
  selector: 'app-save-news',
  templateUrl: './save-news.component.html',
  styleUrls: ['./save-news.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SaveNewsComponent implements OnInit,AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  // MatPaginator Output
  pageEvent: PageEvent;
  pageSize = 5;
  pageSizeOptions: number[] = [3, 5, 7,10];
  listKeyWord: string[] ;
  username:string;
  user:User;
  keyWordSelect = new FormControl([]);

  displayedColumns: string[] = ['index','Flag','Name','Area', 'Population','actions',]; //'Area', 'Population', 'Name',
  dataSource: MatTableDataSource<NewtDTO> = new MatTableDataSource();
  listNewSave: NewtDTO[];
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
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient,private helperService: HelperService, private accountService:AccountService) { }

  ngOnInit(): void {
    // this.getAllListKeyWord();
    this.getUserName();
    this.getUser();
    // this.http.get<Country[]>('./assets/img/test.json')
    //   .subscribe((data: any) => {
    //     //Is important
    //     this.dataSource = new MatTableDataSource(data);
    //     this.dataSource.paginator = this.paginator;
    //   });
  }

  ngAfterViewInit(): void {

    this.dataSource.sort = this.sort;
  }

  filterCountries(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = value.trim().toLocaleLowerCase();
    // const filterValue = value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  onMatSortChange() {
    this.dataSource.sort = this.sort;
  }
  convertKeyWord(keyword:string){
    return this.listConvertKeyWord[`${keyword}`];

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
          this.keyWordSelect.setValue(this.user.listKeyWord);
          if(this.user.listNewSave){
            // this.dataSource = new MatTableDataSource(this.user.listKeyWord);
            // this.dataSource.paginator = this.paginator;
            this.getAllListNewSave();
          }
        },(error: HttpErrorResponse)=>{
          alert(error.message);
        }
    );
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
  public addMoreKeyWord():void{
    const diff =this.keyWordSelect.value.filter(x => !this.user.listKeyWord.includes(x))
        .concat(this.user.listKeyWord.filter(x => !this.keyWordSelect.value.includes(x)));
    if(diff.length>0){
      this.user.listKeyWord = this.keyWordSelect.value;
      // this.dataSource = new MatTableDataSource(this.user.listKeyWord);
      // this.dataSource.paginator = this.paginator;
      this.updateUser();
      this.showNotification2(2,"Update thành công!!!",'top','right');
    }
    else{
      this.showNotification2(3,"Mời chọn thêm keyword!!!",'top','right');
    }
  }
  public updateUser(){
    this.accountService.updateUser(this.user).subscribe((res: User)=>{
          this.user = res;
          this.keyWordSelect.setValue(this.user.listKeyWord);
        },(error: HttpErrorResponse)=>{
          alert(error.message);
        }
    );
  }
  // public getAllListKeyWord(){
  //   this.http.get<string[]>('./assets/img/list_key_word.json')
  //       .subscribe((data: string[]) => {
  //         // //Is important
  //         this.listKeyWord = data;
  //         this.dataSource = new MatTableDataSource(data);
  //         this.dataSource.paginator = this.paginator;
  //       });
  // }

  onDelete(row: NewtDTO) {
    this.user.listNewSave = this.user.listNewSave.filter(x=>{
      return x !== row.id;
    })
    this.dataSource.data = this.dataSource.data.filter(x=>{
      return x.id !== row.id;
    });
    this.updateUser();
    this.showNotification2(2,"Xóa bài viết thành công",'top','right');
  }
  public getAllListNewSave(): void{
    this.helperService.getAllListNewSave(this.user.listNewSave).subscribe((res: any)=>{
          // this.count = rest
      this.listNewSave = res;
      this.dataSource = new MatTableDataSource(this.listNewSave);
      this.dataSource.paginator = this.paginator;
        },(error: HttpErrorResponse)=>{
          alert(error.message);
        }
    );
  }
}
