import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSequenceComponent } from './change-sequence.component';

describe('ChangeSequenceComponent', () => {
  let component: ChangeSequenceComponent;
  let fixture: ComponentFixture<ChangeSequenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeSequenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
