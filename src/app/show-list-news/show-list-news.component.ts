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
  constructor(private helperService: HelperService){}
  ngOnInit(): void {
    // this.cartService.search.subscribe((val:any)=>{
    //   this.searchKey = val;
    // })
    this.getAllProduct()
    console.log()
  }
  public getAllProduct(): void{
    this.helperService.getAllProduct("","").subscribe((res: NewtDTO[])=>{
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

}
