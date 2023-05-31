import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsOfKeywordComponent } from './news-of-keyword.component';

describe('NewsOfKeywordComponent', () => {
  let component: NewsOfKeywordComponent;
  let fixture: ComponentFixture<NewsOfKeywordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsOfKeywordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsOfKeywordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
