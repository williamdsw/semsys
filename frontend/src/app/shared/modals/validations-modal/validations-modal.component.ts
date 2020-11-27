import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-validations-modal',
  templateUrl: './validations-modal.component.html'
})
export class ValidationsModalComponent implements OnInit {

  @Input() public fields: string[] = [];

  constructor(public modalRef: BsModalRef) { }

  ngOnInit(): void {}

  public onClose(): void {
    this.modalRef.hide ();
  }
}
