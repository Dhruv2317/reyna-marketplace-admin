import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPaymentHistoryComponent } from './subscription-payment-history.component';

describe('SubscriptionPaymentHistoryComponent', () => {
  let component: SubscriptionPaymentHistoryComponent;
  let fixture: ComponentFixture<SubscriptionPaymentHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionPaymentHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionPaymentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
