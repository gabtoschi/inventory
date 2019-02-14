import { Component, OnInit, OnDestroy } from '@angular/core';

import { ErrorsService } from './errors.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-notificator',
  templateUrl: './error-notificator.component.html',
  styleUrls: ['./error-notificator.component.scss']
})
export class ErrorNotificatorComponent implements OnInit, OnDestroy {

  private errorsSub: Subscription;

  public errors: string[] = [];

  constructor(
    private errorsService: ErrorsService
  ) { }

  ngOnInit() {
    this.errorsSub = this.errorsService.errorsSub.subscribe(
      errorMsg => {
        console.log(errorMsg);
        this.errors.push(errorMsg);
      }
    );
  }

  ngOnDestroy() {
    this.errorsSub.unsubscribe();
  }

  public dismissError(index: number) {
    this.errors.splice(index, 1);
  }

}
