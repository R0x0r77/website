import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostStampSvgComponent } from './post-stamp-svg.component';

describe('PostStampSvgComponent', () => {
  let component: PostStampSvgComponent;
  let fixture: ComponentFixture<PostStampSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostStampSvgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostStampSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
