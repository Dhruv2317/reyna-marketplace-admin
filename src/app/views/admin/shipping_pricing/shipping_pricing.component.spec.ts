import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingPricingComponent } from './shipping_pricing.component';

describe('ShippingPricingComponent', () => {
  let component: ShippingPricingComponent;
  let fixture: ComponentFixture<ShippingPricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingPricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
