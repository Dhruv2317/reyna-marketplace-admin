import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextEditorModalComponent } from './text-editor-modal.component';

describe('TextEditorModalComponent', () => {
  let component: TextEditorModalComponent;
  let fixture: ComponentFixture<TextEditorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextEditorModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextEditorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
