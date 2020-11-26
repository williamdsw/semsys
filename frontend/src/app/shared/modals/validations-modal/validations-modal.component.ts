import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-validations-modal',
  templateUrl: './validations-modal.component.html'
})
export class ValidationsModalComponent implements OnInit {

  // FIELDS

  @Input() public fields: string[] = [];

  // CONSTRUCTOR

  constructor(public modalRef: BsModalRef) { }

  // LIFECYCLE HOOKS

  ngOnInit(): void {}

  // HELPER FUNCTIONS

  public onClose(): void {
    this.modalRef.hide ();
  }
}
