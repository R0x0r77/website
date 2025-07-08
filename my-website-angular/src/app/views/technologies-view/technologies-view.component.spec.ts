import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologiesViewComponent } from './technologies-view.component';

describe('TechnologiesViewComponent', () => {
  let component: TechnologiesViewComponent;
  let fixture: ComponentFixture<TechnologiesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnologiesViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnologiesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
