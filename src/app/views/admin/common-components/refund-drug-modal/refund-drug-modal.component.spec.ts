import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundDrugModalComponent } from './refund-drug-modal.component';

describe('RefundDrugModalComponent', () => {
  let component: RefundDrugModalComponent;
  let fixture: ComponentFixture<RefundDrugModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefundDrugModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundDrugModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
