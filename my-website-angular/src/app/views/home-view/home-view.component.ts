import { Component, inject, OnInit, signal } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { BlogArticleOpenerComponent } from './blog-article-opener/blog-article-opener.component';
import { ArticleService } from './services/article.service';
import { ArticleStore } from '../../../store/article.store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-home-view',
  imports: [
    MarkdownModule,
    BlogArticleOpenerComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.scss',
})
export class HomeViewComponent implements OnInit {
  readonly articleStore = inject(ArticleStore);
  articles = this.articleStore.articles;
  articlesLoading = signal(false);

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    if (this.articles().length < 2) {
      this.articlesLoading.set(true);
      this.articleService
        .getArticlePreviews()
        .pipe(finalize(() => this.articlesLoading.set(false)))
        .subscribe({
          next: (res) => this.articleStore.setArticles(res),
          error: (error) => console.log(error),
        });
    }
  }
}
