import { Component, inject, OnInit } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { BlogArticleOpenerComponent } from './blog-article-opener/blog-article-opener.component';
import { ArticleService } from './services/article.service';
import { ArticleStore } from '../../../store/article.store';

@Component({
  selector: 'app-home-view',
  imports: [MarkdownModule, BlogArticleOpenerComponent],
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.scss',
})
export class HomeViewComponent implements OnInit {
  readonly articleStore = inject(ArticleStore);
  articles = this.articleStore.articles;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    if (this.articles().length < 2) {
      this.articleService.getArticles().subscribe({
        next: (res) => this.articleStore.setArticles(res),
        error: (error) => console.log(error),
      });
    }
  }
}
