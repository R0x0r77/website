import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumVitaeViewComponent } from './curriculum-vitae-view.component';

describe('CurriculumVitaeViewComponent', () => {
  let component: CurriculumVitaeViewComponent;
  let fixture: ComponentFixture<CurriculumVitaeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumVitaeViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurriculumVitaeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
