import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackTraceComponent } from './track-trace.component';

describe('TrackTraceComponent', () => {
  let component: TrackTraceComponent;
  let fixture: ComponentFixture<TrackTraceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackTraceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackTraceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
