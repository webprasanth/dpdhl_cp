import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceConfigAddComponent } from './device-config-add.component';

describe('DeviceConfigAddComponent', () => {
  let component: DeviceConfigAddComponent;
  let fixture: ComponentFixture<DeviceConfigAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceConfigAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceConfigAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
