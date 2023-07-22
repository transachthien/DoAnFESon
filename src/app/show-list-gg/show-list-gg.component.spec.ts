import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowListGgComponent } from './show-list-gg.component';

describe('ShowListGgComponent', () => {
  let component: ShowListGgComponent;
  let fixture: ComponentFixture<ShowListGgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowListGgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowListGgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
