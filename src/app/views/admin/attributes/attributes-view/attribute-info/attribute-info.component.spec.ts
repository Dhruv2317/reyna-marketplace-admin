import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AttributeInfoComponent } from './attribute-info.component';
describe('AttributeInfoComponent', () => {
  let component: AttributeInfoComponent;
  let fixture: ComponentFixture<AttributeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
