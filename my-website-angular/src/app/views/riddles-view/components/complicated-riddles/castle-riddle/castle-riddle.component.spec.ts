import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastleRiddleComponent } from './castle-riddle.component';

describe('CastleRiddleComponent', () => {
  let component: CastleRiddleComponent;
  let fixture: ComponentFixture<CastleRiddleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CastleRiddleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CastleRiddleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
