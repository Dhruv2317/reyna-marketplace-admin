import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessRefundModalComponent } from './process-refund-modal.component';

describe('ProcessRefundModalComponent', () => {
  let component: ProcessRefundModalComponent;
  let fixture: ComponentFixture<ProcessRefundModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessRefundModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessRefundModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
