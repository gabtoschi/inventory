import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionPagerComponent } from './collection-pager.component';

describe('CollectionPagerComponent', () => {
  let component: CollectionPagerComponent;
  let fixture: ComponentFixture<CollectionPagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionPagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionPagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
