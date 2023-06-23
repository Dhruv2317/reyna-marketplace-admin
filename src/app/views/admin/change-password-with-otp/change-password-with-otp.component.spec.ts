import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordWithOtpComponent } from './change-password-with-otp.component';

describe('ChangePasswordWithOtpComponent', () => {
  let component: ChangePasswordWithOtpComponent;
  let fixture: ComponentFixture<ChangePasswordWithOtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordWithOtpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordWithOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
