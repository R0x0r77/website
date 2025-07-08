import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGamesViewComponent } from './board-games-view.component';

describe('BoardGamesViewComponent', () => {
  let component: BoardGamesViewComponent;
  let fixture: ComponentFixture<BoardGamesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardGamesViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardGamesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
