import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DpdhlAndIotComponent } from './dpdhl-and-iot.component';

describe('DpdhlAndIotComponent', () => {
  let component: DpdhlAndIotComponent;
  let fixture: ComponentFixture<DpdhlAndIotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DpdhlAndIotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DpdhlAndIotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
