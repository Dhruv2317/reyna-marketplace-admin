import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {  AttributeValuesComponent } from './attribute-values.component';

describe(' AttributeValuesComponent', () => {
  let component:  AttributeValuesComponent;
  let fixture: ComponentFixture< AttributeValuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  AttributeValuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent( AttributeValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
