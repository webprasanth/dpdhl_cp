import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationsViewComponent } from './associations-view.component';

describe('AssociationsViewComponent', () => {
  let component: AssociationsViewComponent;
  let fixture: ComponentFixture<AssociationsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociationsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
