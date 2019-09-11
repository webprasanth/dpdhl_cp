import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetMonitoringComponent } from './asset-monitoring.component';

describe('AssetMonitoringComponent', () => {
  let component: AssetMonitoringComponent;
  let fixture: ComponentFixture<AssetMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
