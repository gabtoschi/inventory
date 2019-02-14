import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorNotificatorComponent } from './error-notificator.component';

describe('ErrorNotificatorComponent', () => {
  let component: ErrorNotificatorComponent;
  let fixture: ComponentFixture<ErrorNotificatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorNotificatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorNotificatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
