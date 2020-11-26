import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
})
export class ConfirmModalComponent implements OnInit {

  // FIELDS

  @Input() public title: string;
  @Input() public body: string;
  @Input() public cancelButtonText: string;
  @Input() public okButtonText: string;

  public confirmResult: Subject<boolean>;

  // CONSTRUCTOR

  constructor(public modalRef: BsModalRef) {
    this.cancelButtonText = 'global.buttons.no';
    this.okButtonText = 'global.buttons.yes';
  }

  // LIFECYCLE HOOKS

  ngOnInit(): void {
    this.confirmResult = new Subject ();
  }

  // HELPER FUNCTIONS

  private confirmAndClose(value: boolean) {
    this.modalRef.hide ();
    this.confirmResult.next (value);
  }

  public onClose() {
    this.confirmAndClose (false);
  }

  public onConfirm() {
    this.confirmAndClose (true);
  }
}
