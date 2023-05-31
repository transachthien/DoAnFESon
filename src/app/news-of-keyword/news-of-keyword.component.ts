import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';


interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-news-of-keyword',
  templateUrl: './news-of-keyword.component.html',
  styleUrls: ['./news-of-keyword.component.scss'],
})

export class NewsOfKeywordComponent implements OnInit {
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
