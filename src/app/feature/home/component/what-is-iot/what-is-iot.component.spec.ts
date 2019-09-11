import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatIsIotComponent } from './what-is-iot.component';

describe('WhatIsIotComponent', () => {
  let component: WhatIsIotComponent;
  let fixture: ComponentFixture<WhatIsIotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatIsIotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatIsIotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
