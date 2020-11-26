import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BaseTranslateComponent } from './base-translate.component';

describe('BaseTranslateComponent', () => {
  let component: BaseTranslateComponent;
  let fixture: ComponentFixture<BaseTranslateComponent>;

  beforeEach(waitForAsync(() => {
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
