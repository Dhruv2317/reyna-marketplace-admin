import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterTemplatesListComponent } from './newsletter-templates-list.component';

describe('NewsletterTemplatesListComponent', () => {
  let component: NewsletterTemplatesListComponent;
  let fixture: ComponentFixture<NewsletterTemplatesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsletterTemplatesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterTemplatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
