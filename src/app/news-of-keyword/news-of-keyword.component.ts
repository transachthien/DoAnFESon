import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf, JsonPipe} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-news-of-keyword',
  templateUrl: './news-of-keyword.component.html',
  styleUrls: ['./news-of-keyword.component.scss'],
})

export class NewsOfKeywordComponent implements OnInit {
  listKeyWord :string []=[];
  selected ='';
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  

  constructor(private http :HttpClient) { }

  ngOnInit(): void {
    this.getAllListKeyWord();
  }
  public getAllListKeyWord(){
    this.http.get<string[]>('./assets/img/list_key_word.json')
      .subscribe((data: any) => {
        //Is important
        this.listKeyWord = data;
      });
  }

}
