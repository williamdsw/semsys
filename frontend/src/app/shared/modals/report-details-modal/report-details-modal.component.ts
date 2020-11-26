import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-details-modal',
  templateUrl: './report-details-modal.component.html',
})
export class ReportDetailsModalComponent implements OnInit {

  // FIELDS

  @Input() public employeeName: string;
  @Input() public studentName: string;
  @Input() public title: string;
  @Input() public content: string;
  @Input() public emission: Date;
  @Input() public scheduleDate: Date;

  // CONSTRUCTOR

  constructor(public modalRef: BsModalRef) { }

  // HELPER FUNCTIONS

  ngOnInit(): void {}

  // HELPER FUNCTIONS

  public onClose(): void {
    this.modalRef.hide ();
  }
}
