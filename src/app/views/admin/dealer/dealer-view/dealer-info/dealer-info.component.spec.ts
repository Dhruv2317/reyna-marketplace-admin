import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerInfoComponent } from './dealer-info.component';

describe('DealerInfoComponent', () => {
  let component: DealerInfoComponent;
  let fixture: ComponentFixture<DealerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
