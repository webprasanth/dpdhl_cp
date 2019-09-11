import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatGridComponent } from './mat-grid.component';

describe('MatGridComponent', () => {
  let component: MatGridComponent;
  let fixture: ComponentFixture<MatGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
