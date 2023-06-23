import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCategoryInfoComponent } from './article-category-info.component';

describe('ArticleCategoryInfoComponent', () => {
  let component: ArticleCategoryInfoComponent;
  let fixture: ComponentFixture<ArticleCategoryInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleCategoryInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCategoryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
