import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSubcategoryModalComponent } from './select-subcategory-modal.component';

describe('SelectSubcategoryModalComponent', () => {
  let component: SelectSubcategoryModalComponent;
  let fixture: ComponentFixture<SelectSubcategoryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSubcategoryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSubcategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
