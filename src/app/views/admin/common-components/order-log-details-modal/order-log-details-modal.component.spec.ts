import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderLogDetailsModalComponent } from './order-log-details-modal.component';

describe('OrderLogDetailsModalComponent', () => {
  let component: OrderLogDetailsModalComponent;
  let fixture: ComponentFixture<OrderLogDetailsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderLogDetailsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderLogDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
