import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredectiveMaintenanceComponent } from './predective-maintenance.component';

describe('PredectiveMaintenanceComponent', () => {
  let component: PredectiveMaintenanceComponent;
  let fixture: ComponentFixture<PredectiveMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredectiveMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredectiveMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
