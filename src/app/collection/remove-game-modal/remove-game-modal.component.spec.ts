import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveGameModalComponent } from './remove-game-modal.component';

describe('RemoveGameModalComponent', () => {
  let component: RemoveGameModalComponent;
  let fixture: ComponentFixture<RemoveGameModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveGameModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveGameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
