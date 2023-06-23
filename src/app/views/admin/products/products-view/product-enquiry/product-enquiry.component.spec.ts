import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEnquiryComponent } from './product-enquiry.component';

describe('ProductEnquiryComponent', () => {
  let component: ProductEnquiryComponent;
  let fixture: ComponentFixture<ProductEnquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductEnquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
