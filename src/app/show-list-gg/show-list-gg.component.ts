import { Component, OnInit } from '@angular/core';
import {NotifierService} from "angular-notifier";
import {NewtDTO} from "../_models/newDTO";
import {FormControl} from "@angular/forms";
import {User} from "../_models";
import {HelperService} from "../_helpers/helper.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AccountService} from "../_services";
import jwtDecode from "jwt-decode";

declare var $: any;
@Component({
  selector: 'app-show-list-gg',
  templateUrl: './show-list-gg.component.html',
  styleUrls: ['./show-list-gg.component.scss']
})
export class ShowListGgComponent implements OnInit {
  private notifier: NotifierService;
  public productList :  NewtDTO[] = [];
  public filterCategory :  NewtDTO[] = [];
  searchKey:string ="";
  currentIndex = -1;
  title = '';
  keyWordSelect = new FormControl([]);
  keyKind = new FormControl([]);
  listKeyWord: string[] ;
  listKind: string[] = ['POS'];
  username:string;
  user:User;

  page = 1;
  count = 0;
  pageSize = 6;
  pageSizes = [3, 6, 9];
  selectedKindCluster = '0';
  constructor(private helperService: HelperService, private http :HttpClient, private accountService:AccountService,
              notifier: NotifierService){
    this.notifier = notifier;
  }
  ngOnInit(): void {
    // this.cartService.search.subscribe((val:any)=>{
    //   this.searchKey = val;
    // })
    this.getUserName();
    this.getUser();
  }
  public getAllProduct(): void{
    this.helperService.getAllProduct(this.user.listKeyWord,"new",this.selectedKindCluster,this.page).subscribe((res: NewtDTO[])=>{
          this.productList = res;
          this.filterCategory = res;
        },(error: HttpErrorResponse)=>{
          alert(error.message);
        }
    );
  }
  public addtocart(item: any){
    // this.cartService.addtoCart(item);
    if(this.user.listNewSave === null){
      this.user.listNewSave.push(item.id);
      this.updateUser();
      this.showNotification2(2,"Lưu bài viết thành công",'top','right');
    }else{
      if(!this.user.listNewSave.includes(item.id)){
        this.user.listNewSave.push(item.id);
        this.updateUser();
        this.showNotification2(2,"Lưu bài viết thành công",'top','right');
      }else{
        this.showNotification2(4,"Đã lưu bài viết không lưu lại",'top','right');

      }
    }
  }
  //show Notification
  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }
  public filter(category:string){
    this.filterCategory = this.productList
        .filter((a:any)=>{
          if(a.category == category || category==''){
            return a;
          }
        })
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
          this.getAllProduct();
          this.getTotal();
          // this.getAllListKeyWord();
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
  public updateUser(){
    this.accountService.updateUser(this.user).subscribe((res: User)=>{
          this.user = res;
          this.keyWordSelect.setValue(this.user.listKeyWord);
        },(error: HttpErrorResponse)=>{
          alert(error.message);
        }
    );
  }

  onScroll(ev: any):void {
    console.log('scrolled!!');
    this.helperService
        .getAllProduct(this.user.listKeyWord,"new",this.selectedKindCluster,++this.page)
        .subscribe((cats: NewtDTO[]) => {
          this.productList.push(...cats);
        });
  }
  handlePageChange(event: number): void {
    this.page = event;
    this.getAllProduct();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getAllProduct();
  }
  public getTotal(): void{
    this.helperService.getTotalProduct(this.user.listKeyWord,"new", this.selectedKindCluster).subscribe((res: number)=>{
          this.count = res;
        },(error: HttpErrorResponse)=>{
          alert(error.message);
        }
    );
  }
  public addMoreKeyWord():void{
    const diff =this.keyWordSelect.value.filter(x => !this.user.listKeyWord.includes(x))
        .concat(this.user.listKeyWord.filter(x => !this.keyWordSelect.value.includes(x)));
    if(diff.length>0){
      this.updateUser();
    }
    return;
  }
  public getAllListKeyWord(){
    this.http.get<string[]>('./assets/img/list_key_word.json')
        .subscribe((data: any) => {
          //Is important
          this.listKeyWord = data;
        });
  }

  // refreshList(): void {
  //   this.getAllProduct();
  //   this.currentTutorial = {};
  //   this.currentIndex = -1;
  // }
  //
  // setActiveTutorial(tutorial: Tutorial, index: number): void {
  //   this.currentTutorial = tutorial;
  //   this.currentIndex = index;
  // }

  // removeAllTutorials(): void {
  //   this.tutorialService.deleteAll()
  //       .subscribe({
  //         next: res => {
  //           console.log(res);
  //           this.refreshList();
  //         },
  //         error: err => {
  //           console.log(err);
  //         }
  //       });
  //
  // }

  searchTitle(): void {
    this.page = 1;
    this.getAllProduct();
  }

  onSelected(value: string) {
    this.selectedKindCluster = value;
    this.page = 1;
    this.getAllProduct();
    this.getTotal();

  }
}
