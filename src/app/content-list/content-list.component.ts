import { AfterViewInit, Component, OnInit,ViewChild } from '@angular/core';
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

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}
declare var $: any;
@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ContentListComponent implements OnInit,AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  // MatPaginator Output
  pageEvent: PageEvent;
  pageSize = 5;
  pageSizeOptions: number[] = [3, 5, 7,10];
  countries: Country[] = [];
  listKeyWord: string[] ;
  username:string;
  user:User;
  keyWordSelect = new FormControl([]);

  displayedColumns: string[] = ['index','Flag', 'Name', 'Area', 'Population','actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource()
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient,private helperService: HelperService, private accountService:AccountService) { }

  ngOnInit(): void {
    this.getAllListKeyWord();
    this.getUserName();
    this.getUser();
    this.http.get<Country[]>('./assets/img/test.json')
      .subscribe((data: any) => {
        //Is important
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
  }

  ngAfterViewInit(): void {

    this.dataSource.sort = this.sort;
  }

  filterCountries(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    const filterValue = value;
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
          this.keyWordSelect.setValue(this.user.listKeyWord);
          // if(){
          //   this.dataSource = new MatTableDataSource(this.user.listKeyWord);
          //   this.dataSource.paginator = this.paginator;
          // }
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
  public getAllListKeyWord(){
    this.http.get<string[]>('./assets/img/list_key_word.json')
        .subscribe((data: string[]) => {
          //Is important
          this.listKeyWord = data;
        });
  }

}
