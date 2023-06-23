import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopListingSubscriptionPaymentHistoryComponent } from './top-listing-subscription-payment-history.component';

describe('TopListingSubscriptionPaymentHistoryComponent', () => {
  let component: TopListingSubscriptionPaymentHistoryComponent;
  let fixture: ComponentFixture<TopListingSubscriptionPaymentHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopListingSubscriptionPaymentHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopListingSubscriptionPaymentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
