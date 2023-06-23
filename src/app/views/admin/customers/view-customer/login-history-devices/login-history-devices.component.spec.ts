import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginHistoryDevicesComponent } from './login-history-devices.component';

describe('LoginHistoryDevicesComponent', () => {
  let component: LoginHistoryDevicesComponent;
  let fixture: ComponentFixture<LoginHistoryDevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginHistoryDevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginHistoryDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
