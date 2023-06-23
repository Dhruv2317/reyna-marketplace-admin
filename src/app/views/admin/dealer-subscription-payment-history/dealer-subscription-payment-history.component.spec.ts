import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerSubscriptionPaymentHistoryComponent } from './dealer-subscription-payment-history.component';

describe('DealerSubscriptionPaymentHistoryComponent', () => {
  let component: DealerSubscriptionPaymentHistoryComponent;
  let fixture: ComponentFixture<DealerSubscriptionPaymentHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerSubscriptionPaymentHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerSubscriptionPaymentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
