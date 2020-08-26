import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingBosiComponent } from './landing-bosi.component';

describe('LandingBosiComponent', () => {
  let component: LandingBosiComponent;
  let fixture: ComponentFixture<LandingBosiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingBosiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingBosiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
