import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterTemplatesEditorComponent } from './newsletter-templates-editor.component';

describe('NewsletterTemplatesEditorComponent', () => {
  let component: NewsletterTemplatesEditorComponent;
  let fixture: ComponentFixture<NewsletterTemplatesEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsletterTemplatesEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterTemplatesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
