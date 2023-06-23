import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundProcessedOrdersComponent } from './refund-processed-orders.component';

describe('RefundProcessedOrdersComponent', () => {
  let component: RefundProcessedOrdersComponent;
  let fixture: ComponentFixture<RefundProcessedOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundProcessedOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundProcessedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
