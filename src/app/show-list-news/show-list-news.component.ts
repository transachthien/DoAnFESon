import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HelperService } from 'app/_helpers/helper.service';
import { NewtDTO } from 'app/_models/newDTO';

@Component({
  selector: 'app-show-list-news',
  templateUrl: './show-list-news.component.html',
  styleUrls: ['./show-list-news.component.scss']
})
export class ShowListNewsComponent implements OnInit {

  public productList :  NewtDTO[] = [];
  public filterCategory :  NewtDTO[] = [];
  searchKey:string ="";
  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 4;
  pageSizes = [3, 6, 9];
  constructor(private helperService: HelperService){}
  ngOnInit(): void {
    // this.cartService.search.subscribe((val:any)=>{
    //   this.searchKey = val;
    // })
    this.getAllProduct()
  }
  public getAllProduct(): void{
    this.helperService.getAllProduct("","",this.page).subscribe((res: NewtDTO[])=>{
      this.productList = res;
      this.filterCategory = res;
    },(error: HttpErrorResponse)=>{
      alert(error.message);
    }
    );
  }
  public addtocart(item: any){
    // this.cartService.addtoCart(item);
  }
  public filter(category:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if(a.category == category || category==''){
        return a;
      }
    })
  }

  onScroll(ev: any):void {
    console.log('scrolled!!');
    this.helperService
        .getAllProduct("","",++this.page)
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
}
