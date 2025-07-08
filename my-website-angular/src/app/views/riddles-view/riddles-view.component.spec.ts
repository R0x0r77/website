import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiddlesViewComponent } from './riddles-view.component';

describe('RiddlesViewComponent', () => {
  let component: RiddlesViewComponent;
  let fixture: ComponentFixture<RiddlesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiddlesViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiddlesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
