import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterTemplatePreviewComponent } from './newsletter-template-preview.component';

describe('NewsletterTemplatePreviewComponent', () => {
  let component: NewsletterTemplatePreviewComponent;
  let fixture: ComponentFixture<NewsletterTemplatePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsletterTemplatePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterTemplatePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
