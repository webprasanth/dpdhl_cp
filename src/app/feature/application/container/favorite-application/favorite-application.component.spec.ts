import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteApplicationComponent } from './favorite-application.component';

describe('FavoriteApplicationComponent', () => {
  let component: FavoriteApplicationComponent;
  let fixture: ComponentFixture<FavoriteApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
