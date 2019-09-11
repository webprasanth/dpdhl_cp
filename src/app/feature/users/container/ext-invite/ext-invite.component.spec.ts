import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtInviteComponent } from './ext-invite.component';

describe('ExtInviteComponent', () => {
  let component: ExtInviteComponent;
  let fixture: ComponentFixture<ExtInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
