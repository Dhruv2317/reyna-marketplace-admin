import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingInsuranceComponent } from './shipping_insurance.component';

describe('ShippingInsuranceComponent', () => {
  let component: ShippingInsuranceComponent;
  let fixture: ComponentFixture<ShippingInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
