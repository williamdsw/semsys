import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ValidationsModalComponent } from './validations-modal.component';

describe('ValidationsModalComponent', () => {
  let component: ValidationsModalComponent;
  let fixture: ComponentFixture<ValidationsModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
