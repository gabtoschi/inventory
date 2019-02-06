import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-remove-game-modal',
  templateUrl: './remove-game-modal.component.html',
  styleUrls: ['./remove-game-modal.component.scss']
})
export class RemoveGameModalComponent implements OnInit {

  gameName: string;

  constructor(
    public modalRef: BsModalRef
  ) { }

  ngOnInit() {
  }

}
