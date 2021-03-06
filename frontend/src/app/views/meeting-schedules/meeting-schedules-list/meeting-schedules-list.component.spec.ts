import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MeetingSchedulesListComponent } from './meeting-schedules-list.component';

describe('MeetingSchedulesListComponent', () => {
  let component: MeetingSchedulesListComponent;
  let fixture: ComponentFixture<MeetingSchedulesListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingSchedulesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingSchedulesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
