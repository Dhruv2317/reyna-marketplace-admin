import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockUiLoaderComponent } from './block-ui-loader.component';

describe('BlockUiLoaderComponent', () => {
  let component: BlockUiLoaderComponent;
  let fixture: ComponentFixture<BlockUiLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockUiLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockUiLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
