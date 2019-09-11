import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppOwnerComponent } from './app-owner.component';

describe('AppOwnerComponent', () => {
  let component: AppOwnerComponent;
  let fixture: ComponentFixture<AppOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
