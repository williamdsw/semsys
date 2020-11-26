import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styles: ['.no-margin { margin-bottom: 0 !important; }']
})
export class AlertModalComponent implements OnInit {

  // FIELDS

  @Input() public type = 'alert-success';
  @Input() public title = 'title';
  @Input() public message = 'message';

  // CONSTRUCTOR

  constructor(private modalRef: BsModalRef) { }

  // LIFECYCLE HOOKS

  ngOnInit(): void {}

  // HELPER FUNCTIONS

  public onClose(): void {
    this.modalRef.hide ();
  }
}
