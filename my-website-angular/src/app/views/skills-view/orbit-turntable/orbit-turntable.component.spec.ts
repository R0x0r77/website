import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrbitTurntableComponent } from './orbit-turntable.component';

describe('OrbitTurntableComponent', () => {
  let component: OrbitTurntableComponent;
  let fixture: ComponentFixture<OrbitTurntableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrbitTurntableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrbitTurntableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
