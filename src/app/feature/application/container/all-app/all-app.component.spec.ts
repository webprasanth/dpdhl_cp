import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAppComponent } from './all-app.component';

describe('AllAppComponent', () => {
  let component: AllAppComponent;
  let fixture: ComponentFixture<AllAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
