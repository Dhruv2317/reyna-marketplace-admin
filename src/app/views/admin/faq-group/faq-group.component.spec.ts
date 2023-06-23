import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FAQGroupComponent } from './faq-group.component';

describe('FAQGroupComponent', () => {
  let component: FAQGroupComponent;
  let fixture: ComponentFixture<FAQGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FAQGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FAQGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
