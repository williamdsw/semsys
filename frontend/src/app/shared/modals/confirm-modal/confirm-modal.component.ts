import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
})
export class ConfirmModalComponent implements OnInit {

  @Input() public title: string;
  @Input() public body: string;
  @Input() public cancelButtonText: string;
  @Input() public okButtonText: string;

  public confirmResult: Subject<boolean>;

  constructor(public modalRef: BsModalRef) {
    this.cancelButtonText = 'global.buttons.no';
    this.okButtonText = 'global.buttons.yes';
  }

  ngOnInit(): void {
    this.confirmResult = new Subject ();
  }

  private confirmAndClose(value: boolean): void {
    this.modalRef.hide ();
    this.confirmResult.next (value);
  }

  public onClose(): void {
    this.confirmAndClose (false);
  }

  public onConfirm(): void {
    this.confirmAndClose (true);
  }
}
