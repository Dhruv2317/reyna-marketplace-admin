import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsNavbarComponent } from './reports-navbar.component';

describe('ReportsNavbarComponent', () => {
  let component: ReportsNavbarComponent;
  let fixture: ComponentFixture<ReportsNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
