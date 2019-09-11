import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartEnergyComponent } from './smart-energy.component';

describe('SmartEnergyComponent', () => {
  let component: SmartEnergyComponent;
  let fixture: ComponentFixture<SmartEnergyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartEnergyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartEnergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
