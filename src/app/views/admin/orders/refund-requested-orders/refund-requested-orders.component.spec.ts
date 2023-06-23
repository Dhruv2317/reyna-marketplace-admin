import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundRequestedOrdersComponent } from './refund-requested-orders.component';

describe('RefundRequestedOrdersComponent', () => {
  let component: RefundRequestedOrdersComponent;
  let fixture: ComponentFixture<RefundRequestedOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundRequestedOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundRequestedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
