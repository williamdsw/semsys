import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportDetailsModalComponent } from './report-details-modal.component';

describe('DetailsModalComponent', () => {
  let component: ReportDetailsModalComponent;
  let fixture: ComponentFixture<ReportDetailsModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDetailsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
