import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingConfirmComponent } from './landing-confirm.component';

describe('LandigConfirmComponent', () => {
  let component: LandingConfirmComponent;
  let fixture: ComponentFixture<LandingConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
