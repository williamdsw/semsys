import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html'
})
export class AlertModalComponent implements OnInit {

  @Input() public type = 'alert-success';
  @Input() public title = 'title';
  @Input() public message = 'message';

  constructor(private modalRef: BsModalRef) { }

  ngOnInit(): void {}

  public onClose(): void {
    this.modalRef.hide ();
  }
}
