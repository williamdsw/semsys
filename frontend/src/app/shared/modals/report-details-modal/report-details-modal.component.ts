import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ReportDetails } from 'src/app/models/report-detail';

@Component({
  selector: 'app-details-modal',
  templateUrl: './report-details-modal.component.html',
})
export class ReportDetailsModalComponent implements OnInit {

  @Input() public employeeName: string;
  @Input() public studentName: string;
  @Input() public title: string;
  @Input() public content: string;
  @Input() public emission: Date;
  @Input() public scheduleDate: Date;

  constructor(public modalRef: BsModalRef) { }

  ngOnInit(): void {}

  public onClose(): void {
    this.modalRef.hide ();
  }
}
