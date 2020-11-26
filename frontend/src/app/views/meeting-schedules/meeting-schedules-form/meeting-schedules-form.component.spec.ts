import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingSchedulesFormComponent } from './meeting-schedules-form.component';

describe('MeetingSchedulesFormComponent', () => {
  let component: MeetingSchedulesFormComponent;
  let fixture: ComponentFixture<MeetingSchedulesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingSchedulesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingSchedulesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
