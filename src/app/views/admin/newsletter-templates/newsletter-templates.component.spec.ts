import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterTemplatesComponent } from './newsletter-templates.component';

describe('NewsletterTemplatesComponent', () => {
  let component: NewsletterTemplatesComponent;
  let fixture: ComponentFixture<NewsletterTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsletterTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
