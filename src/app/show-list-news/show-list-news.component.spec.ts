import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowListNewsComponent } from './show-list-news.component';

describe('ShowListNewsComponent', () => {
  let component: ShowListNewsComponent;
  let fixture: ComponentFixture<ShowListNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowListNewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowListNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
