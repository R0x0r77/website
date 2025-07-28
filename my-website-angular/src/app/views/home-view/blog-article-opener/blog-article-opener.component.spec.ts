import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogArticleOpenerComponent } from './blog-article-opener.component';

describe('BlogArticleOpenerComponent', () => {
  let component: BlogArticleOpenerComponent;
  let fixture: ComponentFixture<BlogArticleOpenerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogArticleOpenerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogArticleOpenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
