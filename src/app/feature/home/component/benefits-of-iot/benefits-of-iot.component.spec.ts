import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitsOfIotComponent } from './benefits-of-iot.component';

describe('BenefitsOfIotComponent', () => {
  let component: BenefitsOfIotComponent;
  let fixture: ComponentFixture<BenefitsOfIotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenefitsOfIotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitsOfIotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
