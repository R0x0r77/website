import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiddleCardComponent } from './riddle-card.component';

describe('RiddleCardComponent', () => {
  let component: RiddleCardComponent;
  let fixture: ComponentFixture<RiddleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiddleCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiddleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
