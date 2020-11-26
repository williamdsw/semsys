import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SchoolClassesFormComponent } from './school-classes-form.component';

describe('SchoolClassesFormComponent', () => {
  let component: SchoolClassesFormComponent;
  let fixture: ComponentFixture<SchoolClassesFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolClassesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolClassesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
