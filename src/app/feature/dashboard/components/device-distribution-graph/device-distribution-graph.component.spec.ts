import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceDistributionGraphComponent } from './device-distribution-graph.component';

describe('DeviceDistributionGraphComponent', () => {
  let component: DeviceDistributionGraphComponent;
  let fixture: ComponentFixture<DeviceDistributionGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceDistributionGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceDistributionGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
