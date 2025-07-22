import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterContainerRiddleComponent } from './water-container-riddle.component';

describe('WaterContainerRiddleComponent', () => {
  let component: WaterContainerRiddleComponent;
  let fixture: ComponentFixture<WaterContainerRiddleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaterContainerRiddleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaterContainerRiddleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
