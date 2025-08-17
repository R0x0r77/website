import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockHandsComponent } from './clock-hands.component';

describe('ClockHandsComponent', () => {
  let component: ClockHandsComponent;
  let fixture: ComponentFixture<ClockHandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClockHandsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClockHandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
