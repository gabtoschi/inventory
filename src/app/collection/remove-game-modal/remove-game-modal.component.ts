import { Component, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-remove-game-modal',
  templateUrl: './remove-game-modal.component.html',
  styleUrls: ['./remove-game-modal.component.scss']
})
export class RemoveGameModalComponent implements OnInit {

  public gameName: string;
  public onConfirm: () => void = () => {};

  constructor(
    public modalRef: BsModalRef
  ) { }

  ngOnInit() {
  }

}
