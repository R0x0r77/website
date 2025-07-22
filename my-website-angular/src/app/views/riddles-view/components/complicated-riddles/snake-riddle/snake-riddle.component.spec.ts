import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeRiddleComponent } from './snake-riddle.component';

describe('SnakeRiddleComponent', () => {
  let component: SnakeRiddleComponent;
  let fixture: ComponentFixture<SnakeRiddleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnakeRiddleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnakeRiddleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
