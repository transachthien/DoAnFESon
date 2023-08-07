import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveNewsComponent } from './save-news.component';

describe('SaveNewsComponent', () => {
  let component: SaveNewsComponent;
  let fixture: ComponentFixture<SaveNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveNewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
