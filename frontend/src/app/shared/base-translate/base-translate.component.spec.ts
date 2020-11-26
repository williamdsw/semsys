import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTranslateComponent } from './base-translate.component';

describe('BaseTranslateComponent', () => {
  let component: BaseTranslateComponent;
  let fixture: ComponentFixture<BaseTranslateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseTranslateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseTranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
