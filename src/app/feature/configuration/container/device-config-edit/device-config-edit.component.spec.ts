import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceConfigEditComponent } from './device-config-edit.component';

describe('DeviceConfigEditComponent', () => {
  let component: DeviceConfigEditComponent;
  let fixture: ComponentFixture<DeviceConfigEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceConfigEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceConfigEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
